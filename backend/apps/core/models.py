from django.db import models


class BasicsModelMixin(models.Model):
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    updated_at = models.DateTimeField('Дата последнего изменения', auto_now=True)
    is_enabled = models.BooleanField(verbose_name='Активно', default=True)
    is_archive = models.BooleanField(verbose_name='В архиве', default=False)
    created_by =  models.ForeignKey('users.User', related_name='+', on_delete=models.RESTRICT)

    class Meta:
        abstract = True
