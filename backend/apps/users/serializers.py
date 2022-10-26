from django.contrib.auth import authenticate
from rest_framework import serializers

from themes.models import Theme
from .models import User


class UserSerializer(serializers.ModelSerializer):
    '''serializer for the user object'''
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'date_joined', 'role')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserDetailsSerializer(serializers.ModelSerializer):

    themes_count = serializers.SerializerMethodField()

    def get_themes_count(self, obj):
        return {
            'accepted': obj.theme_set.filter(status=Theme.STATUS.ACCEPTED).count(),
            'on_moderation': obj.theme_set.filter(status=Theme.STATUS.ON_MODERATION).count(),
            'declined': obj.theme_set.filter(status=Theme.STATUS.DECLINED).count(),
        }

    class Meta:
        model = User
        fields = ('id', 'username', 'date_joined', 'role', 'themes_count')


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError(
            'Unable to authenticate with provided credentials',
            code='authentication'
        )
