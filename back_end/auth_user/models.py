import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class AuthUser(AbstractUser):
    USERNAME_FIELD = 'staff_id'
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    staff_id = models.CharField(max_length=11, unique=True, blank=False)
    username = models.CharField(max_length=200)
    phone = models.CharField(max_length=11, blank=False, help_text='phone numbers')
    # is_admin = models.BooleanField(
    #     default=False,
    #     help_text="True: admin; False: student."
    # )
    is_admin = models.CharField(
        max_length=10,
        help_text="True: admin; False: student."
    )

    class Meta:
        db_table = 'auth_user'
        verbose_name = 'my_user'
        verbose_name_plural = verbose_name