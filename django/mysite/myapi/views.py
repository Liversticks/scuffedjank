from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.http import JsonResponse
# Create your views here.


def getItem(request, product_name):

    # using product_name, call scraper with the name,

    # get returned data, put it inside of data list

    data = {
        "product_name": product_name,
        "data": [ f"{product_name}1", f"{product_name}2", f"{product_name}3" ]
    }
    return JsonResponse(data)
