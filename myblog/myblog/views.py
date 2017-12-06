from django.shortcuts import render

def music(request):
    return render(request, 'music.html')


def resume(request):
    return render(request, 'resume.html')

def data(request):
    return render(request, 'data.html')