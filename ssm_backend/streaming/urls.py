from django.urls import path, include
from streaming import views

urlpatterns = [
    path('statistics/', views.statistics),
    path('receivers/', views.receivers),
    path('receivers/<int:stream_id>', views.statistics),
    path('batches/', views.batches),
    path('batches/<int:batch_id>', views.statistics),
    path('batches/<int:batch_id>/operations/', views.statistics),
    path('batches/<int:batch_id>/operations/<int:outputOp_id>', views.statistics),
]
