from django.shortcuts import render


def hamming_algorithm(request):
    return render(request, 'hamming/hamming.html')

def shannon_fano_algorithm(request):
    return render(request, 'shannon-fano/shannon-fano.html')

def huffman_algorithm(request):
    return render(request, 'huffman/huffman.html')
