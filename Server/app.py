from flask import Flask, request
import cipher
from flask.json import jsonify
import db

from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, supports_credentials=True)


@app.route('/check-in/<projectId>/<qty>')
def checkIn_hardware(projectId, qty):
    return(qty + " hardware checked in")

@app.route('/check-out/<projectId>/<qty>')
def checkOut_hardware(projectId, qty):
    return(qty + " hardware checked out")

@app.route('/join/<projectId>')
def joinProject(projectId):
    return("joined project " + projectId)

@app.route('/leave/<projectId>')
def leaveProject(projectId):
    return("left project " + projectId)


@app.route('/register', methods=['POST'])
def register_user():
    user = request.json["user"]
    password = request.json["password"]
    if db.userExists(user):
        #throw error
        return jsonify({"error": "User already exists"}), 409
    else:
        db.registerNewUser(user, password)
        return jsonify({"user": user})


@app.route('/login', methods=["POST"])
def login_user():
    user = request.json["user"]
    password = request.json["password"]
    if not db.userExists(user):
        return jsonify({"error": "User doesn't exists"}), 409
    if not db.checkPassword(user, password):
        return jsonify({"error": "Username or password is incorrect"}), 409
    return jsonify({"user": user})


if __name__ =="__main__":
    app.run(debug=True)