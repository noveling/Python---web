from django.shortcuts import render
from django.http import  HttpResponseRedirect

# Create your views here.
from django.http import HttpResponse
from .models import Student,Teacher,OneClass
#
def hello(request):
    print(request.path)
    print(request.method)
    print(request.encoding)
    print(request.GET)
    print(request.POST)
    return HttpResponse("hello world!")

def showstudents(request):
    return render(request,r'bysj\main.html')


def addstudent(request):
    classesitem = OneClass.objects.all()
    print(classesitem)
    try:
        if request.POST:
            sclass = int(request.POST.get("sclass"))
            sname = request.POST.get("name")
            sage = request.POST.get("age")
            scontend = request.POST.get("scontend")
            newstudent = Student()
            newstudent.name = sname
            newstudent.age = int(sage)
            newstudent.scontend = scontend
            newstudent.sclass = classesitem[sclass-1]
            newstudent.save()
            return render(request,r"bysj\tip.html",{'tip':"添加一个新学生!"})
    except:
        return render(request, r"bysj\tip.html", {'tip': "添加失败!"})
    return render(request,r'bysj\addstudent.html',{"classesitem":classesitem})

def addclass(request):
    try:
        if request.POST.get("classname").strip():
            print(request.POST)
            cname = request.POST.get("classname")
            # print(cname)
            newclass = OneClass()
            newclass.name = cname
            newclass.save()
            return render(request, r"bysj\tip.html", {'tip': "成功创建一个新的班级!"})
        else:
            return render(request, r"bysj\tip.html", {'tip': "空的输入!"})
    except:
        print("没有输入！")
    return render(request,r'bysj\addclass.html')

def find_info(request):

    return render(request,r'bysj\find_info.html')

def find_res(request):
    res = []
    name = request.POST.get("name")
    id = request.POST.get("id")
    if id:
        res = Student.objects.filter(id=id)
        if name:
            res = res.filter(name=name)
        for i in res:
            print(i.scontend)
    elif name:
        res = Student.objects.filter(name = name)
        for i in res:
            print(i.scontend)

    return render(request,r'bysj\find_res.html',{"res":res})

def delete_info(request):
    id = request.POST.get("sid")
    print(id)
    if id:
        res = Student.objects.filter(id=id)
        print(res)
        if res:
            res.delete()
            return render(request, r"bysj\tip.html", {'tip': "找到学生信息并成功删除!"})
    return render(request,r'bysj\delete.html')

def rewrite(request):
    classesitem = OneClass.objects.all()
    try:
        if request.POST:
            id = request.POST.get("rwid")
            print(type(id))
            if id:
                res = Student.objects.filter(id=id)
                if res:
                    sclass = int(request.POST.get("sclass"))
                    sname = request.POST.get("name")
                    sage = request.POST.get("age")
                    scontend = request.POST.get("scontend")
                    res.update(sclass=classesitem[int(sclass) - 1], name=sname, age=sage, scontend=scontend)
                    print("修改成功！")
                    return render(request, r"bysj\tip.html", {'tip': "修改成功!"})
                else:
                    return render(request, r"bysj\tip.html", {'tip': "未找到符合ID!"})
    except:
        return render(request, r"bysj\tip.html", {'tip': "请输入真确信息!"})


    return render(request,r'bysj\rewrite.html',{"classesitem":classesitem})

def teacher(request):
    return render(request,r"bysj\teacher.html")

def add_teacher(request):
    classesitem = OneClass.objects.all()
    print(classesitem)
    try:
        if request.POST:
            tclass = int(request.POST.get("tclass"))
            tname = request.POST.get("name")
            tage = request.POST.get("age")
            tcontend = request.POST.get("tcontend")
            newteacher = Teacher()
            newteacher.name = tname
            newteacher.age = int(tage)
            newteacher.tcontend = tcontend
            newteacher.tclass = classesitem[tclass - 1]
            newteacher.save()
            return render(request, r"bysj\tip.html", {'tip': "成功添加一个新的老师!"})
    except:
        return render(request, r"bysj\tip.html", {'tip': "添加失败!"})
    return render(request, r'bysj\addteacher.html', {"classesitem": classesitem})

def show_tinfo(request):
    teachers_item = Teacher.objects.all()
    return render(request,r'bysj\teacher_info.html',{"teachersitem": teachers_item})

#
# def studentinfo(request):
#     studentsList = Students.objects.all()
#     return render(request,'bysj\students.html',{"students": studentsList})
#
# def error(request):
#     return HttpResponseRedirect("/hello")