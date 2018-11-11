from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.get_app_list),
    path('submit/', views.submit),
    path('submit/<str:app_id>/', views.submit),
    path('kill/<str:app_id>/', views.kill),
    path('failover/<str:app_id>', views.change_failover_plan)
]
