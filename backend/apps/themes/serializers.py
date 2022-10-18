from rest_framework import serializers

from .models import Question, Theme


def contain_bad_word(value):
    value_lower = value.lower()
    return any(val in value_lower for val in ['бля', 'fuck'])


class QuestionSerializer(serializers.ModelSerializer):
    
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Question
        fields = ['id', 'label', 'answer', 'price', 'theme_label',]

    # для проверки отображения серверных ошибок
    def validate_label(self, value):
        if contain_bad_word(value):
            raise serializers.ValidationError('Не разрешается использовать нецензурную брань')
        return value

    def validate_answer(self, value):
        # if 'бля' in value.lower():
        if contain_bad_word(value):
            raise serializers.ValidationError('Не разрешается использовать нецензурную брань')
        return value


class ThemeSerializer(serializers.ModelSerializer):
    question_set = QuestionSerializer(many = True)
    created_by = serializers.StringRelatedField()

    class Meta:
        model = Theme
        fields = ['id', 'label', 'question_set', 'created_by', 'updated_at', 'created_at']

    def create(self, validated_data):
        question_set = validated_data.pop('question_set')
        theme = Theme.objects.create(**validated_data)

        for question in question_set:
            Question.objects.create(theme=theme, created_by=theme.created_by, **question)

        return theme
    
    def update(self, instance, validated_data):
        label = validated_data.pop('label')
        question_set = validated_data.pop('question_set')

        instance.label = label
        answers_ids_to_delete = list(instance.question_set.all().values_list('id', flat=True))

        for question in question_set:
            id = question.get('id', None)

            if id:
                question_to_update = instance.question_set.get(id=id)
                question_to_update.label = question['label']
                question_to_update.answer = question['answer']
                question_to_update.price = question['price']
                question_to_update.save()
                answers_ids_to_delete.remove(id)
            else:
                Question.objects.create(theme=instance, created_by=instance.created_by, **question)

        if answers_ids_to_delete:
            instance.question_set.filter(id__in=answers_ids_to_delete).delete()

        instance.save()

        return instance;

    # для проверки отображения серверных ошибок
    def validate_label(self, value):
        # if 'бля' in value.lower():
        if contain_bad_word(value):
            raise serializers.ValidationError('Не разрешается использовать нецензурную брань')
        return value

    def validate_question_set(self, value):
        if len(value) <= 1:
            raise serializers.ValidationError('Добавьте больше вопросов')
        return value