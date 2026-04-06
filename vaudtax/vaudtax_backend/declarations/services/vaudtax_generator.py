def generate_export(declaration):
    """
    Mock service to generate VaudTax export.
    Returns the JSON representation required by VaudTax.
    """
    return {
        "status": "success",
        "message": "Export data generated",
        "data": declaration.tax_data
    }
