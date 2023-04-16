from pymongo import MongoClient
import cipher

def add_user(user_id, password):
    #Client
    client = MongoClient("mongodb+srv://rmahendra:MfG0vk84Q0MBAGXl@cluster0.wdl2udp.mongodb.net/?retryWrites=true&w=majority")
    #If user already exists return
    db = client.UserDB
    user_collection = db.Users
    query = user_collection.find_one({"username":user_id})
    if query != None:
        client.close()
        return -2
    #Add user
    else:
        document = {"username": user_id,
                    "password": cipher.encrypt(password, 3, 1),
                    "projects": []}
        try:
            user_collection.insert_one(document).inserted_id
            client.close()
            return 0
        except:
            client.close()
            return -1


def add_project(name, project_id, description, user_id):
    #Client
    client = MongoClient("mongodb+srv://rmahendra:MfG0vk84Q0MBAGXl@cluster0.wdl2udp.mongodb.net/?retryWrites=true&w=majority")
    #If project already exists return
    db = client.ProjectDB
    project_collection = db.Projects
    query = project_collection.find_one({"project_id":project_id})
    if query != None:
        client.close()
        return -2
    #If no user return
    user_db = client.UserDB
    user_collection = user_db.Users
    query = user_collection.find_one({"username":user_id})
    if query == None:
        client.close()
        return -3
    #If user already in project return
    if project_id in query['projects']:
        client.close()
        return -4
    #Add project and add it to user
    else:
        document = {"project_id": project_id,
                    "name": name,
                    "description": description,
                    "users": [user_id],
                    "hw1": 0,
                    "hw2": 0}
        project_db = client.ProjectDB
        project_collection = project_db.Projects
        try:
            project_collection.insert_one(document).inserted_id
            user_collection.update_one({"username": user_id}, {"$push": {"projects": project_id}})
            client.close()
            return 0
        except:
            client.close()
            return -1


def add_user_to_project(user_id, project_id):
    #Client
    client = MongoClient("mongodb+srv://rmahendra:MfG0vk84Q0MBAGXl@cluster0.wdl2udp.mongodb.net/?retryWrites=true&w=majority")
    user_db = client.UserDB
    project_db = client.ProjectDB
    user_collection = user_db.Users
    project_collection = project_db.Projects
    #If user doesn't exist or project doesn't exist or user already in project return
    db = client.UserDB
    user_collection = db.Users
    query = user_collection.find_one({"username":user_id})
    if query == None:
        client.close()
        return -1
    db = client.ProjectDB
    project_collection = db.Projects
    query = project_collection.find_one({"project_id":project_id})
    if query == None:
        client.close()
        return -1
    if user_id in query['users']:
        client.close()
        return -1
    #Add user to project
    user_collection.update_one({"username": user_id}, {"$push": {"projects": project_id}})
    project_collection.update_one({"project_id": project_id}, {"$push": {"users": user_id}})
    client.close()
    return 0

def check_in_hardware(project_id, hw1_amount, hw2_amount):
    #Client
    client = MongoClient("mongodb+srv://rmahendra:MfG0vk84Q0MBAGXl@cluster0.wdl2udp.mongodb.net/?retryWrites=true&w=majority")
    project_db = client.ProjectDB
    project_collection = project_db.Projects
    hw_db = client.HardwareSetDB
    hw1_collection = hw_db.HWSet1
    hw2_collection = hw_db.HWSet2
    project_document = project_collection.find_one({"project_id":project_id})
    #If project doesnt exist return
    if project_document == None:
        client.close()
        return -1
    #If check in more than have return
    if project_document['hw1'] < hw1_amount or project_document['hw2'] < hw2_amount:
        client.close()
        return -1
    #Update project hardware and hardware sets
    project_collection.update_one({"project_id": project_id}, {"$inc" : {"hw1": -hw1_amount}})
    project_collection.update_one({"project_id": project_id}, {"$inc" : {"hw2": -hw2_amount}})
    hw1_collection.update_one({"name":"HWSet1"}, {"$inc": {"availability" : hw1_amount}})
    hw2_collection.update_one({"name":"HWSet2"}, {"$inc": {"availability" : hw2_amount}})
    client.close()
    return 0

