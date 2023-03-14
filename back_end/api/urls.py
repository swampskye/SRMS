from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import token_obtain_pair, token_refresh
from django.urls import path
# from api.auth_user.views import AuthUserViewSet
from api.auth_user.views import SignupViewSet

from api.server.views import ServerViewSet

router = SimpleRouter()
# router.register('user', AuthUserViewSet, basename='auth_user')
router.register('user', SignupViewSet, basename='auth_user')
router.register('server', ServerViewSet, basename='auth_user')
urlpatterns = [
    path('signin/', token_obtain_pair, name='token_obtain_pair'),
    path('refresh/', token_refresh, name='token_refresh')
]
urlpatterns += router.urls