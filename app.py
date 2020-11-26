from flask import Flask, render_template, jsonify, request
import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

app = Flask(__name__)

# *** 가비아에서 깨짐... body에 onresize 때문인듯
# ec2로 접속할 때 MongoClient('mongodb://아이디:패스워드@localhost', 27017), localhost는 내 내AWS아이피 삽입해도 됨
client = MongoClient('localhost', 27017)  # localhost
# client = MongoClient('mongodb://joka:4206@localhost', 27017)  # aws ec2 server
# db = client.admin
db = client.dbwine


@app.route('/')
def home():
    return render_template('index.html')


## 크롤링 하는건 따로 하고(html에서 입력해 주는 정보가 없음) GET방식만 서버로?
# /memo ex
# @app.route('/search', methods=['POST'])
@app.route('/search', methods=['POST'])
def post_article():
    db.search.drop()

    k_name_receive = request.form["k_name_give"]
    e_name_receive = request.form["e_name_give"]
    country_receive = request.form["country_give"]
    importer_receive = request.form["importer_give"]
    winery_receive = request.form["winery_give"]
    min_date_receive = request.form["min_date_give"]
    max_date_receive = request.form["max_date_give"]
    # ex 2020-10-10
    # print(type(min_date_receive))

    # user = {
    #     "와인_이름_kr": k_name_receive,
    #     "와인_이름_en": e_name_receive,
    #     "제조국": country_receive,
    #     "수입사": importer_receive,
    #     "와이너리": winery_receive,
    #     "수입일_min": min_date_receive,
    #     "수입일_max": max_date_receive
    # }
    # db.search.insert_one(user)
    # print(doc)
    # user_search = list(db.search.find({}, {"_id": False}))
    # print(user_search)

    # wines_test = list(db.wines_test.find({}, {"_id": False}).sort("수입일", -1))

    wines_test = list(db.wines_test.find({}, {"_id": False}))
    # print(list(wines_test[0].values())[5])

    for wt in wines_test:
        wine_k_name = list(wt.values())[0]
        wine_e_name = list(wt.values())[1]
        wine_country = list(wt.values())[2]
        wine_importer = list(wt.values())[3]
        wine_winery = list(wt.values())[4]
        wine_date = list(wt.values())[5]

        def true_or_false():
            if min_date_receive == "" and max_date_receive == "":
                if_bool = k_name_receive in wine_k_name.replace(" ", "") and e_name_receive in wine_e_name.replace(" ",
                                                                                                                   "") and country_receive in wine_country.replace(
                    " ", "") and importer_receive in wine_importer.replace(" ",
                                                                           "") and winery_receive in wine_winery.replace(
                    " ", "")
                print("true")
            else:
                if_bool = k_name_receive in wine_k_name.replace(" ", "") and e_name_receive in wine_e_name.replace(" ",
                                                                                                                   "") and country_receive in wine_country.replace(
                    " ", "") and importer_receive in wine_importer.replace(" ",
                                                                           "") and winery_receive in wine_winery.replace(
                    " ", "") and int(int(min_date_receive.replace("-", ""))) <= int(
                    int(wine_date.replace("-", ""))) <= int(int(max_date_receive.replace("-", "")))
                print("false")
            return if_bool

        # date 는 어떻게 넣지??
        if true_or_false():
            print("POST")
            db.search.insert_one(wt)

    # print(wines_test)
    # print(list(db.search.find({}, {"_id": False})))
    # headers = {
    #     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    # data = requests.get(
    #     'https://impfood.mfds.go.kr/CFCCC01F01/getList?page=1&limit=10&totalCnt=31612&dclPrductSeCd=4&prductNm=&srchNtncd=&srchHistNo=&rpsntItmNm=%EA%B3%BC%EC%8B%A4%EC%A3%BC&rpsntItmCd=C0314180000000000000&bsshNm=&ovsmnfstNm=&srchStrtDt=2019-01-01&srchEndDt=2020-10-18',
    #     headers=headers)
    # soup = BeautifulSoup(data.text, 'html.parser')

    return jsonify({'result': 'success'})


