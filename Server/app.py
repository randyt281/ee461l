from flask import Flask, request
import cipher
from flask.json import jsonify
import db

from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, supports_credentials=True)

#HW5


@app.route('/join', methods=["POST"])
def joinProject():
    userid = request.json["userid"]
    pid = request.json["pid"]
    #check if user exists in project already
    db.addUsertoProject(pid, userid)
    return jsonify({"userid":userid, "pid": pid})
    

@app.route('/leave', methods=["POST"])
def leaveProject():
    userid = request.json["userid"]
    pid = request.json["pid"]
    #check if user exists in project already
    db.removeUserfromProject(pid, userid)
    return jsonify({"userid":userid, "pid": pid})
    

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



@app.route('/check-in', methods=['POST'])
def checkIn_hardware():
    checking= request.json["qty"]
    hw = request.json["hw"]
    
    if hw == 1:
        Availability = int(db.queryHWSet1Availability())
        Capacity = int(db.queryHWSet1Capacity())
    else:
        Availability = int(db.queryHWSet2Availability())
        Capacity = int(db.queryHWSet2Capacity())
    
    try:
        qty = int(checking)
        if qty < 0 or qty + Availability > Capacity:
            raise ValueError
        else:
            if hw == 1:
                db.updateHWSet1(qty + Availability)
            else:
                db.updateHWSet2(qty + Availability)
        return jsonify({"Capacity" : Capacity, "Availability" : Availability})
    except ValueError:
        return jsonify({"error": "invalid input"}), 409


@app.route('/check-out', methods=['POST'])
def checkOut_hardware():
    checking= request.json["qty"]
    hw = request.json["hw"]
    
    if hw == 1:
        Availability = int(db.queryHWSet1Availability())
        Capacity = int(db.queryHWSet1Capacity())
    else:
        Availability = int(db.queryHWSet2Availability())
        Capacity = int(db.queryHWSet2Capacity())
    
    try:
        qty = int(checking)
        if qty < 0 or Availability - qty < 0:
            raise ValueError
        else:
            if hw == 1:
                db.updateHWSet1(Availability - qty)
            else:
                db.updateHWSet2(Availability - qty)
        return jsonify({"Capacity" : Capacity, "Availability" : Availability})
    except ValueError:
        return jsonify({"error": "invalid input"}), 409
    
@app.route('/hardware', methods=["GET"])
def getHardwareSets():
    capacity1 = db.queryHWSet1Capacity()
    capacity2 = db.queryHWSet2Capacity()
    availability1 = db.queryHWSet1Availability()
    availability2 = db.queryHWSet2Availability()
    HWSet1 = {"Capacity": capacity1, "Availability": availability1}
    HWSet2 = {"Capacity":capacity2, "Availability": availability2}

    return jsonify({"HWSet1": HWSet1, "HWSet2": HWSet2})


@app.route('/create-project', methods=["POST"])
def createProject():
    projectId = request.json["projectId"]
    Name = request.json["Name"]
    Description = request.json["Description"]
    if db.projectExists(projectId):
        return jsonify({"error": "project already exists"}), 409
    db.addNewProject(Name, Description, projectId)
    return jsonify({"projectId": projectId})


@app.route('/get-list/<projectId>', methods=["GET"])
def getListOfUsers(projectId):
    listUsers = db.getUsers(projectId)
    res = ""
    
    for i in listUsers: 
        if (len(res) == 0):
            res = i
        else:
            res = res + ", " + i

    return jsonify({"Users": res})

@app.route('/projects', methods=["GET"])
def getProjects():
    listNames = db.getProjectNames()
    listID = db.getProjectIDs()
    res = []

    for i in range(len(listNames)):
        res.append({"Name": listNames[i], "ID": listID[i]})
    
    return jsonify({"data": res})


if __name__ =="__main__":
    app.run(debug=True)