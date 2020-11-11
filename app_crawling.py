import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
from datetime import datetime  # test되면 사용

# *중요* 데이터가 삭제될 수 있으니 종료하기 전에 studio 3t 를 이용해 csv 파일로 export 해준다.
# 불러올 때 다시 studio 3t 를 이용하여 저장해둔 csv 파일을 import 해준다.

# 크롤링으로 하지 않고 마루사이트 url을 for문으로 select_one 돌리면서 사용자가 입력한 값이 포함된(jq .replace(" ", "")) 값을 출력해줄 수도 있지 않을까?? - 찾을 때 오래걸릴듯

# ㅇ제품명이(k_name) 같아도 다른 와이너리가 있는데 이름이 같아도 와이너리 별로 들어가도록 다시 코딩
# ㅇdb 수정하면서 테스트 해보기
# ㅇ초기(2019-01-01 ~ 2020-10-28) 대량 업데이트가 끝나면
# ㅇ1. 처음 출력되는 날짜 표시 print 주석 바꾸기 (임시 고정 날짜 바꾸기)
# ㅇ2. date1, date 주석 바꾸기 (임시 고정 날짜 바꾸기)
# ㅇ3. last_update_date 확인하기(db)
# 4. 정리할 것 더 찾아보기
# github에 올렸을 때 호스팅 하는 법, Flask-Frozen 사용?
# ㅇ검색했을 때 정렬되게 출력하기(sort())

client = MongoClient('localhost', 27017)
# client = MongoClient('mongodb://joka:4206@localhost', 27017)
db = client.dbwine

wine_list = []
# 2019-01-01 ~ 2020-10-28
# first_time_crawling_date = "2020-10-28"
# first_time_crawling_date_list = first_time_crawling_date.split("-")
# last_date = "2019-01-01"        # 다른 collection 혹은 다른 db에 저장 후 크롤링이 끝이나면 현재 시각 저장
# db.wines_last_update.insert_one({"last_date": last_date})
last_update_date = list(db.wines_last_update.find({}, {"_id": False, "last_date": True}))[0]["last_date"]
print("last_update_date: " + last_update_date)
# print(list(db.wines_last_update.find({}, {"_id": False})))

# count_num = 0           # all_db_date_array 를 위한 변수, count말고 for wine을 이용해서?x

# all_db = list(db.wines_test.find({}, {"_id": False}))
# print(all_db)
now_date = datetime.today()  # url에 사용할 현재 날짜 변수
# print(str(now_date)[0:10])
# now_date_list = str(now_date)[0:10].split("-")
# print(now_date_list)
print("현재: " + str(now_date)[0:4] + "년 " + str(now_date)[5:7] + "월 " + str(now_date)[8:10] + "일")     # 1.
# print("임시 현재: " + first_time_crawling_date_list[0] + "년 " + first_time_crawling_date_list[1] + "월 " + first_time_crawling_date_list[2] + "일")
update_start_date = [str(now_date)[0:10]][0]

# print(all_db_k_name[0]["와인_이름_kr"])
# print(all_db)
# print(list(all_db[0].values())[list(all_db[0].values()).index(all_db_k_name[0]["와인_이름_kr"])])
# print(all_db[0][str(all_db_k_name[0]["와인_이름_kr"])])
# print(all_db_date)
# print(type(list(all_db_date[0].values())[0]))     # str
# text = {"와인_이름_kr": "조스메이어 폴라스트리"}
# print(all_wine)
# if text in all_wine:
#     print("true")

# for i in range(0, len(all_wine)):           # 이걸 wine_list 에 넣기
#     print(all_wine[i]["와인_이름_kr"])
#     wine_list.append(all_wine[i]["와인_이름_kr"])

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}

# 2개로 나눌 필요가 없나??
data1 = requests.get('https://impfood.mfds.go.kr/CFCCC01F01/getList?page=1&limit=10&totalCnt=31612&dclPrductSeCd=4&prductNm=&srchNtncd=&srchHistNo=&rpsntItmNm=%EA%B3%BC%EC%8B%A4%EC%A3%BC&rpsntItmCd=C0314180000000000000&bsshNm=&ovsmnfstNm=&srchStrtDt=' + last_update_date + '&srchEndDt=' + str(now_date)[0:10], headers=headers)        # 2.
# data1 = requests.get('https://impfood.mfds.go.kr/CFCCC01F01/getList?page=1&limit=10&totalCnt=31612&dclPrductSeCd=4&prductNm=&srchNtncd=&srchHistNo=&rpsntItmNm=%EA%B3%BC%EC%8B%A4%EC%A3%BC&rpsntItmCd=C0314180000000000000&bsshNm=&ovsmnfstNm=&srchStrtDt=' + last_update_date + '&srchEndDt=' + first_time_crawling_date, headers=headers)  # 임시로 first_time_crawling_date(2020-10-28) 에 고정, 대량 데이터를 다 받을 때 까지

