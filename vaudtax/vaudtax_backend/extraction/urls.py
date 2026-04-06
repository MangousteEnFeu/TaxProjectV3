from django.urls import path
from .views import ExtractDocumentView

urlpatterns = [
    path('process/', ExtractDocumentView.as_view(), name='process_document'),
]
