from fileinput import filename
import os 
import sys

def getName(name,age): print(name + ":"+ age)

filepath = "/root/Server/node/TextUploads/"
fileName = sys.argv[1]
fileSensitivity = sys.argv[2]

orgPath = "/root/Server/node/pythonImg/"

orgfile = filepath + fileName
changefile = orgPath + fileSensitivity + ''+fileName

stream = os.popen('cp ' + fileSensitivity + ' ' + filepath+fileName)
output = stream.read()
output


print(output)