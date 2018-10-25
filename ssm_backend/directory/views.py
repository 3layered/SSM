from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests


@api_view(['GET'])
def directory(request, dir):
    if request.method == 'GET':
        r = requests.get(
            'http://localhost:50700/webhdfs/v1/'+dir+'?op=LISTSTATUS')
        return Response(r.json())
