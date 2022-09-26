from django.shortcuts import render
from rest_framework import viewsets
import time

from .models import Question, Theme
from users.models import User
from .serializers import QuestionSerializer, ThemeSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    queryset =  Question.objects.all()


class ThemeViewSet(viewsets.ModelViewSet):
    serializer_class = ThemeSerializer
    queryset =  Theme.objects.all().order_by('-created_at')

    # def create(self, request, *args, **kwargs):
    #     print('create')
    #     # theme = Theme.objects.create(request.va)
    #     return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        time.sleep(5)
        serializer.save(created_by=User.objects.all()[0])
        # return super().perform_create(serializer)
