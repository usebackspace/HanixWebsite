from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# -------------------------
# CATEGORY
# -------------------------
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.name

# -------------------------
# PRODUCT MASTER
# -------------------------
class Product(models.Model):
    PRODUCT_TYPE_CHOICES = [("bag", "Bag"), ("clothing", "Clothing")]
    
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products")
    product_type = models.CharField(max_length=20, choices=PRODUCT_TYPE_CHOICES)
    brand = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

# -------------------------
# PRODUCT VARIANTS
# -------------------------
class ProductVariant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="variants")
    sku = models.CharField(max_length=50, unique=True)
    barcode = models.CharField(max_length=100, blank=True, null=True)
    color = models.CharField(max_length=50, blank=True, null=True)
    size = models.CharField(max_length=50, blank=True, null=True)
    material = models.CharField(max_length=100, blank=True, null=True)
    image = models.ImageField(upload_to="products/variants/", blank=True, null=True)

    # Pricing
    price_b2c = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    price_b2b = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    min_order_qty_b2b = models.IntegerField(default=10)
    max_order_qty_b2c = models.IntegerField(default=5)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.product.name} - {self.sku}"

# -------------------------
# WAREHOUSE
# -------------------------
class Warehouse(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=150)
    manager = models.CharField(max_length=100, blank=True, null=True)
    
    def __str__(self):
        return self.name

# -------------------------
# STOCK
# -------------------------
class Stock(models.Model):
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, related_name="stocks")
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE, related_name="stocks")
    quantity = models.IntegerField(default=0)
    reserved = models.IntegerField(default=0)
    reorder_level = models.IntegerField(default=5)
    reorder_quantity = models.IntegerField(default=20)

    class Meta:
        unique_together = ("variant", "warehouse")

    @property
    def available(self):
        return self.quantity - self.reserved

    def __str__(self):
        return f"{self.variant.sku} @ {self.warehouse.name}"

# -------------------------
# SUPPLIER
# -------------------------
class Supplier(models.Model):
    name = models.CharField(max_length=150)
    contact_person = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.name

# -------------------------
# PURCHASE ORDER
# -------------------------
class PurchaseOrder(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, related_name="purchase_orders")
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expected_delivery = models.DateField()
    is_received = models.BooleanField(default=False)
    
    def __str__(self):
        return f"PO #{self.id} - {self.supplier.name}"

class PurchaseOrderItem(models.Model):
    purchase_order = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE, related_name="items")
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)

    def total_price(self):
        return self.quantity * self.price_per_unit

    def __str__(self):
        return f"{self.variant.sku} - {self.quantity}"

# -------------------------
# SALES ORDER
# -------------------------
class SalesOrder(models.Model):
    customer_name = models.CharField(max_length=150)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_fulfilled = models.BooleanField(default=False)
    
    def __str__(self):
        return f"SO #{self.id} - {self.customer_name}"

class SalesOrderItem(models.Model):
    sales_order = models.ForeignKey(SalesOrder, on_delete=models.CASCADE, related_name="items")
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)

    def total_price(self):
        return self.quantity * self.price_per_unit

    def __str__(self):
        return f"{self.variant.sku} - {self.quantity}"

# -------------------------
# INVENTORY LOG
# -------------------------
class InventoryLog(models.Model):
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, related_name="logs")
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE)
    change = models.IntegerField()
    reason = models.CharField(max_length=200)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.variant.sku} {self.change} units"
