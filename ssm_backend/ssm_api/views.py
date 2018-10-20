from rest_framework.decorators import api_view
from rest_framework.response import Response
import http, json
from django.http import HttpResponseBadRequest

headers = {'Content-Type': 'application/json'}

@api_view(['POST'])
def submit(request):
    if request.method != 'POST':
        return

    url = request.data['url']
    body = request.data['body']
    required_mem = int(request.data['memory'])
    required_cores = int(request.data['cores'])

    # HTTPConnection obj does not accept "http://" or "https://" as url input
    if url[0:5] == 'https':
        url = url[8:]
    elif url[0:4] == 'http':
        url = url[7:]

    conn = http.client.HTTPConnection(url)
    conn.request('POST', '/ws/v1/cluster/apps/new-application')
    response = conn.getresponse().read()
    response = str(response)[2:-1]
    response = json.loads(response)

    app_id = response['application-id']
    body['application-id'] = str(app_id)

    maximum_resource_capacity = response['maximum-resource-capability']
    max_mem = maximum_resource_capacity['memory']
    max_core = maximum_resource_capacity['vCores']

    err_msg = ''
    if required_mem > max_mem:
        err_msg += "YARN RM does not allow more than {} MB memory\n".format(max_mem)

    if required_cores > max_core:
        err_msg += "YARN RM does not allow more than {} cores\n".format(max_core)

    if err_msg:
        return Response(err_msg)

    conn.request('POST', '/ws/v1/cluster/apps/', body=json.dumps(body), headers=headers)
    response = conn.getresponse()

    conn.close()

    return Response(response)