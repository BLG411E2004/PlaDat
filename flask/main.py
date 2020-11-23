from flask import Flask,render_template

app = Flask("__main__")

@app.route("/")
@app.route("/home")
def home():
    return render_template("index.html",token="hello")


app.run(debug=True)