from flask import Flask, jsonify, request
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
        "skills": ["Python", "Flask", "React", "JS"],
        "profile": {"github": "4wqrs12", "location": "USA"},
    }
    return jsonify(user_data)


@app.route("/api/add-name", methods=["POST"])
def add_name():
    data = request.get_json()
    name = data.get("name")

    with open("names.txt", "a") as file:
        file.write(name)


@app.route("/api/books")
def book_info():
    book1 = {"title": "title1", "author": "author1", "year": 1, "rating": 1}

    book2 = {"title": "title2", "author": "author2", "year": 2, "rating": 2}

    book3 = {"title": "title3", "author": "author3", "year": 3, "rating": 3}

    book4 = {"title": "title4", "author": "author4", "year": 4, "rating": 4}

    book5 = {"title": "title5", "author": "author5", "year": 5, "rating": 5}

    return jsonify([book1, book2, book3, book4, book5])


if __name__ == "__main__":
    app.run(debug=True)
