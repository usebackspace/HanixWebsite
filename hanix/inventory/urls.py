from django.urls import path
from . import views

urlpatterns = [
    # Category
    path('categories/', views.category_list, name='category_list'),
    path('categories/add/', views.category_create, name='category_create'),
    path('categories/<int:pk>/edit/', views.category_update, name='category_update'),
    path('categories/<int:pk>/delete/', views.category_delete, name='category_delete'),

    # Product
    path('products/', views.product_list, name='product_list'),
    path('products/add/', views.product_create, name='product_create'),
    path('products/<int:pk>/edit/', views.product_update, name='product_update'),
    path('products/<int:pk>/delete/', views.product_delete, name='product_delete'),

    # Product Variant
    path('variants/', views.variant_list, name='variant_list'),
    path('variants/add/', views.variant_create, name='variant_create'),
    path('variants/<int:pk>/edit/', views.variant_update, name='variant_update'),
    path('variants/<int:pk>/delete/', views.variant_delete, name='variant_delete'),

    # Warehouse
    path('warehouses/', views.warehouse_list, name='warehouse_list'),
    path('warehouses/add/', views.warehouse_create, name='warehouse_create'),
    path('warehouses/<int:pk>/edit/', views.warehouse_update, name='warehouse_update'),
    path('warehouses/<int:pk>/delete/', views.warehouse_delete, name='warehouse_delete'),

    # Supplier
    path('suppliers/', views.supplier_list, name='supplier_list'),
    path('suppliers/add/', views.supplier_create, name='supplier_create'),
    path('suppliers/<int:pk>/edit/', views.supplier_update, name='supplier_update'),
    path('suppliers/<int:pk>/delete/', views.supplier_delete, name='supplier_delete'),

    # Purchase Order
    path('purchaseorders/', views.purchaseorder_list, name='purchaseorder_list'),
    path('purchaseorders/add/', views.purchaseorder_create, name='purchaseorder_create'),
    path('purchaseorders/<int:pk>/edit/', views.purchaseorder_update, name='purchaseorder_update'),
    path('purchaseorders/<int:pk>/delete/', views.purchaseorder_delete, name='purchaseorder_delete'),

    # Sales Order
    path('salesorders/', views.salesorder_list, name='salesorder_list'),
    path('salesorders/add/', views.salesorder_create, name='salesorder_create'),
    path('salesorders/<int:pk>/edit/', views.salesorder_update, name='salesorder_update'),
    path('salesorders/<int:pk>/delete/', views.salesorder_delete, name='salesorder_delete'),

    # Stock
    path('stocks/', views.stock_list, name='stock_list'),
    path('stocks/add/', views.stock_create, name='stock_create'),
    path('stocks/<int:pk>/edit/', views.stock_update, name='stock_update'),
    path('stocks/<int:pk>/delete/', views.stock_delete, name='stock_delete'),

    # Inventory Log
    path('inventorylogs/', views.inventorylog_list, name='inventorylog_list'),
    path('inventorylogs/add/', views.inventorylog_create, name='inventorylog_create'),
    path('inventorylogs/<int:pk>/edit/', views.inventorylog_update, name='inventorylog_update'),
    path('inventorylogs/<int:pk>/delete/', views.inventorylog_delete, name='inventorylog_delete'),
]
