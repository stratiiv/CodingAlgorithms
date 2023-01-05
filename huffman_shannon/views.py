from django.shortcuts import render

# Create your views here.
def get_algorithm_page(request):
    return render(request,'huffman_shannon/algorithm.html')