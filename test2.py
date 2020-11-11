from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.dbwine

# print(type(len(list(db.wines_test.find({})))))

# last_date = "2019-01-01"        # 다른 collection 혹은 다른 db에 저장 후 크롤링이 끝이나면 현재 시각 저장
# db.wines_last_update.insert_one({"last_date": last_date})
#
# db.wines_last_update.insert_one({"page": 1})

# last_page = list(db.wines_last_update.find({}, {"_id": False, "page": True}))[1]["page"]
# db.wines_last_update.update_one({"page": last_page}, {"$set": {"page": 176}})
# print(last_page)

# 예측할 수 없음
# db.wines_last_update.insert_one({"page_date": "2020-10-13"})
# last_page_date = list(db.wines_last_update.find({}, {"_id": False, "page_date": True}))[2]["page_date"]
# db.wines_last_update.update_one({"page_date": last_page_date}, {"$set": {"page_date": int}})

# db.wines_last_update.update_one({"page": last_page}, {"$set": {"page": i}})

# all_db_k_name = list(db.wines_test.find({}, {"_id": False, "와인_이름_kr": True}))
# print(all_db_k_name)
# all_db_winery = list(db.wines_test.find({}, {"_id": False, "와이너리": True}))
# print(all_db_winery)
# all_db_date = list(db.wines_test.find({}, {"_id": False, "수입일": True}))
# print(all_db_date)
#
# # {'와인_이름_kr': '아나코타 다코타 카버네 소비뇽'}
#
# k_name_dictionary = {"와인_이름_kr": '아나코타 다코타 카버네 소비뇽'}
#
# # if winery_dictionary in all_db_k_names
# # winery_dictionary = {"와이너리": winery, "와인_이름_kr": k_name}
# # all_db_k_names = list(db.wines_test.find({}, {"_id": False, "와인_이름_kr": k_name, "와이너리": True}))
#
# # 결국 수입일을 바꾸는 게 목적이니까..
#
# # print(all_db_k_name.index(k_name_dictionary))
#
# all_db_date_str = list(all_db_date[all_db_k_name.index(k_name_dictionary)].values())[0]     # is not in list
# print(all_db_date_str)
#
# print(list(all_db_winery[all_db_k_name.index(k_name_dictionary)].values())[0])