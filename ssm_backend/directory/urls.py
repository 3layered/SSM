from django.urls import path, include
from directory import views

urlpatterns = [
    path('<str:dir>', views.directory)
]