def check_out_hardware(project_id, hw1_amount, hw2_amount):
    #Client
    client = MongoClient("mongodb+srv://rmahendra:MfG0vk84Q0MBAGXl@cluster0.wdl2udp.mongodb.net/?retryWrites=true&w=majority")
    project_db = client.ProjectDB
    project_collection = project_db.Projects
    hw_db = client.HardwareSetDB
    hw1_collection = hw_db.HWSet1
    hw2_collection = hw_db.HWSet2
    project_document = project_collection.find_one({"project_id":project_id})
    #If project doesn't exist return
    if project_document == None:
        client.close()
        return -1
    hw1_document = hw1_collection.find_one({"name":"HWSet1"})
    hw2_document = hw2_collection.find_one({"name":"HWSet2"})
    #If check out more than available return
    if hw1_document['availability'] < hw1_amount or hw2_document['availability'] < hw2_amount:
        client.close()
        return -1
    #Update project and hardware sets
    project_collection.update_one({"project_id": project_id}, {"$inc" : {"hw1": hw1_amount}})
    project_collection.update_one({"project_id": project_id}, {"$inc" : {"hw2": hw2_amount}})
    hw1_collection.update_one({"name":"HWSet1"}, {"$inc": {"availability" : -hw1_amount}})
    hw2_collection.update_one({"name":"HWSet2"}, {"$inc": {"availability" : -hw2_amount}})
    client.close()
    return 0

def check_password(user_id, password):
    #Encrypt password to check
    encrypted = cipher.encrypt(password, 3, 1)
    #Client
    client = MongoClient("mongodb+srv://rmahendra:MfG0vk84Q0MBAGXl@cluster0.wdl2udp.mongodb.net/?retryWrites=true&w=majority")
    db = client.UserDB
    user_collection = db.Users
    user_document = user_collection.find_one({"username":user_id})
    #User doesnt exist
    if user_document == None:
        client.close()
        return -1
    #Invalid password
    if user_document['password'] != encrypted:
        client.close()
        return -2
    return 0

def get_list_of_projects_for_user(user_id):
    #Client
    client = MongoClient("mongodb+srv://rmahendra:MfG0vk84Q0MBAGXl@cluster0.wdl2udp.mongodb.net/?retryWrites=true&w=majority")
    user_db = client.UserDB
    user_collection = user_db.Users
    query = user_collection.find_one({"username":user_id})
    #Get project list
    project_list = query['projects']
    project_db = client.ProjectDB
    project_collection = project_db.Projects
    hw_db = client.HardwareSetDB
    hw1_collection = hw_db.HWSet1
    hw2_collection = hw_db.HWSet2
    hw1_document = hw1_collection.find_one({"name":"HWSet1"})
    hw2_document = hw2_collection.find_one({"name":"HWSet2"})
    hw1_availability = hw1_document['availability']
    hw2_availability = hw2_document['availability']
    return_project_list = []
    #Get project info for project list
    for project in project_list: 
        query = project_collection.find_one({"project_id":project})
        project_info = [project, query['name'], query['users'], query['hw1'], query['hw2'], hw1_availability, hw2_availability, user_id]
        return_project_list.append(project_info)
    return return_project_list

def leave_project(user_id, project_id):
    #Client
    client = MongoClient("mongodb+srv://rmahendra:MfG0vk84Q0MBAGXl@cluster0.wdl2udp.mongodb.net/?retryWrites=true&w=majority")
    #Remove project from user
    user_db = client.UserDB
    user_collection = user_db.Users
    query = user_collection.find_one({"username":user_id})
    project_list = query['projects']
    project_list.remove(project_id)
    user_collection.update_one({"username":user_id}, {"$set": {"projects":project_list}})
    #Remove user from project
    project_db = client.ProjectDB
    project_collection = project_db.Projects
    query = project_collection.find_one({"project_id":project_id})
    user_list = query['users']
    user_list.remove(user_id)
    project_collection.update_one({"project_id":project_id}, {"$set": {"users":user_list}})

def join_project(user_id, project_id):
    #Client
    client = MongoClient("mongodb+srv://rmahendra:MfG0vk84Q0MBAGXl@cluster0.wdl2udp.mongodb.net/?retryWrites=true&w=majority")
    project_db = client.ProjectDB
    project_collection = project_db.Projects
    query = project_collection.find_one({"project_id":project_id})
    #If project doesnt exist return
    if query == None:
        client.close()
        return -1
    #Add user to project
    user_list = query['users']
    user_list.append(user_id)
    project_collection.update_one({"project_id":project_id}, {"$set": {"users":user_list}})
    #Add project to user
    user_db = client.UserDB
    user_collection = user_db.Users
    query = user_collection.find_one({"username":user_id})
    project_list = query['projects']
    project_list.append(project_id)
    user_collection.update_one({"username":user_id}, {"$set": {"projects":project_list}})
    return 0