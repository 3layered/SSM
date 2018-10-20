from rest_framework.decorators import api_view
from rest_framework.response import Response
import http, json, re

headers = {'Content-Type': 'application/json'}

def detach_http(url):
    # HTTPConnection obj does not accept "http://" or "https://" as url input
    if url[0:5] == 'https':
        return url[8:]
    elif url[0:4] == 'http':
        return url[7:]


@api_view(['POST'])
def submit(request):
    if request.method != 'POST':
        return

    url = detach_http(request.data['url'])
    body = request.data['body']
    required_mem = int(request.data['memory'])
    required_cores = int(request.data['cores'])

    conn = http.client.HTTPConnection(url)
    conn.request('POST', '/ws/v1/cluster/apps/new-application')
    response = conn.getresponse().read().decode('utf-8')
    response = json.loads(response)

    app_id = response['application-id']
    body['application-id'] = str(app_id)

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

    conn.close()

    return Response(response)

@api_view(['POST'])
def get_app_list(request):
    if request.method != 'POST':
        return

    url = detach_http(request.data['url'])

    if url[0:5] == 'https':
        url = url[8:]
    elif url[0:4] == 'http':
        url = url[7:]

    conn = http.client.HTTPConnection(url)
    conn.request('GET', '/ws/v1/cluster/apps/')
    response = conn.getresponse().read().decode('utf-8')
    response = json.loads(response)

    conn.close()

    return Response(response)

@api_view(['PUT'])
def kill(request, **kwargs):
    if request.method != 'PUT':
        return

    url = detach_http(request.data['url'])
    app_id = kwargs['app_id']
    body = request.data['state']

    conn = http.client.HTTPConnection(url)
    conn.request('PUT', '/ws/v1/cluster/apps/{}/state'.format(app_id), body=json.dumps(body), headers=headers)
    response = conn.getresponse().read().decode('utf-8')
    response = json.loads(response)

    conn.close()

    return Response(response)