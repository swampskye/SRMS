from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

# from api.auth_user.serializers import AuthUserSerializer
from api.auth_user.serializers import SignupSerializer
from auth_user.models import AuthUser

from api.auth_user.serializers import AuthUserInfoSerializer


# class AuthUserViewSet(ModelViewSet):
class SignupViewSet(ModelViewSet):
    queryset = AuthUser.objects.all()
    serializer_class = SignupSerializer

    @action(methods=['POST'], detail=False, url_path='signup')
    def signup(self, request, *args, **kwargs):
        """
        注册用户接口
        """
        # 验证参数是否缺失
        try:
            username = request.data['username']
            staff_id = request.data['staff_id']
            email = request.data['email']
            phone = request.data['phone']
            is_admin = request.data['is_admin']
            print('signup!!!!!!!!!data', request.data)
        except KeyError:
            return Response({"code": status.HTTP_500_INTERNAL_SERVER_ERROR, "msg": "字段缺失"})
        # 验证用户名、邮箱、手机号是否存在
        try:
            AuthUser.objects.get(Q(staff_id=staff_id) | Q(email=email) | Q(phone=phone))
            return Response(
                {"code": status.HTTP_500_INTERNAL_SERVER_ERROR, "msg": "用户名或手机号或邮箱已注册，请更换信息重新注册"})
        except AuthUser.DoesNotExist:
            is_user = False
        # 注册用户
        if not is_user:
            auth_serializer = SignupSerializer(data=request.data)
            print('data::::', request.data)
            auth = auth_serializer.is_valid()
            print('auth_serializer is valid')
            if not auth:
                return Response({"code": status.HTTP_201_CREATED, "msg": auth_serializer.errors})
            else:
                auth_serializer.save()
                print('auth:', auth)
                return Response({"code": status.HTTP_200_OK, "msg": "注册成功"})

    # @action(methods=['POST', 'PUT'], detail=False, url_path='update')
    def update(self, request, *args, **kwargs):
        try:
            # 验证参数是否缺失
            staff_id = request.data['staff_id']
            email = request.data['email']
            phone = request.data['phone']
        except KeyError:
            return Response({"code": status.HTTP_500_INTERNAL_SERVER_ERROR, "msg": "email、phone字段不能为空"})
        username = request.data['username']

        auth_serializer = AuthUserInfoSerializer(data=request.data)
        print('data::::', request.data)
        auth = auth_serializer.is_valid()
        if not auth:
            print('auth_serializer is not valid')
            return Response({"code": status.HTTP_201_CREATED, "msg": auth_serializer.errors})
        else:
            AuthUser.objects.filter(staff_id=staff_id).update(username=username, email=email, phone=phone)
            # user = AuthUser.objects.get(Q(staff_id=staff_id) | Q(email=email) | Q(phone=phone))
            # user.username = username
            # user.email = email
            # user.phone = phone
            # auth_serializer.save
            print('auth:', auth)
            print('auth_serializer is valid')
            return Response({"code": status.HTTP_200_OK, "msg": '修改成功'})