@app.route('/search', methods=['GET'])
def read_articles():
    # 와인_이름_kr, 와인_이름_en, 제조국, 수입사, 와이너리, 수입일_min, 수입일_max

    # .index? .find?

    user_result = list(db.search.find({}, {"_id": False}))

    # if len(user_result) == 0:
    #     result = "검색결과가 없습니다."
    # else:
    #     result = user_result

    # 2. articles라는 키 값으로 articles 정보 보내주기
    # return jsonify({'result': 'success', 'user_search': user_search})
    return jsonify({'result': 'success', 'wines': user_result})
    # return jsonify({'result': 'success'})


@app.route('/ip', methods=['POST'])
def post_ip():
    # 페이지 로드시 ip, name 둘다 불러오지만 name은 ""으로 들어오고
    # name 값을 넣어서 버튼을 눌러 name을 받을 수 있다.
    # 그렇게 되면 ip는 두 번, name은 1번 보내지게 된다.
    # name 이 "" 가 아닐 때 (if) 필터링 해줘야 됨
    client_ip_receive = request.form["client_ip_give"]
    # client_name_receive = request.form["client_name"]
    client_name_receive = request.form["client_name"]

    # print(client_name_receive == "")        # True
    # print(client_name_receive)              # good
    # return client_ip

    user_list = list(db.user_ip.find({}, {"_id": False}))
    # print(user_list)
    client_ip_dict = {"user_ip": client_ip_receive}
    # print(client_ip_dict)
    find_user = list(db.user_ip.find({}, {"_id": False, "user_ip": True}))
    # print(find_user)
    # 초기 db 생성
    # db.user_ip.insert({"user_ip": client_ip_receive, "user_visit": 1})

    user_ip_one = db.user_ip.find_one({"user_ip": client_ip_receive}, {'_id': False})
    # print(user_ip_one)

    # 이름 바꾸기
    if client_name_receive == "":
        print("name_nothing")
        pass
    else:
        print("name_update")
        db.user_ip.update_one({"user_ip": client_ip_receive}, {"$set": {"user_name": client_name_receive}})

    # 이름 수정하기?
    # for i in range(0, len(user_list)):
    #     if "user_" + str(i) in user_ip_one["user_name"]:
    #         print("name_update")
    #
    #         # db.user_ip.update_one({"user_ip": client_ip_receive}, {"$set": {"user_name": client_name_receive}})
    #         break
    #     else:
    #         pass

    # 방문 횟수, 첫 방문 insert
    if client_ip_dict in find_user:
        print("visit_update")
        # db.user_ip.update_one({"user_visit": client_ip_receive})
        db.user_ip.update_one({"user_ip": client_ip_receive}, {"$set": {"user_visit": user_ip_one["user_visit"] + 1}})
        # break
    else:
        print("insert")
        db.user_ip.insert({"user_ip": client_ip_receive, "user_visit": 1, "user_name": "user_" + str(len(find_user))})

    # print(client_name_receive)

    # db.user_ip.insert_one({"user_ip": []})

    # print(client_ip_receive)

    return jsonify({'result': 'success'})


@app.route('/ip', methods=['GET'])
def read_ip():
    # client_ip = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
    client_ip_test = list(list(db.user_ip.find({}, {"_id": False}))[0].values())[0]
    client_ip = list(db.user_ip.find({}, {"_id": False}))
    print(list(db.user_ip.find({}, {"_id": False})))
    # return client_ip
    # print(client_ip)
    # print(client_ip)

    # return jsonify({'ip': request.remote_addr}), 200
    # return jsonify({'ip': request.environ['REMOTE_ADDR']}), 200
    return jsonify({'result': 'success', 'ip': client_ip}), 200


# debug=True 를 실제로 돌리게 될 때는 꺼야한다고 한다.
if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
    # app.run(host='112.170.15.208', port=5000, debug=False)
