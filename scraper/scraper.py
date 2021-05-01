import requests
from bs4 import BeautifulSoup

URL = 'https://www.bestbuy.ca/en-ca/category/fans/26541'
page = requests.get(URL)

soup = BeautifulSoup(page.content, 'html.parser')

results = soup.find(id='ResultsContainer')

print(results)
print("It works")
