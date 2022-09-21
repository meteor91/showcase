from django.urls import include, path
from rest_framework import routers

from .views import QuestionViewSet, ThemeViewSet

router = routers.DefaultRouter()
router.register(r'questions', QuestionViewSet)
router.register(r'themes', ThemeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
