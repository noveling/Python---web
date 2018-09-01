from django.conf.urls import url
# from django.contrib import admin
from .import views


urlpatterns = [
    url(r'^hello/$', views.hello),
    url(r'^$',views.showstudents),
    url(r'^addstudent/$',views.addstudent),
    url(r'^addclass/$',views.addclass),
    url(r'^find_info/$',views.find_info),
    url(r'^find_res/$',views.find_res),
    url(r'^delete/$',views.delete_info),
    url(r'^rewrite/$',views.rewrite),
    url(r'^teacher/$',views.teacher),
    url(r'^addteacher/$',views.add_teacher),
    url(r'^show_tinfo/$',views.show_tinfo),
]
