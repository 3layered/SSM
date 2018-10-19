from django.urls import path, include

urlpatterns = [
    path('applications/<str:app_id>/streaming/',
         include('streaming.urls')),
]
