from django.shortcuts import render
from django.http import HttpResponse
def get_manual_page(request):
    return render(request,'manual.html')

def get_theory_page(request):
    return render(request,'theory.html')