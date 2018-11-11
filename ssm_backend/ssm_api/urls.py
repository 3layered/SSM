from django.urls import path, include

urlpatterns = [
    path('applications/<str:app_id>/streaming/',
         include('streaming.urls')),
    path('applications/', include('applications.urls')),
    path('directory/',
         include('directory.urls')),
]
