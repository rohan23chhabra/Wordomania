# Create your views here.

import requests
from django.http import JsonResponse


def index(request):
    word = request.GET.get('word')
    app_id = '39e44a1d'
    app_key = '7659768a10f8611c001df1b4a054be9e'
    language = 'en'
    proxies = {
        'http': 'http://edcguest:edcguest@172.31.102.29:3128',
        'https': 'https://edcguest:edcguest@172.31.102.29:3128'
    }
    url = 'https://od-api.oxforddictionaries.com:443/api/v1/entries/' + language + '/' + word.lower()
    r = requests.get(url, headers={'app_id': app_id, 'app_key': app_key}, proxies=proxies)
    return JsonResponse(r.json())
