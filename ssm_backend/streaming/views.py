from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests


@api_view(['GET'])
def statistics(request, app_id):
    if request.method == 'GET':
        r = requests.get(
            'http://localhost:4040/api/v1/applications/'+app_id+'/streaming/statistics')
        return Response(r.json())


@api_view(['GET'])
def receivers(request, app_id):
    if request.method == 'GET':
        r = requests.get(
            'http://localhost:4040/api/v1/applications/'+app_id+'/streaming/receivers')
        return Response(r.json())


@api_view(['GET'])
def batches(request, app_id):
    if request.method == 'GET':
        r = requests.get(
            'http://localhost:4040/api/v1/applications/'+app_id+'/streaming/batches')
        return Response(r.json())
