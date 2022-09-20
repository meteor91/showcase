from rest_framework import serializers

from .models import Question, QuestionGroup

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['label', 'price', 'question_group_label',]