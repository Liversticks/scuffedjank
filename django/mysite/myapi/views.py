from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.http import JsonResponse
from myapi.scraper import *
# Create your views here.


def getItem(request, product_name):

    # using product_name, call scraper with the name,

    # get returned data, put it inside of data list

    returneddata = getFromURL(product_name) # this is the scraper
    data = {
        "product_name": product_name,
        "data": returneddata
    }
    return JsonResponse(data)
