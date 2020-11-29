from flask import Flask,render_template,request,jsonify,json
from pymongo import MongoClient
import pymongo
from datetime import datetime
from passlib.hash import sha256_crypt
from datetime import datetime as dt

app = Flask("__main__")

client = MongoClient("mongodb+srv://buket:score@cluster0.nhojf.mongodb.net/PlaDat?retryWrites=true&w=majority")
db = client["PlaDat"]
company_db = db["Company"]
city_db = db["City"]
uni_db = db["University"]
student_db = db["Student"]

@app.route("/")
@app.route("/home")
def home():
    return {}

def get_time():
    year = str(dt.now().year)
    month = str(dt.now().month)
    day = str(dt.now().day)
    hour = str(dt.now().hour)
    second = str(dt.now().second)
    minute = str(dt.now().minute)

    return (year+month+day+hour+minute+second)

@app.route("/SignUpCompany", methods=["GET","POST"])
def signup_company():
    data = json.loads(request.data)                         # Get data from react
    hashed_pass = sha256_crypt.encrypt(data["password"])    # Hash password
    data["password"] = hashed_pass
    time = get_time()
    company_id = int(str(data["city"])+time)
    data.update({"_id":company_id})
    try:
        company_db.insert(data)
        return {"201":"Success"}
    except Exception as e:
        print(e)
        return {"417":"Expectation failed"}


@app.route("/SignUpStudent", methods=["GET","POST"])
def signup_student():
    data = json.loads(request.data)                         # Get data from react
    hashed_pass = sha256_crypt.encrypt(data["password"])    # Hash password
    data["password"] = hashed_pass
    student_id = int(str(data["university"]) + data["studentID"])
    data.update({"_id":student_id})
    print(data)
    data["studentID"] = int(data["studentID"])
    try:
        student_db.insert(data)
        return {"201":"Success"}
    except Exception as e:
        print(e)
        return {"417":"Expectation failed"}




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

@app.route("/GetUniversity", methods=["GET"])
def get_university():
    university_list = []
    try:
        unies = uni_db.find({})
        for uni in unies:
            university_list.append(uni)
    except Exception as e:
        print(e)
        return {"417":"Expectation failed"}
    return jsonify(university_list)




if __name__ == "__main__":
    app.run(debug=True)