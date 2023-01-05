from django.urls import path
from .views import *

urlpatterns=[
    path('',get_algorithm_page),
    path('hamming/',get_algorithm_page),
]