from fileinput import filename
import os 
import sys

def getName(name,age): print(name + ":"+ age)

filepath = 'TextUploads/'
fileName = sys.argv[1]
fileSensitivity = sys.argv[2]

orgPath = "pythonImg/"

orgfile = filepath + fileName
changefile = orgPath + fileSensitivity + ''+fileName

stream = os.popen('cp ' + orgfile + ' ' + changefile)
output = stream.read()
output


print(stream)