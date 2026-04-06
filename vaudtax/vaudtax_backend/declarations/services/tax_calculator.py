def calculate_taxes(declaration):
    """
    Mock service to calculate tax estimations.
    """
    data = declaration.tax_data
    # In a real scenario, this would apply the Vaud schedules
    return {
        "estimated_tax": 4500.0,
        "calculation_details": {
            "income_tax": 3000.0,
            "wealth_tax": 1500.0
        }
    }
