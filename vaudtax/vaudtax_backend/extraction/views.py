from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from declarations.models import Document
from .services.infomaniak_llm import extract_data_from_document

class ExtractDocumentView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        document_id = request.data.get('document_id')
        if not document_id:
            return Response({"error": "document_id is required"}, status=400)
            
        try:
            document = Document.objects.get(id=document_id, declaration__user=request.user)
        except Document.DoesNotExist:
            return Response({"error": "Document not found"}, status=404)

        # Call the LLM extraction service
        extracted_data = extract_data_from_document(document.file.path)
        
        # Save extracted data to document
        document.extracted_data = extracted_data
        document.save()
        
        return Response({
            "status": "success",
            "extracted_data": extracted_data
        })
