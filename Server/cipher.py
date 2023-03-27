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


