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

@app.route("/get_univ", methods = ["GET", "POST"])
def get_univ():
    array = []
    universities = uni.find({})
    for university in universities:
        array.append(jsonify(university))
    
    data = {"uni" : array }   
    return data

@app.route("/get_student", methods = ["GET", "POST"])
def get_student():
    array = []
    students = students_db.find({})
    for student in students:
        array.append(jsonify(student))

    data = {"student" : array}
    return array

@app.route("/get_company", methods = ["GET", "POST"])
def get_company():
    array = []
    companies = companies_db.find({})
    for company in companies:
        array.append(jsonify(company))

    data = {"company" : array}
    return array

@app.route("/get_language", methods = ["GET", "POST"])
def get_language():
    array = []
    languages = languages_db.find({})
    for language in languages:
        array.append(jsonify(language))

    data = {"language" : array}
    return array


if __name__ == "__main__":
    app.run(debug=True)