import re

from rest_framework.exceptions import ValidationError


class UnicodePhoneValidator:
    """
    验证手机号格式是否合法
    """

    def __call__(self, value: str):
        if not re.match(r"^1[3-9]\d{9}$", value):
            raise ValidationError("对不起,手机格式有误!")

#
# class UnicodeEmailValidator:
#     """
#     验证邮箱格式是否合法
#     """
#
#     def __call__(self, value: str):
#         if not re.match(r"^\w+@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)+$", value):
#             raise ValidationError('对不起，邮箱格式有误')


class UnicodePasswordValidator:
    """
    验证密码格式是否合法
    """

    def __call__(self, value: str):
        print(value)
        if not re.match("^(?![A-Za-z0-9]+$)(?![a-z0-9\\W]+$)(?![A-Za-z\\W]+$)(?![A-Z0-9\\W]+$)[a-zA-Z0-9\\W]{8,20}$",
                        value):
            raise ValidationError('密码长度8~20位，必须包含大写字母、小写字母、数字以及特殊符号 例如：!@#$%&*')