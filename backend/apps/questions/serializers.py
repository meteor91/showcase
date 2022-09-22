from rest_framework import serializers

from .models import Question, Theme

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'label', 'answer', 'price', 'theme_label',]


class ThemeSerializer(serializers.ModelSerializer):
    question_set = QuestionSerializer(many = True)
    class Meta:
        model = Theme
        fields = ['id', 'label', 'question_set']

    def create(self, validated_data):
        # return super().create(validated_data)
        question_set = validated_data.pop('question_set')
        theme = Theme.objects.create(**validated_data)

        for question in question_set:
            Question.objects.create(theme=theme, created_by=theme.created_by, **question)

        return theme