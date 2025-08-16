import re
import os
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


if __name__ == "__main__":
    app.run(debug=True)
