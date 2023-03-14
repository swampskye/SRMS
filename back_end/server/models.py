import uuid
from datetime import datetime

from django.db import models


# Create your models here.


class Server(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True, max_length=500)
    room = models.CharField(blank=False, default='room1', max_length=10)
    index = models.CharField(blank=False, default='1-1', max_length=10)
    status = models.CharField(blank=False, default='working', max_length=10)
    description = models.CharField(default='default description', max_length=500)
    last_fix_date = models.DateField(blank=False, auto_now=True)

    class Meta:
        db_table = 'server'
        verbose_name = 'my_server'
        verbose_name_plural = verbose_name
