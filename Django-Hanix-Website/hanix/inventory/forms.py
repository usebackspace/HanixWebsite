from django import forms
from .models import (
    Category, Product, ProductVariant, Warehouse,
    Supplier, PurchaseOrder, SalesOrder, Stock, InventoryLog
)

# ------------------------ Category ------------------------
class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['name', 'description']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
        }

# ------------------------ Product ------------------------
class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'category', 'product_type', 'brand', 'description']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'category': forms.Select(attrs={'class': 'form-select'}),
            'product_type': forms.Select(attrs={'class': 'form-select'}),
            'brand': forms.TextInput(attrs={'class': 'form-control'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
        }

# ------------------------ ProductVariant ------------------------
class ProductVariantForm(forms.ModelForm):
    class Meta:
        model = ProductVariant
        fields = ['product', 'sku', 'barcode', 'color', 'size', 'material', 'image', 
                  'price_b2c', 'price_b2b', 'min_order_qty_b2b', 'max_order_qty_b2c', 'is_active']
        widgets = {
            'product': forms.Select(attrs={'class': 'form-select'}),
            'sku': forms.TextInput(attrs={'class': 'form-control'}),
            'barcode': forms.TextInput(attrs={'class': 'form-control'}),
            'color': forms.TextInput(attrs={'class': 'form-control'}),
            'size': forms.TextInput(attrs={'class': 'form-control'}),
            'material': forms.TextInput(attrs={'class': 'form-control'}),
            'price_b2c': forms.NumberInput(attrs={'class': 'form-control'}),
            'price_b2b': forms.NumberInput(attrs={'class': 'form-control'}),
            'min_order_qty_b2b': forms.NumberInput(attrs={'class': 'form-control'}),
            'max_order_qty_b2c': forms.NumberInput(attrs={'class': 'form-control'}),
            'is_active': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }

# ------------------------ Warehouse ------------------------
class WarehouseForm(forms.ModelForm):
    class Meta:
        model = Warehouse
        fields = ['name', 'location', 'manager']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'location': forms.TextInput(attrs={'class': 'form-control'}),
            'manager': forms.TextInput(attrs={'class': 'form-control'}),
        }

# ------------------------ Supplier ------------------------
class SupplierForm(forms.ModelForm):
    class Meta:
        model = Supplier
        fields = ['name', 'contact_person', 'email', 'phone', 'address']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'contact_person': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'class': 'form-control'}),
            'phone': forms.TextInput(attrs={'class': 'form-control'}),
            'address': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
        }

# ------------------------ PurchaseOrder ------------------------
class PurchaseOrderForm(forms.ModelForm):
    class Meta:
        model = PurchaseOrder
        fields = ['supplier', 'created_by', 'expected_delivery', 'is_received']
        widgets = {
            'supplier': forms.Select(attrs={'class': 'form-select'}),
            'created_by': forms.Select(attrs={'class': 'form-select'}),
            'expected_delivery': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
            'is_received': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }

# ------------------------ SalesOrder ------------------------
class SalesOrderForm(forms.ModelForm):
    class Meta:
        model = SalesOrder
        fields = ['customer_name', 'created_by', 'is_fulfilled']
        widgets = {
            'customer_name': forms.TextInput(attrs={'class': 'form-control'}),
            'created_by': forms.Select(attrs={'class': 'form-select'}),
            'is_fulfilled': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }

# ------------------------ Stock ------------------------
class StockForm(forms.ModelForm):
    class Meta:
        model = Stock
        fields = ['variant', 'warehouse', 'quantity', 'reserved', 'reorder_level', 'reorder_quantity']
        widgets = {
            'variant': forms.Select(attrs={'class': 'form-select'}),
            'warehouse': forms.Select(attrs={'class': 'form-select'}),
            'quantity': forms.NumberInput(attrs={'class': 'form-control'}),
            'reserved': forms.NumberInput(attrs={'class': 'form-control'}),
            'reorder_level': forms.NumberInput(attrs={'class': 'form-control'}),
            'reorder_quantity': forms.NumberInput(attrs={'class': 'form-control'}),
        }

# ------------------------ InventoryLog ------------------------
class InventoryLogForm(forms.ModelForm):
    class Meta:
        model = InventoryLog
        fields = ['variant', 'warehouse', 'change', 'reason', 'created_by']
        widgets = {
            'variant': forms.Select(attrs={'class': 'form-select'}),
            'warehouse': forms.Select(attrs={'class': 'form-select'}),
            'change': forms.NumberInput(attrs={'class': 'form-control'}),
            'reason': forms.TextInput(attrs={'class': 'form-control'}),
            'created_by': forms.Select(attrs={'class': 'form-select'}),
        }
