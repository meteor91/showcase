from django.urls import include, path
from rest_framework import routers
from .views import LoginView, LogoutView, UserViewSet, current_user

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
    path('current-user/', current_user),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view(), name='knox_logout'),
    #TODO: logoutall реализовать и проверить через базу
    # path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
]
