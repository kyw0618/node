import os 
import sys

sec = sys.argv[1]
src = sys.argv[2]
path = sys.argv[3]

filename  = src+sec

stream = os.popen('cp ' + src + ' ' + path+filename)
output = stream.read()
output
