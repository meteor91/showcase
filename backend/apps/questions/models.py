from statistics import mode
from django.db import models
from core.models import BasicsModelMixin

from users.models import User

# Create your models here.

class QuestionGroup(BasicsModelMixin, models.Model):
    label = models.CharField(max_length=200)

class Question(BasicsModelMixin, models.Model):
    label = models.CharField(max_length=200)

    question_group = models.ForeignKey(QuestionGroup, on_delete=models.CASCADE)
    
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
    def question_group_label(self):
        return self.question_group.label