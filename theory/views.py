from django.shortcuts import render


def get_manual(request):
    return render(request, 'theory/manual.html')