from flask import Flask,render_template

app = Flask("__main__")

@app.route("/")
@app.route("/home")
def home():
    return {
        "name":"demo"
    }

if __name__ == "__main__":
    app.run(debug=True)