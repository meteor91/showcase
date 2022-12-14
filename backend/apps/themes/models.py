from statistics import mode
from django.db import models
from core.models import BasicsModelMixin

from users.models import User

# Create your models here.


class Theme(BasicsModelMixin, models.Model):
    label = models.CharField(max_length=200)

    class STATUS:
        ON_MODERATION = 'ON_MODERATION'
        ACCEPTED = 'ACCEPTED'
        DECLINED = 'DECLINED'

    STATUS_CHOICES = (
        (STATUS.ON_MODERATION, 'On moderation'),
        (STATUS.ACCEPTED, 'Accepted'),
        (STATUS.DECLINED, 'Declined'),
    )

    status = models.CharField('Статус', choices=STATUS_CHOICES, max_length=16, default=STATUS.ON_MODERATION)


class Question(BasicsModelMixin, models.Model):
    label = models.CharField(max_length=200)
    answer = models.CharField(max_length=200)
    theme = models.ForeignKey(Theme, on_delete=models.CASCADE)
    
    class prices:
        p100 = 100
        p200 = 200
        p300 = 300
        p400 = 400
        p500 = 500

    PRICE_CHOICES = (
        (prices.p100, 100),
        (prices.p200, 200),
        (prices.p300, 300),
        (prices.p400, 400),
        (prices.p500, 500),
    )

    price = models.IntegerField('Цена', choices=PRICE_CHOICES)

    @property
    def theme_label(self):
        return self.theme.label


class ThemeStatusChange(BasicsModelMixin, models.Model):
    prev_status = models.CharField('Старый статус', choices=Theme.STATUS_CHOICES, max_length=16)
    next_status = models.CharField('Новый статус', choices=Theme.STATUS_CHOICES, max_length=16)
    theme = models.ForeignKey(Theme, on_delete=models.CASCADE)

