from knox.auth import TokenAuthentication
from rest_framework import HTTP_HEADER_ENCODING

class TokenAuthenticationViaCookie(TokenAuthentication):
    """
    Авторизуем через куки
    """
    def authenticate(self, request):
        auth = request.COOKIES.get('auth_token', '')

        if isinstance(auth, str):
            # Work around django test client oddness
            auth = auth.encode(HTTP_HEADER_ENCODING)

        if not auth:
            return None

        user, auth_token = self.authenticate_credentials(auth)
        return (user, auth_token)
