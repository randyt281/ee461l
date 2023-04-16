def encrypt(inputText, n, d):
    #Validate input
    isError = False
    if n < 1:
        print("N should be greater than 1!")
        isError = True
    if d != 1 and d != -1:
        print("D should be -1 or 1!")
        isError = True
    for letter in inputText:
        if ord(letter) == 32 or ord(letter) == 33:
            print("Can't have \" \" or ! in input!")
            isError = True
    if isError:
        return
    encrypted_arr = reverse_string_to_list(inputText)
    for i in range(len(encrypted_arr)):
        #Shift
        new_letter_code = ord(encrypted_arr[i]) + n*d
        #Handle wraparound cases
        while new_letter_code < 34 or new_letter_code > 126:
            #If less than add 93
            if new_letter_code < 34:
                new_letter_code += 93
            #If greater than subtract 93
            if new_letter_code > 126:
                new_letter_code -= 93
        encrypted_arr[i] = chr(new_letter_code)
    encrypted = "".join(encrypted_arr)
    return encrypted


def decrypt(inputText, n, d):
    decrypted_arr = reverse_string_to_list(inputText)
    for i in range(len(decrypted_arr)):
        #Shift
        new_letter_code = ord(decrypted_arr[i]) - n*d
        #Handle wraparound cases
        while new_letter_code < 34 or new_letter_code > 126:
            #If less than add 93
            if new_letter_code < 34:
                new_letter_code += 93
            #If greater than subtract 93
            if new_letter_code > 126:
                new_letter_code -= 93
        decrypted_arr[i] = chr(new_letter_code)
    decrypted = "".join(decrypted_arr)
    return decrypted

def reverse_string_to_list(inputText):
    arr = [None] * len(inputText)
    j = 0
    for i in range(len(inputText)-1, -1, -1):
        arr[j] = inputText[i]
        j+=1
    return arr
