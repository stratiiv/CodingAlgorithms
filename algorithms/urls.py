from django.views.generic import RedirectView
from django.urls import path
from . import views

urlpatterns = [
    path('', RedirectView.as_view(url='hamming/')),
    path('hamming/', views.hamming_algorithm),
]