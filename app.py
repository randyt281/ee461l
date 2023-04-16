from flask import Flask, request
from flask.json import jsonify
import db

from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route('/register', methods=['POST'])
def register_user():
    user = request.json["user"]
    password = request.json["password"]
    ret = db.add_user(user, password)
    if ret == -2:
        return jsonify({"error": "User already exists"}), 409
    elif ret == -1:
        return jsonify({"error": "An error occurred"}), 409
    else:
        return jsonify({"user": user})

@app.route('/login', methods=["POST"])
def login_user():
    user = request.json["user"]
    password = request.json["password"]
    ret = db.check_password(user, password)
    if ret == -1:
        return jsonify({"error": "User doesn't exist"}), 409
    elif ret == -2:
        return jsonify({"error": "Invalid password"}), 409
    else:
        return jsonify({"user": user})

@app.route('/createproject', methods=['POST'])
def create_project():
    name = request.json["name"]
    description = request.json["description"]
    project_id = int(request.json["projectId"])
    user_id = request.json["userId"]
    ret = db.add_project(name, project_id, description, user_id)
    if ret == -4:
        return jsonify({"error": "User already in project"}), 409
    if ret == -3:
        return jsonify({"error": "User not found"}), 409
    elif ret == -2:
        return jsonify({"error": "Project already exists"}), 409
    elif ret == -1:
        return jsonify({"error": "Error occurred"}), 409
    else:
        return jsonify({"project_id": project_id, "user_id": user_id})

@app.route('/getprojectlist/<user_id>')
def get_project_list(user_id):
    list_of_projects = db.get_list_of_projects_for_user(user_id)
    return jsonify({"project_list": list_of_projects})

@app.route('/checkin', methods=["POST"])
def check_in():
    project_id = int(request.json["projectId"])
    hw1_amount = int(request.json["hw1"])
    hw2_amount = int(request.json["hw2"])
    ret = db.check_in_hardware(project_id, hw1_amount, hw2_amount)
    print(ret)
    if ret == -1:
        return jsonify({"error": "Attempted to check in invalid amount"}), 409
    elif ret == 0:
        return jsonify({"hw1_amount": hw1_amount, "hw2_amount": hw2_amount})

@app.route('/checkout', methods=["POST"])
def check_out():
    project_id = int(request.json["projectId"])
    hw1_amount = int(request.json["hw1"])
    hw2_amount = int(request.json["hw2"])
    ret = db.check_out_hardware(project_id, hw1_amount, hw2_amount)
    if ret == -1:
        return jsonify({"error": "Attempted to check out invalid amount"}), 409
    elif ret == 0:
        return jsonify({"hw1_amount": hw1_amount, "hw2_amount": hw2_amount})

@app.route('/leave', methods=['POST'])
def leave_project():
    project_id = int(request.json['projectId'])
    user_id = request.json['userId']
    db.leave_project(user_id, project_id)
    return jsonify({"user_id": user_id, "project_id": project_id})

@app.route('/join', methods=['POST'])
def join():
    project_id = int(request.json['projectId'])
    user_id = request.json['userId']
    ret = db.join_project(user_id, project_id)
    if ret == -1:
        return jsonify({"error": "Project does not exist"}), 409
    elif ret == 0:
        return jsonify({"user_id": user_id, "project_id": project_id})