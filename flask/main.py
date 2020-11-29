from flask import Flask,render_template, jsonify
from pymongo import MongoClient
import pymongo

app = Flask("__main__")



client = pymongo.MongoClient("mongodb+srv://buket:buket@cluster0.nhojf.mongodb.net/PlaDat?retryWrites=true&w=majority")
db = client["PlaDat"]
uni = db["University"]
students_db = db["Student"]
companies_db = db["Company"]
languages_db = db["Language"]

@app.route("/")
@app.route("/home")
def home():
    return {
        "name":"demo"
    }

@app.route("/GetUni", methods = ["GET", "POST"])
def get_uni():
    array = []
    try:
        universities = uni.find({})
        for university in universities:
            array.append(jsonify(university))
    except Exception as e:
        print(e)
        return {"417":"Expectation failed"}    
    data = {"uni" : array }   
    return data

@app.route("/GetStudent", methods = ["GET", "POST"])
def get_student():
    array = []
    try:
        students = students_db.find({})
        for student in students:
            array.append(jsonify(student))
    except Exception as e:
        print(e)
        return {"417":"Expectation failed"}
    data = {"student" : array}
    return data

@app.route("/GetCompany", methods = ["GET", "POST"])
def get_company():
    array = []
    try:
        companies = companies_db.find({})
        for company in companies:
            array.append(jsonify(company))
    except Exception as e:
        print(e)
        return {"417":"Expectation failed"}
    data = {"company" : array}
    return data

@app.route("/GetLanguage", methods = ["GET", "POST"])
def get_language():
    array = []
    try:
        languages = languages_db.find({})
        for language in languages:
            array.append(jsonify(language))
    except Exception as e:
        print(e)
        return {"417":"Expectation failed"}
    data = {"language" : array}
    return data


if __name__ == "__main__":
    app.run(debug=True)