soup1 = BeautifulSoup(data1.text, 'html.parser')

max_page = soup1.select_one('div#content_wrap > section#content > p.page_navi > button.page_last')["onclick"].strip(
    "javascript:fnGetList()")
print("max_page_number: " + max_page)

# last_page = list(db.wines_last_update.find({}, {"_id": False, "page": True}))[1]["page"]
# print(last_page)

# page for, 190101 ~ 201018, 2020-10-18을 항상 오늘날짜로 표시하는 법? datetime, srchStrtDt 최종 업데이트한 날짜 수시로 바꿔주기 (+ 1day)(data1(last_update_date), data)
# for i in range(1, 3):         # test
# for i in range(int(max_page), 0, -1):       # 맨 뒷페이지부터
# for i in range(last_page, int(max_page) + 1):  # 1page부터(권장: 최근 날짜가 임시고정(first_time_crawling_date)이고 last_page가 수시로 없데이트 되기 때문), 2019-01-01 ~ 2020-10-28 완료
for i in range(1, int(max_page) + 1):
    # for i in range(1, int(max_page) + 1):
    # print("NO." + str(int(max_page) + 1 - i) + ", " + str(i) + " page")       # 맨 뒷페이지부터
    print(str(i) + " page")

    last_page_for = list(db.wines_last_update.find({}, {"_id": False, "page": True}))[1][
        "page"]  # last_page 와는 별개로 for문이 실행될 때마다 최신 데이터를 받아옴
    # db.wines_last_update.update_one({"page": last_page_for}, {"$set": {"page": i}})

    data = requests.get('https://impfood.mfds.go.kr/CFCCC01F01/getList?page=' + str(i) + '&limit=10&totalCnt=31612&dclPrductSeCd=4&prductNm=&srchNtncd=&srchHistNo=&rpsntItmNm=%EA%B3%BC%EC%8B%A4%EC%A3%BC&rpsntItmCd=C0314180000000000000&bsshNm=&ovsmnfstNm=&srchStrtDt=' + last_update_date + '&srchEndDt=' + str(now_date)[0:10], headers=headers)        # + str(now_date)[0:10], 2.
    # data = requests.get('https://impfood.mfds.go.kr/CFCCC01F01/getList?page=' + str(i) + '&limit=10&totalCnt=31612&dclPrductSeCd=4&prductNm=&srchNtncd=&srchHistNo=&rpsntItmNm=%EA%B3%BC%EC%8B%A4%EC%A3%BC&rpsntItmCd=C0314180000000000000&bsshNm=&ovsmnfstNm=&srchStrtDt=' + last_update_date + '&srchEndDt=' + first_time_crawling_date, headers=headers)  # 임시로 first_time_crawling_date(2020-10-28) 에 고정, 대량 데이터를 다 받을 때 까지

    soup = BeautifulSoup(data.text, 'html.parser')

    wines = soup.select('table.board_list > tbody > tr')
    # print(wines)

    for wine in wines:
        # print(wine)
        k_name = wine.select_one('td:nth-child(3) > a').text
        e_name = wine.select_one('td:nth-child(4) > a').text
        country = wine.select_one('td:nth-child(7) > a').text
        importer = wine.select_one('td:nth-child(2) > a').text
        winery = wine.select_one('td:nth-child(5) > a').text
        date = wine.select_one('td:nth-child(6) > a').text

        doc = {
            "와인_이름_kr": k_name,
            "와인_이름_en": e_name,
            "제조국": country,
            "수입사": importer,
            "와이너리": winery,
            "수입일": date
        }

        # for문 밖에 있었기 때문에 과거(for문 안에서 데이터를 insert하기 전)에 있던 데이터만을 조사해서 is not in list 라는 에러가 발생했음, 그럼 이제 마지막 페이지부터 거꾸로 크롤링해도 될듯
        all_db_k_name = list(db.wines_test.find({}, {"_id": False, "와인_이름_kr": True}))
        all_db_winery = list(db.wines_test.find({}, {"_id": False, "와이너리": True}))
        all_db_date = list(db.wines_test.find({}, {"_id": False, "수입일": True}))

        k_name_dictionary = {"와인_이름_kr": k_name}  # db에 저장된 중복데이터 추가x, 하지만 수입일이 더 최근인 와인은 교체되게끔 다시 코딩
        # print(k_name_dictionary)
        winery_dictionary = {"와이너리": winery, "와인_이름_kr": k_name}
        date_array = date.split("-")
        # print(date_array)
        # print(list(all_db_date[all_db_k_name.index(k_name_dictionary)].values())[0])
        # print(all_db_date_array)
        # print(all_db_date)
        # all_db_k_names = list(db.wines_test.find({}, {"_id": False, "와인_이름_kr": k_name, "와이너리": True}))
        # print(all_db_k_names)
        # print(all_db_k_names.index(winery_dictionary))
        # for all_ks in all_db_k_names:
        #     print(all_ks["와이너리"])
        # print(all_db_k_names)

        all_db_k_names = list(db.wines_test.find({}, {"_id": False, "와인_이름_kr": k_name, "와이너리": True}))


        # print(all_db_k_names.index(winery_dictionary))

        def insert(text):
            print(text, doc)
            db.wines_test.insert_one(doc)


        def day_update(text):
            if winery_dictionary in all_db_k_names:  # 와인_이름_kr 이 K_name 인 요소들의 "와인_이름_kr": k_name과 각각 와이너리 == "와인_이름_kr": k_name, "와이너리": winery 가 True 일 때
                all_db_date_str = list(all_db_date[all_db_k_name.index(k_name_dictionary)].values())[0]
                all_db_date_array = all_db_date_str.split("-")

                def change(this_date):
                    db.wines_test.update_one(k_name_dictionary, {"$set": {"수입일": date}})
                    print(k_name + ", " + this_date + "_change: " + all_db_date_str + " -> " + date)

                if int(date_array[0]) > int(all_db_date_array[0]):  # db 년도보다 크롤링한 년도가 더 클 때
                    # db.wines_test.delete_one(k_name_dictionary)
                    # db.wines_test.insert_one(doc)
                    change("year")
                elif int(date_array[0]) == int(all_db_date_array[0]):
                    if int(date_array[1]) > int(all_db_date_array[1]):
                        change("month")
                    elif int(date_array[1]) == int(all_db_date_array[1]):
                        if int(date_array[2]) > int(all_db_date_array[2]):
                            change(
                                "day")  # 문제 : 앵그리 오처드 크리슾 애플, day_change: 2020-10-08 -> 2020-09-29, 더 예전 수입일로 적용됨..(수정함)
                        else:
                            print(text + "_day_nothing")
                    else:
                        print(text + "_month_nothing")
                else:
                    print(text + "_year_nothing")
            else:
                insert(text + "_success")


        if k_name in wine_list:     # 필요없나??
            day_update("now")
        elif k_name_dictionary in all_db_k_name:  # 최근날짜로 교체하게끔, 교체? 지우고 새로추가?
            day_update("db")
        else:
            insert("normal_success")
            wine_list.append(k_name)

        # db.wines_last_update.update_one({"last_date": True}, {"$set": {"last_date": date}})   # 규칙성이 떨어진다.

        # if count_num < len(all_db_date):
        #     count_num = count_num + 1
        # else:

        # print(doc)
        # db.wines_test.insert_one(doc)

    # print("last_page update")

    # for aw in all_wine:
    # print(all_wine[0]["와인_이름_kr"])

# "last_date" update
db.wines_last_update.update_one({"last_date": last_update_date}, {"$set": {"last_date": update_start_date}})
print("last update start date: " + update_start_date)
# print("test")

print("all_wine_number: " + str(len(list(db.wines_test.find({})))))

print("success")

# db에 정렬이 안되어 있어도 불러올 때 정렬되어 있으면 될듯
# all_db_e_name = list(db.wines_test.find({}, {"_id": False, "와인_이름_en": True}))
# print(all_db_e_name[0].values())
# for all_e_val in all_db_e_name:
#     print(list(all_e_val.values())[0])      # db 안에 "와인_이름_kr" value 값만 출력
# db.wines_test.find({}, {"_id": False}).sort({"검역일": True})
