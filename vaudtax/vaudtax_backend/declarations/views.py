from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Declaration, Document
from .serializers import DeclarationSerializer, DocumentSerializer
from .services.tax_calculator import calculate_taxes
from .services.vaudtax_generator import generate_export

class DeclarationViewSet(viewsets.ModelViewSet):
    serializer_class = DeclarationSerializer

    def get_queryset(self):
        # Users can only see and edit their own declarations
        return Declaration.objects.filter(user=self.request.user)

    @action(detail=True, methods=['post'])
    def calculate(self, request, pk=None):
        declaration = self.get_object()
        tax_result = calculate_taxes(declaration)
        return Response(tax_result)

    @action(detail=True, methods=['get'])
    def export(self, request, pk=None):
        declaration = self.get_object()
        export_data = generate_export(declaration)
        return Response(export_data)


class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer

    def get_queryset(self):
        return Document.objects.filter(declaration__user=self.request.user)
