import re
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)
CORS(app)


client = MongoClient(
    "mongodb+srv://Mayur:1g9o9O6LpLGMla6o@cluster0.8idcssj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
db = client["mayur"]  # database
names_col = db["names"]  # collection


@app.route("/api/add-name", methods=["POST"])
def add_name():
    try:
        data = request.get_json()
        name = data.get("name")
        if not name:
            return jsonify({"success": False, "error": "No name provided"}), 400
        names_col.insert_one({"name": name, "createdAt": datetime.utcnow()})
        return jsonify({"success": True, "message": "Name saved"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/names", methods=["GET"])
def list_names():
    docs = list(names_col.find({}, {"_id": 0}).sort("createdAt", -1))
    return jsonify({"success": True, "data": docs})


@app.route("/api/delete-name", methods=["POST"])
def delete_name():
    try:
        data = request.get_json()
        name = data.get("name")
        if not name:
            return jsonify({"success": False, "error": "No name provided"}), 400
        names_col.delete_one({"name": name})
        return jsonify({"success": True, "message": "Name removed"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/search-name", methods=["POST"])
def search_name():
    try:
        data = request.get_json(force=True)
        name = data.get("name")
        doc = names_col.find_one({"name": {"$regex": f"^{re.escape(name)}$", "$options": "i"}},
                                 {"_id": 0})
        if not doc:
            return jsonify({"success": False, "message": "Name not found"})
        return jsonify({"success": True, "message": "Name found"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
