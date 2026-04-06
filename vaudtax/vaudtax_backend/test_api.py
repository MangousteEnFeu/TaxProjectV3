import os
import sys
import base64
import json
from openai import OpenAI

import django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'vaudtax_backend.settings')
django.setup()

from django.conf import settings

def test_extraction(file_path):
    PRODUCT_ID = getattr(settings, 'INFOMANIAK_PRODUCT_ID', "111161")
    
    client = OpenAI(
        api_key=settings.INFOMANIAK_API_KEY,
        base_url=f"https://api.infomaniak.com/2/ai/{PRODUCT_ID}/openai/v1/",
    )
    
    with open(file_path, "rb") as f:
        encoded_string = base64.b64encode(f.read()).decode('utf-8')
    
    messages = [
        {"role": "system", "content": "Extract total in json."},
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Extract tax data from this document."},
                {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{encoded_string}"}}
            ]
        }
    ]

    try:
        response = client.chat.completions.create(
            model="qwen3",
            messages=messages,
        )
        content = response.choices[0].message.content
        return {"result": content}
    except Exception as e:
        print(f"Extraction error with Qwen: {e}")
        return {"error": str(e)}

if __name__ == "__main__":
    test_file = "test_doc.png"
    if not os.path.exists(test_file):
        with open(test_file, 'wb') as f:
            f.write(b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\nIDATx\x9cc\x00\x01\x00\x00\x05\x00\x01\r\n-\xb4\x00\x00\x00\x00IEND\xaeB`\x82')
    
    print("Testing extraction with model qwen3...")
    result = test_extraction(test_file)
    print("Result:")
    print(json.dumps(result, indent=2))
