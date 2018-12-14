from django.urls import path, include
from . import views

# https://hadoop.apache.org/docs/current/hadoop-yarn/hadoop-yarn-site/ResourceManagerRest.html

urlpatterns = [
    # YARN Cluster Metrics
    path('metrics/', views.metrics),
    # YARN Scheduler Metrics
    path('scheduler/', views.scheduler),
    # YARN cluster info
    path('info/', views.info),
    # YARN nodes
    path('nodes/', views.nodes),
    # Running apps
    path('apps/', views.apps),
    # Node labels
    path('nodelabels/', views.nodelabels),
]
