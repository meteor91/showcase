from django.urls import path
from .views import LoginView, LogoutView, current_user

urlpatterns = [
    path('current-user/', current_user),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view(), name='knox_logout'),
    #TODO: logoutall реализовать и проверить через базу
    # path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
]
