import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.dbsparta


all_db = list(db.wines_test.find({}, {"_id": False}))
print(all_db)