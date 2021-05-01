import requests
from bs4 import BeautifulSoup

def getFromURL(thingtosearch):
    URL = f'https://www.google.com/search?q={thingtosearch}&tbm=shop'

    page = requests.get(URL)

    soup = BeautifulSoup(page.content, 'html.parser')

    productnames = soup.find_all("div", attrs={"class": "rgHvZc"})
    productnamesList = []

    for i in productnames:
        j = i.find('a')
        #print(j.text)
        productnamesList.append(j.text)
        #print('\n')

    productImagesList = []
    productImages = soup.find_all("div", attrs={"class": "eUQRje"})
    for i in productImages:
        j = i.find('img')
        #print(j['src'])
        productImagesList.append(j['src'])

    #print(productnamesList)
    #print(productImagesList)


    #print(f'number of productnames: {len(productnamesList)}, number of productimages: {len(productImagesList)}')
    output = []
    for i in range(0, len(productnames)):
        output.append([productnamesList[i], productImagesList[i]])
    #print(output)



    return output

#print(realproductnames)
'''children = productnames.findChildren("a" , recursive=False)
for child in children:
    print(child)'''