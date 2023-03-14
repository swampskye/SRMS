from django.contrib.auth.backends import BaseBackend
from django.db.models import Q

from auth_user.models import AuthUser


class CustomizeBackend(BaseBackend):
    """
    自定义认证类
    功能：手机号/邮箱/用户名多种方式登录
    """

    def authenticate(self, request, **kwargs: dict) -> object:
        # username = kwargs['username']
        staff_id = kwargs['staff_id']
        password = kwargs['password']
        print('backend staff_id:', staff_id)
        print('backend password:', password)
        try:
            # user = AuthUser.objects.get(Q(username=username) | Q(phone=username) | Q(email=username))
            user = AuthUser.objects.get(Q(staff_id=staff_id) | Q(phone=staff_id) | Q(email=staff_id))
            raw_password = user.check_password(password)
            if raw_password:
                return user
            else:
                return None
        except AuthUser.DoesNotExist:
            return None
