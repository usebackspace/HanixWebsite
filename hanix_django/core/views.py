"""
Views for the core app - Frontend page views
"""

from django.shortcuts import render
from django.views.decorators.http import require_http_methods


def index(request):
    """
    Home page view
    """
    context = {
        'page_title': 'Home - Hanix',
    }
    return render(request, 'index.html', context)


def about(request):
    """
    About page view
    """
    context = {
        'page_title': 'About Us - Hanix',
    }
    return render(request, 'about.html', context)


def products(request):
    """
    Products listing page view
    """
    context = {
        'page_title': 'Products - Hanix',
    }
    return render(request, 'products.html', context)


def product_detail(request):
    """
    Product detail page view
    """
    context = {
        'page_title': 'Product Details - Hanix',
    }
    return render(request, 'product_detail.html', context)


@require_http_methods(["GET", "POST"])
def contact(request):
    """
    Contact page view - Handles both GET and POST requests
    """
    if request.method == 'POST':
        # Handle form submission
        name = request.POST.get('name')
        email = request.POST.get('email')
        company = request.POST.get('company')
        phone = request.POST.get('phone', '')
        category = request.POST.get('category')
        quantity = request.POST.get('quantity', '')
        message = request.POST.get('message')
        subscribe = request.POST.get('subscribe') == 'on'
        
        # Here you would typically send an email or save to database
        # For now, we'll just render the page with a success message
        context = {
            'page_title': 'Contact Us - Hanix',
            'success_message': 'Thank you for your inquiry! We will contact you shortly.',
        }
        return render(request, 'contact.html', context)
    
    context = {
        'page_title': 'Contact Us - Hanix',
    }
    return render(request, 'contact.html', context)
