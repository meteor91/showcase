from django.urls import re_path
from .views import IndexView

urlpatterns = [
    re_path(r'.*', IndexView.as_view()),
]
