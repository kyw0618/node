import os 
import sys
import shutil

def getName(name,age): print(name + ":"+ age)

filepath = 'TextUploads/'
fileName = sys.argv[1]
fileSensitivity = sys.argv[2]

orgPath = "pythonImg/"

orgfile = filepath + fileName
changefile = fileSensitivity + ''+fileName

# stream = os.popen('cp ' + orgfile + ' ' + changefile)
# output = stream.read()
# output

shutil.copy(orgPath, changefile)