from django.urls import include, path, re_path
from rest_framework import routers

from .models import Theme
from .views import QuestionViewSet, ThemeViewSet, change_status

router = routers.DefaultRouter()
router.register(r'questions', QuestionViewSet)
router.register(r'themes', ThemeViewSet)

next_status = f'{Theme.STATUS.ON_MODERATION}|{Theme.STATUS.ACCEPTED}|{Theme.STATUS.DECLINED}'

urlpatterns = [
    path('', include(router.urls)),
    re_path(f'^change-theme-status/(?P<theme_id>[^/.]+)/(?P<next_status>{next_status})/$', change_status),
]
