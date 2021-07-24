from types import ClassMethodDescriptorType
from cryptography.fernet import Fernet
from random import choice, randint, random
from os import getcwd

alphabet = "abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*"

class Keys:
    def __init__(self) -> None:
        self.filename = ""
        self.keys = ""

    def set_file(self, filename):
        self.filename = filename

    def generate_key(self, digits=randint(3, 6)):
        x = ""
        for i in range(0, digits):
            x += (choice(list(alphabet)).lower() if randint(0, 1) == 0 else choice(list(alphabet)).upper())
        self.keys = x.encode().decode()
        return x.encode()

    def save(self, filename=""):
        if filename == "":
            filename = self.filename

        if self.filename == "":
            return False
        
        try:
            splts = self.filename.split("/")
            if int(len(splts)) <= 1:
                self.filename = getcwd() + self.filename
            
            if self.keys == "":
                self.generate_key(digits=10)
            saver = open(self.filename, "w")
            saver.write(self.keys)
            saver.close()
        except (FileNotFoundError, IOError):
            return False

    def open(self, filename):
        if filename == "":
            filename = self.filename

        if self.filename == "":
            self.filename = filename

        try:
            openFile = open(self.filename if filename == "" else filename, "r")
            data = openFile.read()
            return data
        except (FileNotFoundError, IOError):
            return False

class Crypto:
    def __init__(self) -> None:
        self.keysFile = getcwd() + "/.keys"
        self.keyclass = Keys()
        self.keyclass.set_file(self.keysFile)
        self.keys = None
        self.fernet = None

    def generate(self):
        self.keys = self.keyclass.generate_key(digits=32)
        self.keyclass.save(self.keysFile)

    def open(self):
        self.keys = self.keyclass.open(filename=self.keysFile)
    
    def encrypt(self, text):
        if self.keys is None:
            self.generate()
        self.fernet = Fernet(key=self.keys)
        token = self.fernet.encrypt(text.encode())
        return token

    def decrypt(self, text):
        if self.keys is None:
            print ("[INFO]: Keys not found, access denied")
            return False
        self.fernet = Fernet(Keys=self.keys)
        token = self.fernet.decrypt(text.encode())
        return token
        
if __name__ == "__main__":
    crypto = Crypto()
    crypto.open()