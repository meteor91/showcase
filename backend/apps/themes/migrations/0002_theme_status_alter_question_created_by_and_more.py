# Generated by Django 4.0.6 on 2022-10-25 11:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('themes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='theme',
            name='status',
            field=models.CharField(choices=[('ON_MODERATION', 'На модерации'), ('ACCEPTED', 'Принят')], default='ON_MODERATION', max_length=16, verbose_name='Статус'),
        ),
        migrations.AlterField(
            model_name='question',
            name='created_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='theme',
            name='created_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to=settings.AUTH_USER_MODEL),
        ),
    ]