from django.contrib.auth import get_user_model
from ..models import Customer, Vendor

def create_user_account(email, username, first_name,
                        last_name, password, is_customer, is_vendor, address, **extra_fields):
    user = get_user_model().objects.create_user(
        email=email, username=username, first_name=first_name,
        last_name=last_name, password=password, is_customer= is_customer, is_vendor=is_vendor, address=address, **extra_fields)
    
    if(is_customer):
        customer = Customer(user=user)
        customer.save()
    elif(is_vendor):
        vendor = Vendor(user=user)
        vendor.save()

    return user