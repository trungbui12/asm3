from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
CORS(app)


client = MongoClient("mongodb://127.0.0.1:27017/")
db = client["aquarium_store"]


fish_collection = db["fish"]
accessory_collection = db["accessories"]


def serialize_doc(doc):
    doc["_id"] = str(doc["_id"])
    return doc



@app.route("/api/fish", methods=["GET"])
def get_fish():
    data = [serialize_doc(f) for f in fish_collection.find()]
    return jsonify(data)

@app.route("/api/fish", methods=["POST"])
def add_fish():
    data = request.get_json()
    fish_collection.insert_one(data)
    return jsonify({"message": "Fish added!"})

@app.route("/api/fish/<id>", methods=["PUT"])
def update_fish(id):
    data = request.get_json()
    fish_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
    return jsonify({"message": "Fish updated!"})

@app.route("/api/fish/<id>", methods=["DELETE"])
def delete_fish(id):
    fish_collection.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "Fish deleted!"})


@app.route("/api/accessories", methods=["GET"])
def get_accessories():
    data = [serialize_doc(a) for a in accessory_collection.find()]
    return jsonify(data)

@app.route("/api/accessories", methods=["POST"])
def add_accessory():
    data = request.get_json()
    accessory_collection.insert_one(data)
    return jsonify({"message": "Accessory added!"})

@app.route("/api/accessories/<id>", methods=["PUT"])
def update_accessory(id):
    data = request.get_json()
    accessory_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
    return jsonify({"message": "Accessory updated!"})

@app.route("/api/accessories/<id>", methods=["DELETE"])
def delete_accessory(id):
    accessory_collection.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "Accessory deleted!"})


@app.route("/")
def home():
    return jsonify({"message": "✅ Flask server is running with MongoDB connected!"})


if __name__ == "__main__":
    app.run(debug=True)
