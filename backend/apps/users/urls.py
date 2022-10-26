from django.urls import path, re_path, include
from rest_framework import routers

from .views import LoginView, LogoutView, current_user, UsersViewSet, UserLastThemesView

router = routers.DefaultRouter()
router.register(r'users', UsersViewSet)

urlpatterns = [
    path('current-user/', current_user),
    re_path('^user-last-themes/(?P<userId>[^/.]+)/$', UserLastThemesView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view(), name='knox_logout'),
    path('', include(router.urls)),
    #TODO: logoutall реализовать и проверить через базу
    # path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
]
