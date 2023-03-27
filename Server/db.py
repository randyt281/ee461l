import pymongo
import cipher

#client = pymongo.MongoClient("mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")\

def registerNewUser(userid, password):
    client = pymongo.MongoClient("mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")
    db = client['Users']
    collection = db[userid]
    user = {"userid": userid, "password": cipher.encrypt(password, 3, 1)}
    collection.insert_one(user).inserted_id
    client.close()
    return

def queryUser(userid):
    client = pymongo.MongoClient("mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")
    db = client['Users']
    client.close()
    return db[userid]

def userExists(userid):
    client = pymongo.MongoClient("mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")
    db = client['Users']
    userList = db.list_collection_names()
    if(userid in userList):
        client.close()
        return True
    client.close()
    return False

def checkPassword(userid, password):
    client = pymongo.MongoClient("mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")
    db = client['Users']
    collection = db[userid]
    document = collection.find_one()
    if cipher.encrypt(password, 3, 1) == document["password"]:
        client.close()
        return True
    client.close()
    return False

def queryProjects():
    client = pymongo.MongoClient("mongodb+srv://randyt281:1234@cluster0.jddnco7.mongodb.net/?retryWrites=true&w=majority")
    db = client['Projects']
    projectList = db.list_collections
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

    