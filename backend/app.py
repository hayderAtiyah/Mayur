import os
import random
from datetime import datetime

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
from bson.objectid import ObjectId

load_dotenv()

app = Flask(__name__)
CORS(app)

# ---- Mongo connect (fail fast + ping) ----
MONGO_LINK = os.getenv("MONGO_LINK")
if not MONGO_LINK:
    raise RuntimeError("Missing MONGO_LINK in environment (.env)")

client = MongoClient(MONGO_LINK, serverSelectionTimeoutMS=5000)
try:
    client.admin.command("ping")
    print("MongoDB connected")
except ServerSelectionTimeoutError as e:
    raise RuntimeError(f"Cannot connect to MongoDB: {e}")

db = client["mayur"]
message_col = db["messages"]


@app.route("/api/add-message", methods=["POST"])
def add_message():
    try:
        data = request.get_json(force=True)
        message = (data.get("message") or "").strip()
        if not message:
            return jsonify({"success": False, "message": "Message not given"})

        message_col.insert_one({"message": message, "createdAt": datetime.utcnow()})
        return jsonify({"success": True, "message": "Message saved"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/get-random-message")
def random_message():
    try:
        total = message_col.count_documents({})
        if total == 0:
            return jsonify(
                {
                    "success": False,
                    "message": "No messages yet. Be the first person to create one!",
                }
            )

        # pick one at random without loading all docs
        skip = random.randrange(total)
        doc = list(message_col.find().skip(skip).limit(1))[0]
        return jsonify(
            {
                "success": True,
                "message": "Got random message",
                "randomMessage": doc["message"],
            }
        )
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
