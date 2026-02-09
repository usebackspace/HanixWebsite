from django.shortcuts import render, get_object_or_404, redirect
from .models import (
    Category, Product, ProductVariant, Warehouse,
    Supplier, PurchaseOrder, SalesOrder, Stock, InventoryLog
)
from .forms import (
    CategoryForm, ProductForm, ProductVariantForm, WarehouseForm,
    SupplierForm, PurchaseOrderForm, SalesOrderForm, StockForm, InventoryLogForm
)

# ------------------------ Helper CRUD functions ------------------------
def object_list(request, model, template_name, context_name):
    objects = model.objects.all()
    return render(request, template_name, {context_name: objects})

def object_create(request, form_class, template_name, redirect_url):
    if request.method == "POST":
        form = form_class(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect(redirect_url)
    else:
        form = form_class()
    return render(request, template_name, {'form': form})

def object_update(request, pk, model, form_class, template_name, redirect_url):
    obj = get_object_or_404(model, pk=pk)
    if request.method == "POST":
        form = form_class(request.POST, request.FILES, instance=obj)
        if form.is_valid():
            form.save()
            return redirect(redirect_url)
    else:
        form = form_class(instance=obj)
    return render(request, template_name, {'form': form})

def object_delete(request, pk, model, template_name, redirect_url):
    obj = get_object_or_404(model, pk=pk)
    if request.method == "POST":
        obj.delete()
        return redirect(redirect_url)
    return render(request, template_name, {'object': obj})

# ------------------------ Category ------------------------
def category_list(request):
    return object_list(request, Category, 'inventory/category_list.html', 'categories')

def category_create(request):
    return object_create(request, CategoryForm, 'inventory/category_form.html', 'category_list')

def category_update(request, pk):
    return object_update(request, pk, Category, CategoryForm, 'inventory/category_form.html', 'category_list')

def category_delete(request, pk):
    return object_delete(request, pk, Category, 'inventory/category_confirm_delete.html', 'category_list')

# ------------------------ Product ------------------------
def product_list(request):
    return object_list(request, Product, 'inventory/product_list.html', 'products')

def product_create(request):
    return object_create(request, ProductForm, 'inventory/product_form.html', 'product_list')

def product_update(request, pk):
    return object_update(request, pk, Product, ProductForm, 'inventory/product_form.html', 'product_list')

def product_delete(request, pk):
    return object_delete(request, pk, Product, 'inventory/product_confirm_delete.html', 'product_list')

# ------------------------ ProductVariant ------------------------
def variant_list(request):
    return object_list(request, ProductVariant, 'inventory/productvariant_list.html', 'variants')

def variant_create(request):
    return object_create(request, ProductVariantForm, 'inventory/productvariant_form.html', 'variant_list')

def variant_update(request, pk):
    return object_update(request, pk, ProductVariant, ProductVariantForm, 'inventory/productvariant_form.html', 'variant_list')

def variant_delete(request, pk):
    return object_delete(request, pk, ProductVariant, 'inventory/productvariant_confirm_delete.html', 'variant_list')

# ------------------------ Warehouse ------------------------
def warehouse_list(request):
    return object_list(request, Warehouse, 'inventory/warehouse_list.html', 'warehouses')

def warehouse_create(request):
    return object_create(request, WarehouseForm, 'inventory/warehouse_form.html', 'warehouse_list')

def warehouse_update(request, pk):
    return object_update(request, pk, Warehouse, WarehouseForm, 'inventory/warehouse_form.html', 'warehouse_list')

def warehouse_delete(request, pk):
    return object_delete(request, pk, Warehouse, 'inventory/warehouse_confirm_delete.html', 'warehouse_list')

# ------------------------ Supplier ------------------------
def supplier_list(request):
    return object_list(request, Supplier, 'inventory/supplier_list.html', 'suppliers')

def supplier_create(request):
    return object_create(request, SupplierForm, 'inventory/supplier_form.html', 'supplier_list')

def supplier_update(request, pk):
    return object_update(request, pk, Supplier, SupplierForm, 'inventory/supplier_form.html', 'supplier_list')

def supplier_delete(request, pk):
    return object_delete(request, pk, Supplier, 'inventory/supplier_confirm_delete.html', 'supplier_list')

# ------------------------ PurchaseOrder ------------------------
def purchaseorder_list(request):
    return object_list(request, PurchaseOrder, 'inventory/purchaseorder_list.html', 'purchase_orders')

def purchaseorder_create(request):
    return object_create(request, PurchaseOrderForm, 'inventory/purchaseorder_form.html', 'purchaseorder_list')

def purchaseorder_update(request, pk):
    return object_update(request, pk, PurchaseOrder, PurchaseOrderForm, 'inventory/purchaseorder_form.html', 'purchaseorder_list')

def purchaseorder_delete(request, pk):
    return object_delete(request, pk, PurchaseOrder, 'inventory/purchaseorder_confirm_delete.html', 'purchaseorder_list')

# ------------------------ SalesOrder ------------------------
def salesorder_list(request):
    return object_list(request, SalesOrder, 'inventory/salesorder_list.html', 'sales_orders')

def salesorder_create(request):
    return object_create(request, SalesOrderForm, 'inventory/salesorder_form.html', 'salesorder_list')

def salesorder_update(request, pk):
    return object_update(request, pk, SalesOrder, SalesOrderForm, 'inventory/salesorder_form.html', 'salesorder_list')

def salesorder_delete(request, pk):
    return object_delete(request, pk, SalesOrder, 'inventory/salesorder_confirm_delete.html', 'salesorder_list')

# ------------------------ Stock ------------------------
def stock_list(request):
    return object_list(request, Stock, 'inventory/stock_list.html', 'stocks')

def stock_create(request):
    return object_create(request, StockForm, 'inventory/stock_form.html', 'stock_list')

def stock_update(request, pk):
    return object_update(request, pk, Stock, StockForm, 'inventory/stock_form.html', 'stock_list')

def stock_delete(request, pk):
    return object_delete(request, pk, Stock, 'inventory/stock_confirm_delete.html', 'stock_list')

# ------------------------ InventoryLog ------------------------
def inventorylog_list(request):
    return object_list(request, InventoryLog, 'inventory/inventorylog_list.html', 'logs')

def inventorylog_create(request):
    return object_create(request, InventoryLogForm, 'inventory/inventorylog_form.html', 'inventorylog_list')

def inventorylog_update(request, pk):
    return object_update(request, pk, InventoryLog, InventoryLogForm, 'inventory/inventorylog_form.html', 'inventorylog_list')

def inventorylog_delete(request, pk):
    return object_delete(request, pk, InventoryLog, 'inventory/inventorylog_confirm_delete.html', 'inventorylog_list')
