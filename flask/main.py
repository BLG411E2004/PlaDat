from flask import Flask,render_template,request,jsonify,json,make_response
from pymongo import MongoClient
import pymongo
from datetime import datetime
from passlib.hash import sha256_crypt
from datetime import datetime as dt

"""
1. Bilgilendirme yanıtları (100-199),
2. Başarı yanıtları (200-299),
3. Yönlendirmeler (300-399),
4. İstemci hataları (400-499) ve,
5. Sunucu hataları (500-599).
"""
"""
200 = Success
498 = Account does not exist
499 = Wrong password
417 = Database connection problems
"""



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

def get_response(code):
    response = response = app.response_class(
                    response="tjtj",
                    status=code,
                    mimetype='application/json'
                )
    return response

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
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)


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
        return get_response(200)
    except Exception as e:
        print(e)
        return get_response(417)

@app.route("/SignInStudent", methods=["GET","POST"])
def signin_student():
    data = json.loads(request.data)
    db_pass_list = []
    try:
        result = student_db.find({"email":data["email"]})
        for r in result:
            db_pass_list.append(r)
        if(db_pass_list == []):
            print("Account does not exist")
            return get_response(498)
        else:
            db_pass = db_pass_list[0]
            if(sha256_crypt.verify(data["password"],db_pass["password"])):
                print("Im in")
                return get_response(200)
            else:
                print("Wrong pass")
                return get_response(499)
    except Exception as e:
        print(e)
        return get_response(417)

@app.route("/SignInCompany", methods=["GET","POST"])
def signin_company():
    data = json.loads(request.data)
    db_pass_list = []
    try:
        result = company_db.find({"email":data["email"]})
        for r in result:
            db_pass_list.append(r)
        if(db_pass_list == []):
            print("Account does not exist")
            return get_response(498)
        else:
            db_pass = db_pass_list[0]
            if(sha256_crypt.verify(data["password"],db_pass["password"])):
                print("Im in")
                return get_response(200)
            else:
                print("Wrong pass")
                return get_response(499)
    except Exception as e:
        print(e)
        return get_response(417)



@app.route("/GetCity", methods=["GET"])
def get_city():
    city_list = []
    try:
        cities = city_db.find({})
        for city in cities:
            city_list.append(city)
    except Exception as e:
        print(e)
        return get_response(417)
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
        return get_response(417)
    return jsonify(university_list)




if __name__ == "__main__":
    app.run(debug=True)