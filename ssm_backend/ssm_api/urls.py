from django.urls import path, include
from . import views

urlpatterns = [
    path('applications/', views.get_app_list),
    path('applications/<str:app_id>/streaming/',
         include('streaming.urls')),
    path('applications/submit/', views.submit),
    path('applications/kill/<str:app_id>/', views.kill),
    path('directory/',
         include('directory.urls')),
]
