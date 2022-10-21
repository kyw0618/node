from fileinput import filename
import os 
import sys
# sec = sys.argv[1]
# src = sys.argv[2]
# path = sys.argv[3]

# filename  = src+sec

# stream = os.popen('cp' + src + '1649204670366_Screenshot_20220302-054301.png' + path+filename)
# output = stream.read()
# output

def getName(name,age): print(name + ":"+ age)

filepath = sys.argv[1]
fileName = sys.argv[2]
fileSensitivity = sys.argv[3]

orgPath = "/root/Server/node/pythonImg/"

orgfile = filepath + fileName
changefile = orgPath + fileSensitivity + fileName


print(orgfile)