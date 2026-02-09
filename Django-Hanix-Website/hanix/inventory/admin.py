from django.contrib import admin
from .models import (
    Category, Product, ProductVariant, Warehouse, Stock,
    Supplier, PurchaseOrder, PurchaseOrderItem,
    SalesOrder, SalesOrderItem, InventoryLog
)

# Product Admin
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "product_type", "brand")

@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ("sku", "product", "color", "size", "material", "price_b2c", "price_b2b", "is_active")

# Warehouse & Stock
@admin.register(Warehouse)
class WarehouseAdmin(admin.ModelAdmin):
    list_display = ("name", "location", "manager")

@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    list_display = ("variant", "warehouse", "quantity", "reserved", "available", "reorder_level")

# Supplier
@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ("name", "contact_person", "phone", "email")

# Purchase Order
class PurchaseOrderItemInline(admin.TabularInline):
    model = PurchaseOrderItem
    extra = 1

@admin.register(PurchaseOrder)
class PurchaseOrderAdmin(admin.ModelAdmin):
    list_display = ("id", "supplier", "created_by", "created_at", "expected_delivery", "is_received")
    inlines = [PurchaseOrderItemInline]

# Sales Order
class SalesOrderItemInline(admin.TabularInline):
    model = SalesOrderItem
    extra = 1

@admin.register(SalesOrder)
class SalesOrderAdmin(admin.ModelAdmin):
    list_display = ("id", "customer_name", "created_by", "created_at", "is_fulfilled")
    inlines = [SalesOrderItemInline]

# Inventory Log
@admin.register(InventoryLog)
class InventoryLogAdmin(admin.ModelAdmin):
    list_display = ("variant", "warehouse", "change", "reason", "created_by", "created_at")
