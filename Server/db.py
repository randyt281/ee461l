import pymongo
import cipher

#client = pymongo.MongoClient("mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")\

def registerNewUser(userid, password):
    client = pymongo.MongoClient("mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")
    db = client['Users']
    collection = db['Users']
    
    user = {"userid": userid, "password": cipher.encrypt(password, 3, 1)}
    collection.insert_one(user).inserted_id
    client.close()
    return


def userExists(userid):
    client = pymongo.MongoClient(
        "mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")
    db = client['Users']
    collection = db['Users']
    query = {"userid": userid}
    document = collection.find_one(query)
    if(document == None):
        client.close()
        return False
    client.close()
    return True


def checkPassword(userid, password):
    client = pymongo.MongoClient(
        "mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")
    db = client['Users']
    collection = db['Users']

    query = {"userid": userid}
    document = collection.find_one(query)

    if cipher.encrypt(password, 3, 1) == document['password']:
        client.close()
        return True
    client.close()
    return False


def queryProjects():
    client = pymongo.MongoClient("mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")
    db = client['Projects']
    projectList = db.list_collection_names
    client.close()
    return projectList
    
def queryHWSet1Availability():
    client = pymongo.MongoClient("mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")
    db = client['HardwareSet']
    collection = db['HWSet1']
    document = collection.find_one()
    client.close()
    return document["Availability"]

def queryHWSet2Availability():
    client = pymongo.MongoClient("mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")
    db = client['HardwareSet']
    collection = db['HWSet2']
    document = collection.find_one()
    client.close()
    return document["Availability"]

def queryHWSet1Capacity():
    client = pymongo.MongoClient("mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")
    db = client['HardwareSet']
    collection = db['HWSet1']
    document = collection.find_one()
    client.close()
    return document["Capacity"]

def queryHWSet2Capacity():
    client = pymongo.MongoClient("mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")
    db = client['HardwareSet']
    collection = db['HWSet2']
    document = collection.find_one()
    client.close()
    return document["Capacity"]


def updateHWSet1(Availability):
    client = pymongo.MongoClient("mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")
    db = client['HardwareSet']
    collection = db['HWSet1']
    newVal = {"$set" : {"Availability" : Availability}}
    document = collection.find_one()
    collection.update_one(document, newVal)
    client.close()
    return 

def updateHWSet2(Availability):
    client = pymongo.MongoClient("mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")
    db = client['HardwareSet']
    collection = db['HWSet2']
    newVal = {"$set" : {"Availability" : Availability}}
    document = collection.find_one()
    collection.update_one(document, newVal)
    client.close()
    return 
    
def addUsertoProject(projectId, userid):
    client = pymongo.MongoClient("mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")
    db = client['Projects']
    collection = db['Projects']
    query = {"ID": projectId}
    newVal = {"$push" : {"Users" : userid}}
    collection.update_one(query, newVal)
    return

def removeUserfromProject(projectId, userid):
    client = pymongo.MongoClient("mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")
    db = client['Projects']
    collection = db['Projects']
    query = {"ID": projectId}
    newVal = {"$pull" : {"Users" : userid}}
    collection.update_one(query, newVal)
    return
    
def addNewProject(projectName, description, projectId):
    client = pymongo.MongoClient("mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")
    db = client['Projects']
    collection = db['Projects']
    project = {"Description": description, "ID": projectId, "Name": projectName, "Users":[]}
    collection.insert_one(project)
    client.close()
    return

def projectExists(projectId):
    client = pymongo.MongoClient("mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")
    db = client['Projects']
    collection = db['Projects']
    query = {"ID": projectId}
    document = collection.find_one(query)
    if document == None:
        client.close()
        return True
    client.close()
    return False


def userInProject(projectId, userid):
    client = pymongo.MongoClient("mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")
    db = client['Projects']
    collection = db['Projects']
    query = {"ID": projectId}
    document = collection.find_one(query)

    if document[userid] == None:
        client.close()
        return False
    client.close()
    return True

def getUsers(projectId):
    client = pymongo.MongoClient("mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")
    db = client['Projects']
    collection = db['Projects']
    query = {"ID" : projectId}
    document = collection.find_one(query)
    ret = document["Users"]
    client.close()
    return ret

def getProjectNames():
    client = pymongo.MongoClient("mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")
    db = client['Projects']
    collection = db['Projects']
    res = []
    documents = collection.find()
    for i in documents:
        res.append(i["Name"])
    client.close()
    return res


    