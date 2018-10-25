from django.urls import path, include
from directory import views

urlpatterns = [
    path('', views.directory)
]
