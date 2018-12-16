from django.urls import path, include
from . import views

# https://spark.apache.org/docs/latest/monitoring.html

# In the API, an application is referenced by its application ID, [app-id].
# When running on YARN, each application may have multiple attempts, 
# but there are attempt IDs only for applications in cluster mode, not applications in client mode. 
# Applications in YARN cluster mode can be identified by their [attempt-id]. 
# In the API listed below, 
# when running in YARN cluster mode, [app-id] will actually be [base-app-id]/[attempt-id], 
# where [base-app-id] is the YARN application ID.

urlpatterns = [
    path('', views.get_app_list),
    path('submit/', views.submit),
    path('submit/<str:app_id>/', views.submit),
    path('kill/<str:app_id>/', views.kill),
    # path('failover/<str:app_id>/', views.change_failover_plan),
    path('dependency/', views.dependency),
    path('dependency/<str:parent_app_id>/<str:child_app_id>/', views.dependency),
    path('failover/<str:app_id>', views.change_failover_plan),

    # Spark environment
    path('<str:app_id>/environment/', views.environment),
    # Spark executers
    path('<str:app_id>/allexecutors/', views.allexecutors),
    # Spark stages
    path('<str:app_id>/stages/', views.stages), # Returns latest stage information
    # path('<str:app_id>/stages/<int:stage_id>/', views.stage_detail),
    path('<str:app_id>/stages/<str:stage_id>/', views.stage_detail),
    # Spark streaming
    path('<str:app_id>/streaming/', include('streaming.urls')),
]
