from django.contrib import admin
from django import forms

from .models import Question, Theme

class QuestionChoiceField(forms.ModelChoiceField):
     def label_from_instance(self, obj):
         return obj.label

class QuestionAdminForm(forms.ModelForm):
    question_group = QuestionChoiceField(queryset=Theme.objects.all())
    class Meta:
        model = Question
        fields = ('label', 'price', 'theme',)    

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('label', 'price', 'theme_label', 'created_by',)
    # exclude = ('created_by',)
    form = QuestionAdminForm

    def save_model(self, request, obj, form, change):
        obj.created_by = request.user
        return super().save_model(request, obj, form, change)

@admin.register(Theme)
class ThemeAdmin(admin.ModelAdmin):
    list_display = ('label', 'created_by',)
    exclude = ('created_by',)

    def save_model(self, request, obj, form, change):
        obj.created_by = request.user
        print('hohoho')
        return super().save_model(request, obj, form, change)