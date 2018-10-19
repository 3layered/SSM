from rest_framework.decorators import api_view
from rest_framework.response import Response
import http, requests, json

headers = {'Content-Type': 'application/json'}

@api_view(['POST'])
def submit(request):
    if request.method != 'POST':
        return

    url = request.data['url']
    body = request.data['body']

    r = requests.post(url + '/ws/v1/cluster/apps/new-application') # Get new app-id
    app_id = r.json()['application-id']
    body['application-id'] = str(app_id)

    # HTTPConnection obj does not accept "http://" or "https://" as url input
    if url[0:5] == 'https':
        url = url[8:]
    elif url[0:4] == 'http':
        url = url[7:]

    conn = http.client.HTTPConnection(url)
    conn.request('POST', '/ws/v1/cluster/apps/', body=json.dumps(body), headers=headers)
    r = conn.getresponse()

    return Response(r)