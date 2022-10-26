from django.db import models
from django_softdelete.models import SoftDeleteModel


class BasicsModelMixin(SoftDeleteModel):
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    updated_at = models.DateTimeField('Дата последнего изменения', auto_now=True)
    created_by = models.ForeignKey('users.User', on_delete=models.RESTRICT)

    # Эти поля скорре всего не нужны с SoftDeleteModel
    is_enabled = models.BooleanField(verbose_name='Активно', default=True)
    is_archive = models.BooleanField(verbose_name='В архиве', default=False)

    class Meta:
        abstract = True
