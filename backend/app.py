from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/api/message")
def data():
    return jsonify({"message": "HEY THIS IS THE FIRST CLASS"})


@app.route("/api/age")
def getAge():
    return jsonify({"age": 20})


@app.route("/api/user")
def user_info():
    user_data = {
        "name": "Mayur",
        "age": 50,
        "skills": ["Python", "Flask", "React"],
        "profile": {"github": "", "location": "USA"},
    }
    return jsonify(user_data)


if __name__ == "__main__":
    app.run(debug=True)
