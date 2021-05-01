from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.http import JsonResponse
import scraper
# Create your views here.


def getItem(request, product_name):

    # using product_name, call scraper with the name,

    # get returned data, put it inside of data list

    returneddata = scraper.getFromURL(product_name)
    data = {
        "product_name": product_name,
        "data": returneddata
    }
    return JsonResponse(data)
