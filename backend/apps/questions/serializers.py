from rest_framework import serializers

from .models import Question, Theme

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'label', 'price', 'theme_label',]


class ThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theme
        fields = ['id', 'label']
