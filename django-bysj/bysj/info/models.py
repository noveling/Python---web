from django.db import models
# Create your models here.\
class OneClass(models.Model):#班级模板
    name = models.CharField(max_length=50)
    def __unicode__(self):
        return self.name
class Student(models.Model):#学生模板
    name = models.CharField(max_length=20)
    age = models.IntegerField()
    scontend = models.CharField(max_length=20)
    sclass = models.ForeignKey(OneClass)
    def __unicode__(self):
        return self.name
class Teacher(models.Model):#老师模板
    name = models.CharField(max_length=20)
    age = models.IntegerField()
    tcontend = models.CharField(max_length=20)
    tclass = models.ForeignKey(OneClass)
    def __unicode__(self):
        return self.name


