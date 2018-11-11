from rest_framework.decorators import api_view
from rest_framework.response import Response
import http, json
from .models import Application
from django.http import JsonResponse
from . import services

headers = {'Content-Type': 'application/json'}


@api_view(['POST'])
def submit(request, **kwargs):
    if request.method != 'POST':
        return

    if 'app_id' in kwargs.keys():
        return services.resubmit(kwargs['app_id'])
    else:
        return services.submit(request.data)



@api_view(['POST'])
def get_app_list(request):
    if request.method != 'POST':
        return

    yarn_app_list = services.get_app_list_from_yarn(request.data)['apps']['app']
    services.update_apps_to_db(yarn_app_list)

    app_list = [{'id': app.app_id,
                 'backend-id': app.id,
                 'user': 'TODO',
                 'name': app.name,
                 'state': app.state,
                 'finalStatus': app.state}
                for app in Application.objects.all()]

    return JsonResponse({'apps': {'app': app_list}})


@api_view(['PUT'])
def kill(request, **kwargs):
    if request.method != 'PUT':
        return

    url = services.conform_url_format(request.data['url'])
    app_id = kwargs['app_id']
    body = request.data['state']

    if url[0:5] == 'https':
        url = url[8:]
    elif url[0:4] == 'http':
        url = url[7:]

    conn = http.client.HTTPConnection(url)
    conn.request('PUT', '/ws/v1/cluster/apps/{}/state'.format(app_id), body=json.dumps(body), headers=headers)
    response = conn.getresponse().read().decode('utf-8')
    response = json.loads(response)

    conn.close()

    return Response(response)