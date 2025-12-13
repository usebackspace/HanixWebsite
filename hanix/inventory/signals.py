from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import PurchaseOrderItem, SalesOrderItem, Stock, InventoryLog

# Purchase Order Stock Update
@receiver(post_save, sender=PurchaseOrderItem)
def update_stock_on_purchase(sender, instance, created, **kwargs):
    if created:
        stock, _ = Stock.objects.get_or_create(
            variant=instance.variant,
            warehouse=instance.warehouse
        )
        stock.quantity += instance.quantity
        stock.save()

        InventoryLog.objects.create(
            variant=instance.variant,
            warehouse=instance.warehouse,
            change=instance.quantity,
            reason=f"Purchase Order #{instance.purchase_order.id}",
            created_by=instance.purchase_order.created_by
        )

# Sales Order Stock Update
@receiver(post_save, sender=SalesOrderItem)
def update_stock_on_sale(sender, instance, created, **kwargs):
    if created:
        stock, _ = Stock.objects.get_or_create(
            variant=instance.variant,
            warehouse=instance.warehouse
        )
        stock.quantity -= instance.quantity
        stock.save()

        InventoryLog.objects.create(
            variant=instance.variant,
            warehouse=instance.warehouse,
            change=-instance.quantity,
            reason=f"Sales Order #{instance.sales_order.id}",
            created_by=instance.sales_order.created_by
        )
