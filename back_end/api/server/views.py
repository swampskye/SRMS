from rest_framework.viewsets import ModelViewSet

from api.server.serializers import ServerSerializer
from server.models import Server


class ServerViewSet(ModelViewSet):
    queryset = Server.objects.all()
    serializer_class = ServerSerializer



