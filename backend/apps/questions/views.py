from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import permissions

from .models import Question
from .serializers import QuestionSerializer

class QuestionViewSet(viewsets.ModelViewSet):
    print('dfdgf')
    """
    API endpoint that allows users to be viewed or edited.
    """
    # queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        print('hohoho')
        return Question.objects.all()
        # return super().get_queryset()

    def list(self, request, *args, **kwargs):
        print('hohoho')
        return super().list(request, *args, **kwargs)
    
    def retrieve(self, request, *args, **kwargs):
        print('hohoho')
        return super().retrieve(request, *args, **kwargs)