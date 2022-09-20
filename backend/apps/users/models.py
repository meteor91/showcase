from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    class ROLES:
        HOST = 'HOST'
        PLAYER = 'PLAYER'

    ROLES_CHOICES = (
        (ROLES.HOST, 'Хост'),
        (ROLES.PLAYER, 'Игрок')
    )

    role = models.CharField('Роль', choices=ROLES_CHOICES, max_length=16)