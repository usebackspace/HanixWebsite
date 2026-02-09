"""
URL configuration for the core app
"""

from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('products/', views.products, name='products'),
    path('product-details/', views.product_detail, name='product_detail'),
    path('contact/', views.contact, name='contact'),
]
