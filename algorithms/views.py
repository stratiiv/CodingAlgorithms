from django.shortcuts import render


def hamming_algorithm(request):
    return render(request, 'hamming/algorithm.html')


def shannon_fano_algorithm(request):
    return render(request, 'shannon-fano/algorithm.html')
