from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route('/user/<username>')
def show_user_profile(username):
    list = [
        {'param': 'foo', 'val': 2},
        {'param': 'bar', 'val': 10}
    ]
    return jsonify(result=list)

if __name__ == "__main__":
    app.run()