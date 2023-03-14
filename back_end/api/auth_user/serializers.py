from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import update_last_login
from rest_framework import serializers, status
from rest_framework.settings import api_settings
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from auth_user.models import AuthUser
from utils.validator import UnicodePhoneValidator, UnicodePasswordValidator


class AuthUserSerializer(serializers.ModelSerializer):
    # r_password = serializers.CharField(min_length=9, max_length=20, write_only=True)
    r_password = serializers.CharField(max_length=20, write_only=True)

    class Meta:
        model = AuthUser
        # fields = ['username', 'phone', 'email', 'password', 'r_password']
        fields = ['staff_id', 'phone', 'email', 'password', 'r_password', 'is_admin']
        # fields = ['staff_id', 'phone', 'email', 'is_admin']
        extra_kwargs = {
            # "username": {
            "staff_id": {
                # "max_length": 11,
                # "error_messages": {"max_length": "超出用户字符长度，最多只能输入8位"}
            },
            "phone": {
                "validators": [UnicodePhoneValidator()]
            },
            "password": {
                # "min_length": 8,
                "max_length": 20,
                "write_only": True,
                # "validators": [UnicodePasswordValidator()]
            }
        }

    def create(self, validated_data):
        print('validated_data:', validated_data)
        staff_id = validated_data.get('staff_id')
        phone = validated_data.get('phone')
        password = validated_data.get('password')
        email = validated_data.get('email')
        is_admin = validated_data.get('is_admin')
        validated_data.pop('r_password')
        hash_password = make_password(password)
        auth = AuthUser.objects.create(
            # username=username,
            staff_id=staff_id,
            password=hash_password,
            phone=phone,
            email=email,
            is_admin=is_admin,
        )
        auth.save()
        return auth

    #
    def validate(self, attrs):
        password = attrs.get('password')
        r_password = attrs.get('r_password')
        print('attrs.password', password)
        print('attrs.r_password', r_password)
        print('attrs:', attrs)
        if password != r_password:
            raise serializers.ValidationError('对不起，两次输入的密码不一致')
        return attrs


class MyTokenObtainPairSerializer(TokenObtainSerializer):
    token_class = RefreshToken
    default_error_messages = {
        "no_active_account": '用户名或密码不正确'
    }

    # def get_token(cls, user):
    #     """
    #     此方法往token的有效负载 payload 里面添加数据
    #     若自定义了用户表，可以在这里面添加用户邮箱，性别，年龄等可以公开的信息
    #     这部分放在token里面是可以被解析的，所以不要放比较私密的信息
    #     :param user: 用戶信息
    #     :return: token
    #     """
    #     print('custom token')
    #     token = super().get_token(user)
    #     # 添加个人信息
    #     token['id'] = user.id
    #     # token['mobile'] = user.mobile
    #     return token

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        # print('jwt validate')
        # refresh = get_token(self.user)
        # data["refresh"] = str(refresh)
        data["refresh!!!"] = str(refresh)
        data["access"] = str(refresh.access_token)
        data['user_id'] = str(self.user.id)
        data['is_admin'] = str(self.user.is_admin)
        # data['code'] = str(status.HTTP_200_OK)
        # if api_settings.UPDATE_LAST_LOGIN:
        #     update_last_login(None, self.user)
        return data

        # data = super().validate(attrs)
        #
        # refresh = self.get_token(self.user)
        #
        # data["refresh"] = str(refresh)
        # data["access"] = str(refresh.access_token)
        # data['user_id'] = str(self.user.id)
        # data['is_admin'] = str(self.user.is_admin)
        # # if api_settings.UPDATE_LAST_LOGIN:
        # #     update_last_login(None, self.user)
        #
        # return data
