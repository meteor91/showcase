from rest_framework import viewsets
from rest_framework.decorators import api_view
from django.db import transaction
from rest_framework.response import Response

from .exceptions import StatusAlreadyChanged
from .models import Question, Theme, ThemeStatusChange
from .serializers import QuestionSerializer, ThemeSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()


class ThemeViewSet(viewsets.ModelViewSet):
    serializer_class = ThemeSerializer
    queryset = Theme.objects.all().order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


@api_view(['POST'])
@transaction.atomic
def change_status(request, theme_id, next_status):
    theme = Theme.objects.get(id=theme_id)

    if theme.status == next_status:
        raise StatusAlreadyChanged()

    ThemeStatusChange.objects.create(
        theme=theme,
        prev_status=theme.status,
        next_status=next_status,
        created_by=request.user
    )
    theme.status = next_status
    theme.save()

    return Response({
        next_status: theme.status
    })
