import requests
from bs4 import BeautifulSoup

def getFromURL(thingtosearch):
    URL = f'https://www.google.com/search?q={thingtosearch}&tbm=shop'

    page = requests.get(URL)

    soup = BeautifulSoup(page.content, 'html.parser')

    productnames = soup.find_all("div", attrs={"class": "rgHvZc"})
    output = []

    for i in productnames:
        j = i.find('a')
        #print(j.text)
        output.append({"name": j.text})
        #print('\n')

    productImagesList = []
    productImages = soup.find_all("div", attrs={"class": "eUQRje"})
    for i in productImages:
        j = i.find('img')
        #print(j['src'])
        productImagesList.append(j['src'])

    productPricesList = []
    productPrices = soup.find_all("span", attrs={"class": "HRLxBb"})
    for i in productPrices:
        j = i.text.lower()
        alphabet_string = 'abcdefghijklmnopqrstuvwxyz'
        alphabet_list = list(alphabet_string)

        for alpha in alphabet_list:
            j = j.replace(alpha, "")
        j = float(j.replace("$", "").replace(",", "").replace("/", "").replace(" ", ""))

        productPricesList.append(j)
        #print(i)

    #print(productnamesList)
    #print(productImagesList)


    #print(f'number of productnames: {len(productnamesList)}, number of productimages: {len(productImagesList)}')
    
    for i in range(0, len(productnames)):
        output[i]['image'] = productImagesList[i]
        output[i]['price'] = productPricesList[i]
    #print(output)

    return output

#print(realproductnames)
'''children = productnames.findChildren("a" , recursive=False)
for child in children:
    print(child)'''