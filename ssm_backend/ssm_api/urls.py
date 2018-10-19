from django.urls import path, include
from . import views

urlpatterns = [
    path('applications/<str:app_id>/streaming/',
         include('streaming.urls')),
    path('applications/submit/', views.submit)
]
