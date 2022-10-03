from django.contrib.auth import login
from rest_framework.decorators import api_view
from rest_framework import permissions, generics
from rest_framework.response import Response
from knox.models import AuthToken
from knox.views import LogoutView as KnoxLogoutView

from .auth import TokenAuthenticationViaCookie
from .serializers import UserSerializer, LoginUserSerializer


#TODO: посмотреть в сторону dj-rest-auth
class LoginView(generics.GenericAPIView):
    serializer_class = LoginUserSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        
        login(request, user)
        
        response = Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
        })

        token = AuthToken.objects.create(user)[1]

        response.set_cookie(
            'auth_token',
            token,
            # domain='localhost:8000',
            httponly=True,
            samesite='strict'
        )

        return response


class LogoutView(KnoxLogoutView):
    serializer_class = LoginUserSerializer
    authentication_classes = (TokenAuthenticationViaCookie, )

    def post(self, request, format=None):
        response = super().post(request, format)
        response.delete_cookie('auth_token')
        return response


@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
