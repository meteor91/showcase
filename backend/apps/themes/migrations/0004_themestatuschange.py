# Generated by Django 4.0.6 on 2022-10-27 23:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('themes', '0003_alter_theme_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='ThemeStatusChange',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_deleted', models.BooleanField(default=False)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Дата последнего изменения')),
                ('is_enabled', models.BooleanField(default=True, verbose_name='Активно')),
                ('is_archive', models.BooleanField(default=False, verbose_name='В архиве')),
                ('prev_status', models.CharField(choices=[('ON_MODERATION', 'On moderation'), ('ACCEPTED', 'Accepted'), ('DECLINED', 'Declined')], max_length=16, verbose_name='Старый статус')),
                ('next_status', models.CharField(choices=[('ON_MODERATION', 'On moderation'), ('ACCEPTED', 'Accepted'), ('DECLINED', 'Declined')], max_length=16, verbose_name='Новый статус')),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to=settings.AUTH_USER_MODEL)),
                ('theme', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='themes.theme')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
