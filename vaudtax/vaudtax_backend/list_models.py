import os
import sys

import django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'vaudtax_backend.settings')
django.setup()

import requests
from django.conf import settings

def list_models():
    url = f"https://api.infomaniak.com/1/ai/models"
    headers = {
        "Authorization": f"Bearer {settings.INFOMANIAK_API_KEY}"
    }
    response = requests.get(url, headers=headers)
    data = response.json()
    if 'data' in data:
        for model in data['data']:
            print(f"- {model.get('name')}")
    else:
        print(data)

if __name__ == "__main__":
    list_models()
