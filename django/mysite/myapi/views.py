from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.http import JsonResponse
# Create your views here.


def getItem(request, product_name):

    # using product_name, call scraper with the name,

    # get returned data, put it inside of data list

    data = {
        "data": [ product_name ]
    }
    return JsonResponse(data)
