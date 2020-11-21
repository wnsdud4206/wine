from flask import Flask, render_template, jsonify, request
import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

app = Flask(__name__)

# ec2로 접속할 때 MongoClient('mongodb://아이디:패스워드@localhost', 27017), localhost는 내 내AWS아이피 삽입해도 됨
client = MongoClient('localhost', 27017)                        # localhost
# client = MongoClient('mongodb://joka:4206@localhost', 27017)  # aws ec2 server
# db = client.admin
db = client.dbwine


@app.route('/')
def home():
    return render_template('index.html')


## 크롤링 하는건 따로 하고(html에서 입력해 주는 정보가 없음) GET방식만 서버로?
# /memo ex
# @app.route('/wine', methods=['POST'])
# def post_article():
#     k_name_receive = request.form["k_name_give"]
#     e_name_receive = request.form["e_name_give"]
#     country_receive = request.form["country_give"]
#     importer_receive = request.form["importer_give"]
#     winery_receive = request.form["winery_give"]
#     # date_receive = request.form["date_give"]
#
#     # headers = {
#     #     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
#     # data = requests.get(
#     #     'https://impfood.mfds.go.kr/CFCCC01F01/getList?page=1&limit=10&totalCnt=31612&dclPrductSeCd=4&prductNm=&srchNtncd=&srchHistNo=&rpsntItmNm=%EA%B3%BC%EC%8B%A4%EC%A3%BC&rpsntItmCd=C0314180000000000000&bsshNm=&ovsmnfstNm=&srchStrtDt=2019-01-01&srchEndDt=2020-10-18',
#     #     headers=headers)
#     # soup = BeautifulSoup(data.text, 'html.parser')
#
#     return jsonify({'result': 'success'})


@app.route('/wine', methods=['GET'])
def read_articles():
    # 1. mongoDB에서 _id 값을 제외한 모든 데이터 조회해오기(Read)
    # k_name_receive = request.form["k_name_give"]
    # e_name_receive = request.form["e_name_give"]
    # country_receive = request.form["country_give"]
    # importer_receive = request.form["importer_give"]
    # winery_receive = request.form["winery_give"]
    # date_receive = request.form["date_give"]
    # .index? .find?
    wines_test = list(db.wines_test.find({}, {"_id": False}).sort("수입일", -1))
    # 2. articles라는 키 값으로 articles 정보 보내주기
    return jsonify({'result': 'success', 'wines': wines_test})


# debug=True 를 실제로 돌리게 될 때는 꺼야한다고 한다.
if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
    # app.run(host='112.170.15.208', port=5000, debug=False)
