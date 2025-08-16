import re
import os
import random
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)


# client = MongoClient(
#     os.getenv("MONGO_LINK")
# )

client = MongoClient(
    "mongodb+srv://Mayur:1g9o9O6LpLGMla6o@cluster0.8idcssj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
db = client["mayur"]  # database
message_col = db["messages"]  # collection


@app.route("/api/add-message", methods=["POST"])
def add_message():
    try:
        data = request.get_json()
        message = data.get("message")
        if not message:
            return jsonify({"success": False, "message": "Message not given"})
        message_col.insert_one(
            {"message": message, "createdAt": datetime.utcnow()})

        return jsonify({"success": True, "message": "Message saved"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})


@app.route("/api/get-random-message")
def random_message():
    # docs = message_col.find()
    # message_list = [doc["message"] for doc in docs]

    try:
        docs = message_col.find()
        message_list = [doc["message"] for doc in docs]
        if not message_list:
            return jsonify({"success": False, "message": "No messages yet. Be the first person to create one!"})
        return jsonify({"success": True, "message": "Got random message", "randomMessage": random.choice(message_list)})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})


if __name__ == "__main__":
    app.run(debug=True)
