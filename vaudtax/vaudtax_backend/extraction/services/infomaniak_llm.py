import base64
from openai import OpenAI
from django.conf import settings
import json

def extract_data_from_document(file_path):
    """
    Sends the document to Infomaniak's LLM to extract tax data using Qwen-VL.
    Requires Product ID in settings.
    """
    PRODUCT_ID = getattr(settings, 'INFOMANIAK_PRODUCT_ID', "111161") # Assuming a default or from settings
    
    client = OpenAI(
        api_key=settings.INFOMANIAK_API_KEY,
        base_url=f"https://api.infomaniak.com/2/ai/{PRODUCT_ID}/openai/v1/",
    )
    
    # Read file and encode as base64
    with open(file_path, "rb") as f:
        encoded_string = base64.b64encode(f.read()).decode('utf-8')
    
    # Determine basic mime type for visual model
    mime_type = "image/jpeg"
    if str(file_path).lower().endswith('.pdf'):
        mime_type = "application/pdf"
    elif str(file_path).lower().endswith('.png'):
        mime_type = "image/png"

    prompt = """
    You are an expert tax assistant for the Canton of Vaud, Switzerland.
    Analyze this document and extract relevant information in JSON format.
    Keep the Swiss formatting normalized to numbers.
    Return ONLY a valid JSON object matching the following structure without markdown blocks:
    {
      "documentType": "BankStatement | SalaryCertificate | Other",
      "data": {}
    }
    """

    messages = [
        {"role": "system", "content": prompt},
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Extract tax data from this document."},
                {"type": "image_url", "image_url": {"url": f"data:{mime_type};base64,{encoded_string}"}}
            ]
        }
    ]

    try:
        response = client.chat.completions.create(
            model=settings.INFOMANIAK_MODEL,
            messages=messages,
        )
        # Using simple JSON parsing since response formatting isn't always fully supported with custom LLMs
        content = response.choices[0].message.content
        # Strip markdown json block if exists
        content = content.strip()
        if content.startswith("```json"):
            content = content[7:-3]
        elif content.startswith("```"):
            content = content[3:-3]
            
        return json.loads(content.strip())
    except Exception as e:
        print(f"Extraction error with Qwen: {e}")
        return {"error": str(e)}
