import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class AuthUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    phone = models.CharField(max_length=11, blank=False, help_text='phone numbers')

    class Meta:
        db_table = 'auth_user'
        verbose_name = 'my_user'
        verbose_name_plural = verbose_name
