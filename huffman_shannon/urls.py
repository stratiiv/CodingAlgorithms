from django.urls import path
from .views import *

urlpatterns=[
    path('huffman_shannon-fano/',get_algorithm_page),
]