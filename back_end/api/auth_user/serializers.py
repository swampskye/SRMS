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
    r_password = serializers.CharField( max_length=20, write_only=True)

    class Meta:
        model = AuthUser
        fields = ['username', 'phone', 'email', 'password', 'r_password']
        extra_kwargs = {
            "username": {
                # "max_length": 8,
                "error_messages": {"max_length": "超出用户字符长度，最多只能输入8位"}
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
        print(validated_data)
        phone = validated_data.get('phone')
        password = validated_data.get('password')
        email = validated_data.get('email')
        username = validated_data.get('username')
        validated_data.pop('r_password')
        hash_password = make_password(password)
        auth = AuthUser.objects.create(
            username=username,
            password=hash_password,
            phone=phone,
            email=email
        )
        auth.save()
        return auth

    #
    def validate(self, attrs):
        password = attrs.get('password')
        r_password = attrs.get('r_password')
        if password != r_password:
            raise serializers.ValidationError('对不起，两次输入的密码不一致')
        return attrs


class MyTokenObtainPairSerializer(TokenObtainSerializer):
    token_class = RefreshToken
    default_error_messages = {
        "no_active_account": '用户名或密码不正确'
    }

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)
        data['user_id'] = str(self.user.id)
        data['code'] = str(status.HTTP_200_OK)
        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data
