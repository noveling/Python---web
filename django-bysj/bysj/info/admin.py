from django.contrib import admin
from .models import OneClass,Student,Teacher

class ClassAdmin(admin.ModelAdmin):
    list_display = ["id","name"]

class StudentAdmin(admin.ModelAdmin):
    list_display = ["id","name","age","scontend","sclass"]

class TeacherAdmin(admin.ModelAdmin):
    list_display = ["id","name","age","tcontend","tclass"]


admin.site.register(OneClass,ClassAdmin)
admin.site.register(Student,StudentAdmin)
admin.site.register(Teacher)


