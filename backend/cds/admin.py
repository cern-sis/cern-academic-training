from django.contrib import admin  # noqa: F401

from .models import Lecture

# Register your models here.


@admin.register(Lecture)
class LectureAdmin(admin.ModelAdmin):
    pass
