from rest_framework import viewsets

from .models import Question, Theme
from users.models import User
from .serializers import QuestionSerializer, ThemeSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    queryset =  Question.objects.all()


class ThemeViewSet(viewsets.ModelViewSet):
    serializer_class = ThemeSerializer
    queryset =  Theme.objects.all().order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(created_by=User.objects.all()[0])
