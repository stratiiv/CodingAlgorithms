from django.urls import path
from . import views

urlpatterns = [
    path('manual/', views.get_manual, name='manual')
]