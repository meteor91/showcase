from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    class ROLES:
        MODERATOR = 'MODERATOR'
        BASIC = 'BASIC'

    ROLES_CHOICES = (
        (ROLES.MODERATOR, 'Модератор'),
        (ROLES.BASIC, 'Обычный пользователь')
    )

    role = models.CharField('Роль', choices=ROLES_CHOICES, max_length=16, null=False, default=ROLES.BASIC)

    def __str__(self):
        return self.username