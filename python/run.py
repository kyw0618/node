import os 
import sys

filepath = '/root/Server/node/TextUploads/'
fileName = sys.argv[1]
fileSensitivity = sys.argv[2]

orgPath = "/root/Server/node/pythonImg/"

orgfile = filepath + fileName
changefile = fileSensitivity +    fileName

stream = os.popen('cp ' + orgfile + ' ' + orgPath + changefile)
output = stream.read()
output

# dir = './TextUploads/'
# files = os.listdir(dir)

# for file in files : print(file)

print(stream)
