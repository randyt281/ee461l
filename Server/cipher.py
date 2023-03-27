def encrypt(inputText, N, D):
    output = inputText[::-1]
    ascVal = convertASCII(output)
    if ascVal == None:
        return
    if (D == 1):
        out = shiftR(N, ascVal)
    elif (D == -1):
        out = shiftL(N, ascVal)
    else:
        print("invalid dir")
        return
    return out


def convertASCII(inputText):
    out = []
    for c in inputText:
        if ord(c) <= 33:
            print("invalid input")
            return None
        out.append(ord(c))
    return out


def shiftR(n, inputText):
    out = ""
    for i in inputText:
        if (i + n) >= 127:
            out += chr((i + n) % 127 + 34)
        else:
            out += chr(i + n)
    return out


def shiftL(n, inputText):
    out = ""
    for i in inputText:
        if (i - n) <= 33:
            out += chr(127 - (34 - (i - n)) % 127) # (i - n) new index, 34 - (i - n) = how many indices under 34
        else:
            out += chr(i - n)
    return out


def decrypt(inputText, N, D):
    output = inputText[::-1]
    ascVal = convertASCII(output)
    if(ascVal == None):
        return
    if (D == 1):
        out = shiftL(N, ascVal)
    elif (D == -1):
        out = shiftR(N, ascVal)
    else:
        print("invalid dir")
        return
    return out


def decryptDatabase():
    data = open("database.txt", "r")
    out = ""
    N = 3
    D = 1
    for line in data:
        line = line.rstrip("\n")
        login = line.split(" ")
        user = decrypt(login[0], N, D)
        password = decrypt(login[1], N, D)
        out = out + user + " " + password + "\n"
        #1:
        #asamant Temp123 exists
        #skharel Life15$ exists

        #2:
        #aissa has the wrong password (Light%^&)
        #bjha has the wrong password (%72Hello)
        #asament
        #skharel
        #Ally exists but not Ally!

        #3
        #Ally! does not meet the username requirements
    return out


