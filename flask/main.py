from flask import Flask,render_template,request,jsonify,json
from pymongo import MongoClient
import pymongo
from datetime import datetime

app = Flask("__main__")

client = MongoClient("mongodb+srv://buket:score@cluster0.nhojf.mongodb.net/PlaDat?retryWrites=true&w=majority")
db = client["PlaDat"]
company_db = db["Company"]
city_db = db["City"]


@app.route("/")
@app.route("/home")
def home():
    return {
        "name":"demo"
    }

@app.route("/SignUpCompany", methods=["GET","POST"])
def signup_company():
    request_data = json.loads(request.data)
    #company_db.insert(request_data)
    return {"201":"Success"}

@app.route("/GetCity", methods=["GET"])
def get_city():
    city_list = []
    try:
        cities = city_db.find({})
        for city in cities:
            city_list.append(city)
    except Exception as e:
        print(e)
        return {"417":"Expectation failed"}
    return jsonify(city_list)




if __name__ == "__main__":
    app.run(debug=True)