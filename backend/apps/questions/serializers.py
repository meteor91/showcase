from wsgiref.validate import validator
from rest_framework import serializers

from .models import Question, Theme


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'label', 'answer', 'price', 'theme_label',]

    # для проверки отображения серверных ошибок
    def validate_label(self, value):
        if 'бля' in value.lower():
            raise serializers.ValidationError('Не разрешается использовать нецензурную брань')
        return value


class ThemeSerializer(serializers.ModelSerializer):
    question_set = QuestionSerializer(many = True)

    class Meta:
        model = Theme
        fields = ['id', 'label', 'question_set']

    def create(self, validated_data):
        question_set = validated_data.pop('question_set')
        theme = Theme.objects.create(**validated_data)

        for question in question_set:
            Question.objects.create(theme=theme, created_by=theme.created_by, **question)

        return theme

    # для проверки отображения серверных ошибок
    def validate_label(self, value):
        if 'бля' in value.lower():
            raise serializers.ValidationError('Не разрешается использовать нецензурную брань')
        return value

    def validate_question_set(self, value):
        if len(value)<=1:
            raise serializers.ValidationError('Добавьте больше вопросов')
        return value