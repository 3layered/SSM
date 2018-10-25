from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests


@api_view(['POST'])
def directory(request):
    if request.method == 'POST':
        print(request.data)
        r = requests.get(
            'http://localhost:50070/webhdfs/v1/'+request.data['dir']+'?op=LISTSTATUS')
        return Response(r.json())
