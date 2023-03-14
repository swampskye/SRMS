from rest_framework.serializers import ModelSerializer

from server.models import Server


class ServerSerializer(ModelSerializer):
    class Meta:
        model= Server
        fields = '__all__'

        # room = models.CharField(blank=False, max_length=10)
        # index = models.CharField(blank=False, max_length=10)
        # status = models.CharField(blank=False, max_length=10)
        # description = models.CharField(max_length=500)
        # last_fix_date = models.DateField()