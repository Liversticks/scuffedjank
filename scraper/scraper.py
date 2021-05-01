import requests
from bs4 import BeautifulSoup

URL = 'https://www.google.com/search?q=fan&tbm=shop'
page = requests.get(URL)

soup = BeautifulSoup(page.content, 'html.parser')

print(soup)

#results = soup.find(id='ResultsContainer')

#print(results)
#print("It works")

k=input("press close to exit")