from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def get_algorithm_page(request):
    return render(request,'hamming/algorithm.html')
def get_theory_page(request):
    return render(request,'hamming/theory.html')