from django.shortcuts import render
from rest_framework import viewsets

from .models import Question, Theme
from .serializers import QuestionSerializer, ThemeSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    queryset =  Question.objects.all()


class ThemeViewSet(viewsets.ModelViewSet):
    serializer_class = ThemeSerializer
    queryset =  Theme.objects.all()
