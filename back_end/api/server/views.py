from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.server.serializers import ServerSerializer
from server.models import Server


class ServerViewSet(ModelViewSet):
    queryset = Server.objects.all()
    serializer_class = ServerSerializer

    @action(methods=['GET'], detail=False, url_path='failed_servers')
    def failed_servers(self, request, *args, **kwargs):
        queryset = Server.objects.filter(status='warning')
        # page = self.paginate_queryset(self.queryset)
        # if page is not None:
        #     serializer = self.get_serializer(page, many=True)
        #     return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
