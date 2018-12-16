from .models import Application, SubmitRequest, Dependency
import requests, http, json, polling
from rest_framework.response import Response
from django.http import HttpResponseBadRequest


def update_apps_to_db(yarn_app_list):
    ret = []
    for app in yarn_app_list:
        try:
            backend_app = Application.objects.get(app_id=app['id'])
            backend_app.state = app['state']
            backend_app.finished_time = app['finishedTime']
            try:
                backend_app.submit_request = SubmitRequest.objects.get(app_id=app['id'])
            except SubmitRequest.DoesNotExist:
                pass
            backend_app.save()
            ret.append(backend_app)
        except Application.DoesNotExist:
            add_app_to_db(app)
    return ret

def handle_dependency(backend_app):
    def _kill(backend_app):
        body = {'state': 'KILLED'}
        app_id = backend_app.app_id
        print ("killing {}".format(app_id))
        url = get_server_url(app_id)
        conn = http.client.HTTPConnection(url)
        conn.request('PUT', '/ws/v1/cluster/apps/{}/state'.format(app_id), body=json.dumps(body), headers=headers)
        conn.getresponse().read().decode('utf-8')
        conn.close()

    def _handle_dependency(d):
        if d.failover_plan == 'cascade':
            d.delete()
            _kill(d.child_app)
        elif d.failover_plan == 'retry':
            d.delete()
            resubmit(d.parent_app.app_id)

    if backend_app.state in ['FAILED', 'KILLED', 'FINISHED']:
        dependencies = Dependency.objects.filter(parent_app__app_id=backend_app.app_id)
        for d in dependencies:
            _handle_dependency(d)


def sync_dependencies(backend_app_list):
    for app in backend_app_list:
        handle_dependency(app)


def add_app_to_db(spark_app):
    app_id = spark_app['id']
    name = spark_app['name']
    state = spark_app['state']
    started_time = spark_app['startedTime']
    finished_time = spark_app['finishedTime']

    Application(
        app_id=app_id,
        name=name,
        state=state,
        started_time=started_time,
        finished_time=finished_time
    ).save()


def get_app_list_from_yarn(request_data):
    url = conform_url_format(request_data['url'])

    if url[0:5] == 'https':
        url = url[8:]
    elif url[0:4] == 'http':
        url = url[7:]

    conn = http.client.HTTPConnection(url)
    conn.request('GET', '/ws/v1/cluster/apps/')
    response = conn.getresponse().read().decode('utf-8')
    response = json.loads(response)

    conn.close()
    if response['apps'] is None:
        response['apps'] = {'app': []}

    return response


headers = {'Content-Type': 'application/json'}


def submit(request_data):
    url = conform_url_format(request_data['url'])

    if url[0:5] == 'https':
        url = url[8:]
    elif url[0:4] == 'http':
        url = url[7:]

    body = request_data['body']
    required_mem = int(request_data['memory'])
    required_cores = int(request_data['cores'])

    conn = http.client.HTTPConnection(url)
    conn.request('POST', '/ws/v1/cluster/apps/new-application')
    response = conn.getresponse().read().decode('utf-8')
    response = json.loads(response)

    submitter_id = response['application-id']
    body['application-id'] = str(submitter_id)

    maximum_resource_capacity = response['maximum-resource-capability']
    max_mem = maximum_resource_capacity['memory']
    max_core = maximum_resource_capacity['vCores']

    err_msg = {'err_msg': []}
    if required_mem > max_mem:
        err_msg['err_msg'].append("YARN RM does not allow more than {} MB memory\n".format(max_mem))

    if required_cores > max_core:
        err_msg['err_msg'].append("YARN RM does not allow more than {} cores\n".format(max_core))

    if len(err_msg['err_msg']) > 0:
        conn.close()
        return Response(err_msg)

    conn.request('POST', '/ws/v1/cluster/apps/', body=json.dumps(body), headers=headers)
    response = conn.getresponse().read().decode('utf-8')

    request_data_dump = json.dumps(request_data)
    SubmitRequest(
        app_id=submitter_id,
        request_data=request_data_dump
    ).save()

    polling.poll(lambda: wait_for_submit(url, submitter_id, request_data_dump), step=3, poll_forever=True)
    """
    conn.request('PUT', '/ws/v1/cluster/apps/{}/state'.format(submitter_id), body=json.dumps({"state": "KILLED"}),
                 headers=headers)
    if conn.getresponse():
        pass
    """
    conn.close()

    return Response(response)


def conform_url_format(url):
    # detach http:// or https://
    # HTTPConnection obj does not accept "http://" or "https://" as url input
    """
    if url[0:5] == 'https':
        url = url[8:]
    elif url[0:4] == 'http':
        url = url[7:]
    # attach port number
    if url[-4:] != '8888':
        url += ':8888'
    """
    return url


def wait_for_submit(url, submitter_id, request_data_dump):
    spark_app_id = submitter_id[:-4] + str(int(submitter_id[-4:]) + 1).zfill(4)

    submitter = requests.get('http://{}/ws/v1/cluster/apps/{}/state'
                             .format(url, submitter_id)).json()
    submit_fail = 'state' in submitter.keys() and \
                  submitter['state'] in ['FAILED', 'KILLED']

    spark_app_state = requests.get('http://{}/ws/v1/cluster/apps/{}/state'
                         .format(url, spark_app_id)).json()
    submit_success = 'state' in spark_app_state.keys() and \
                     spark_app_state['state'] == 'RUNNING'

    if submit_success:
        SubmitRequest(
            app_id=spark_app_id,
            request_data=request_data_dump
        ).save()

    return submit_fail or submit_success


def resubmit(app_id):
    print('resubmit {}'.format(app_id))
    try:
        submit_request = SubmitRequest.objects.get(app_id=app_id)
        request_data = json.loads(submit_request.request_data)
        return submit(request_data)
    except SubmitRequest.DoesNotExist:
        request_data = {'url': 'localhost:8088', 'memory': DEFAULT_MEM, 'cores': DEFAULT_CORE, 'body': DEFAULT_BODY}
        return submit(request_data)


def get_server_url(app_id):
    try:
        submit_request = SubmitRequest.objects.get(app_id=app_id)
    except SubmitRequest.DoesNotExist:
        return 'localhost:8088'
    request_data = json.loads(submit_request.request_data)
    return request_data['url']


DEFAULT_MEM = 128
DEFAULT_CORE = 1
DEFAULT_BODY = {
    "application-id": "application_1539593635508_0064",
    "application-name":"SUBMIT",
    "am-container-spec":
        {
            "local-resources":
                {
                    "entry":
                        [
                            {
                                "key":"pi",
                                "value":
                                    {
                                        "resource":"hdfs://ip-172-31-3-155.us-west-2.compute.internal:8020/user/hadoop/pi.py",
                                        "type":"FILE",
                                        "visibility":"APPLICATION",
                                        "size": 43004,
                                        "timestamp": 1539593933307
                                    }
                            }
                        ]
                },
            "commands":
                {
                    "command":"{{SPARK_HOME}}/bin/spark-submit --master yarn --executor-memory 1G /home/hadoop/pi.py"
                },
            "environment":
                {
                    "entry":
                        [
                            {
                                "key": "SPARK_HOME",
                                "value": "/usr/lib/spark"
                            }
                        ]
                }
        },
    "unmanaged-AM": False,
    "max-app-attempts":1,
    "resource":
        {
            "memory":DEFAULT_MEM,
            "vCores":DEFAULT_CORE
        },
    "application-type":"SUBMIT",
    "keep-containers-across-application-attempts":False
};