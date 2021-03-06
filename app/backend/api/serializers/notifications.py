from rest_framework import serializers
from ..models import Notification, User, NotificationType
from ..serializers import ProductSerializer

class NotificationSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField('get_user')
    product = serializers.SerializerMethodField('get_product')
    notificationType = serializers.SerializerMethodField('get_notificationType')

    class Meta:
        model = Notification
        fields = ('id', 'text', 'notificationType', 'user', 'createdAt', 'product', 'order', 'isSeen')
    
    def get_user(self, obj):
        return obj.user.username
    
    def get_product(self, obj):
        try:
            content = ProductSerializer(obj.product).data
            return content
        except:
            return None
            
    def get_notificationType(self, obj):
        content = ''
        if obj.notificationType == NotificationType.STOCK_ENDED.value:
            content = NotificationType.STOCK_ENDED.name
        elif obj.notificationType == NotificationType.STOCK_RENEWED.value:
            content = NotificationType.STOCK_RENEWED.name
        elif obj.notificationType == NotificationType.ORDER_STATUS_CHANGED.value:
            content = NotificationType.ORDER_STATUS_CHANGED.name
        elif obj.notificationType == NotificationType.NEW_DISCOUNT.value:
            content = NotificationType.NEW_DISCOUNT.name
        elif obj.notificationType == NotificationType.PRICE_ALARM.value:
            content = NotificationType.PRICE_ALARM.name
        
        return content

class SetNotificationSeenSerializer(serializers.Serializer):
    notification_id = serializers.IntegerField(required=True)

