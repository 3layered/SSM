from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

@api_view(['GET'])
def metrics(request):
    r = requests.get(
        'http://localhost:8088/ws/v1/cluster/metrics')
    return Response(r.json())

@api_view(['GET'])
def scheduler(request):
    r = requests.get(
        'http://localhost:8088/ws/v1/cluster/scheduler')
    return Response(r.json())

@api_view(['GET'])
def info(request):
    r = requests.get(
        'http://localhost:8088/ws/v1/cluster/info')
    return Response(r.json())

@api_view(['GET'])
def nodes(request):
    r = requests.get(
        'http://localhost:8088/ws/v1/cluster/nodes')
    return Response(r.json())

@api_view(['GET'])
def apps(request):
    r = requests.get(
        'http://localhost:8088/ws/v1/cluster/apps')
    return Response(r.json())

@api_view(['GET'])
def nodelabels(request):
    r = requests.get(
        'http://localhost:8088/ws/v1/cluster/nodelabels')
    return Response(r.json())