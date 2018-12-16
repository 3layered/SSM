from rest_framework.decorators import api_view
from rest_framework.response import Response
import http, json
from .models import Application, Dependency, FAILOVER_POLICY_CHOICES
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseNotAllowed
from . import services
from django.db.models import Q

import requests

headers = {'Content-Type': 'application/json'}


@api_view(['POST'])
def submit(request, **kwargs):
    if request.method != 'POST':
        return HttpResponseNotAllowed(['POST'])

    if 'app_id' in kwargs.keys():
        return services.resubmit(kwargs['app_id'])
    else:
        return services.submit(request.data)



@api_view(['POST'])
def get_app_list(request):
    if request.method != 'POST':
        return HttpResponseNotAllowed(['POST'])

    yarn_app_list = services.get_app_list_from_yarn(request.data)['apps']['app']
    backend_app_list = services.update_apps_to_db(yarn_app_list)
    services.sync_dependencies(backend_app_list)

    all_apps = Application.objects.all()

    for app in all_apps:
        map(lambda dependency: dependency.delete(),
            Dependency.objects.filter(Q(child_app__app_id=app.app_id) | Q(parent_app__app_id=app.app_id)))

    app_list = [{'id': app.app_id,
                 'backend-id': app.id,
                 'user': 'TODO',
                 'name': app.name,
                 'state': app.state,
                 'finalStatus': app.state}
                for app in all_apps]

    return JsonResponse({'apps': {'app': app_list}})


@api_view(['POST'])
def kill(request, **kwargs):
    if request.method != 'POST':
        return HttpResponseNotAllowed(['POST'])

    app_id = kwargs['app_id']
    url = services.get_server_url(app_id)
    body = {'state': 'KILLED'}

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


def render_dependency(dependency):
    return {'parent_id': dependency.parent_app.app_id,
            'child_id': dependency.child_app.app_id,
            'failover_plan': dependency.failover_plan}


@api_view(['GET', 'POST', 'DELETE'])
def dependency(request, **kwargs):
    if request.method == 'GET':
        response = {'dependencies': [render_dependency(d) for d in Dependency.objects.all()]}
        return JsonResponse(response)

    elif request.method == 'POST':
        parent_app_id = kwargs['parent_app_id']
        child_app_id = kwargs['child_app_id']
        failover_plan = request.data['failover_plan']
        try:
            dependency = Dependency.objects.get(Q(child_app__app_id=child_app_id) & Q(parent_app__app_id=parent_app_id))
        except Dependency.DoesNotExist:
            try:
                parent_app = Application.objects.get(app_id=parent_app_id)
                child_app = Application.objects.get(app_id=child_app_id)
                dependency = Dependency.objects.create()
                dependency.parent_app = parent_app
                dependency.child_app = child_app
            except Application.DoesNotExist:
                return HttpResponseBadRequest()

        dependency.failover_plan = failover_plan.lower()
        dependency.save()

        return JsonResponse(render_dependency(dependency))

    elif request.method == 'DELETE':
        parent_app_id = kwargs['parent_app_id']
        child_app_id = kwargs['child_app_id']
        try:
            dependency = Dependency.objects.get(Q(child_app__app_id=child_app_id) & Q(parent_app__app_id=parent_app_id))
        except Dependency.DoesNotExist:
            return HttpResponseBadRequest()

        dependency.delete()
        return Response()

    else:
        return HttpResponseNotAllowed(['GET', 'POST', 'DELETE'])

@api_view(['PUT'])
def change_failover_plan(request, **kwargs):
    pass


@api_view(['GET'])
def environment(request, app_id):
    if request.method == 'GET':
        r = requests.get(
            'http://localhost:4040/api/v1/applications/'+app_id+'/environment')
        return Response(r.json())

@api_view(['GET'])
def allexecutors(request, app_id):
    if request.method == 'GET':
        r = requests.get(
            'http://localhost:4040/api/v1/applications/'+app_id+'/allexecutors')
        return Response(r.json())

# Returns latest stage information
@api_view(['GET'])
def stages(request, app_id):
    if request.method == 'GET':
        r = requests.get(
            'http://localhost:4040/api/v1/applications/'+app_id+'/stages')
        r = requests.get('http://localhost:4040/api/v1/applications/'+app_id+'/stages/'+str(r.json()[0]['stageId']))
        return Response(r.json())

@api_view(['GET'])
def stage_detail(request, app_id, stage_id):
    if request.method == 'GET':
        r = requests.get(
            'http://localhost:4040/api/v1/applications/'+app_id+'/stages/'+stage_id)
        return Response(r.json())
