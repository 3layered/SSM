from django.urls import path, include

urlpatterns = [
    path('applications/', include('applications.urls')), # Spark app manipulation & metric API
    path('cluster/', include('cluster.urls')),           # YARN cluster API
    path('directory/', include('directory.urls')),       # HDFS API
]
