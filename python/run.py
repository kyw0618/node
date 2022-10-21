import os 
import sys

def getName(name,age): print(name + ":"+ age)

filepath = 'TextUploads/'
fileName = sys.argv[1]
fileSensitivity = sys.argv[2]

orgPath = "./pythonImg/"

orgfile = filepath + fileName
changefile = fileSensitivity + ' ' +fileName

# # stream = os.popen('cp ' + orgfile + ' ' + changefile)
# # output = stream.read()
# # output

# dir = './TextUploads/'
# files = os.listdir(dir)

# for file in files : print(file)

print(changefile)
