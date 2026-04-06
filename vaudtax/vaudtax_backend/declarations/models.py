from django.db import models
from django.conf import settings

class Declaration(models.Model):
    STATUS_CHOICES = [
        ('DRAFT', 'Draft'),
        ('PENDING', 'Pending Extraction'),
        ('READY', 'Ready to Export'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='declarations')
    year = models.IntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='DRAFT')
    
    # JSON field for storing extracted/computed tax data
    tax_data = models.JSONField(default=dict, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-year', '-created_at']

    def __str__(self):
        return f"Declaration {self.year} - {self.user.username}"


class Document(models.Model):
    DOC_TYPES = [
        ('SALARY', 'Salary Certificate'),
        ('BANK', 'Bank Statement'),
        ('OTHER', 'Other Document'),
    ]
    
    declaration = models.ForeignKey(Declaration, on_delete=models.CASCADE, related_name='documents')
    file = models.FileField(upload_to='documents/%Y/%m/')
    document_type = models.CharField(max_length=20, choices=DOC_TYPES)
    extracted_data = models.JSONField(default=dict, blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.get_document_type_display()} for {self.declaration}"
