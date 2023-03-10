from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.auth_user.serializers import AuthUserSerializer
from auth_user.models import AuthUser


class AuthUserViewSet(ModelViewSet):
    queryset = AuthUser.objects.all()
    serializer_class = AuthUserSerializer

    @action(methods=['POST'], detail=False, url_path='signup')
    def signup(self, request, *args, **kwargs):
        """
        注册用户接口
        """
        # 验证参数是否缺失
        try:
            username = request.data['username']
            email = request.data['email']
            phone = request.data['phone']
        except KeyError:
            return Response({"code": status.HTTP_500_INTERNAL_SERVER_ERROR, "msg": "用户名或邮箱或手机号缺失"})
        # 验证用户名、邮箱、手机号是否存在
        try:
            AuthUser.objects.get(Q(username=username) | Q(email=email) | Q(phone=phone))
            return Response(
                {"code": status.HTTP_500_INTERNAL_SERVER_ERROR, "msg": "用户名或手机号或邮箱已注册，请更换信息重新注册"})
        except AuthUser.DoesNotExist:
            is_user = False
        # 注册用户
        if not is_user:
            auth_serializer = AuthUserSerializer(data=request.data)
            auth = auth_serializer.is_valid()
            if not auth:
                return Response({"code": status.HTTP_201_CREATED, "msg": auth_serializer.errors})
            else:
                auth_serializer.save()
                print(auth)
                return Response({"code": status.HTTP_200_OK, "msg": "注册成功"})
