from django.urls import path, include
from rest_framework import routers

from .views import LoginView, LogoutView, current_user, UsersViewSet

router = routers.DefaultRouter()
router.register(r'users', UsersViewSet)

urlpatterns = [
    path('current-user/', current_user),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view(), name='knox_logout'),
    path('', include(router.urls)),
    #TODO: logoutall реализовать и проверить через базу
    # path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
]
