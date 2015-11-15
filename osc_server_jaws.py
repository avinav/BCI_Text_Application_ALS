from liblo import *
import sys
import datetime
import time
import numpy as np
import pickle
server_ = None
class MuseServer(ServerThread):
    #listen for messages on port 5001
    def __init__(self):
        ServerThread.__init__(self, 5001)

    @make_method('/muse/elements/jaw_clench', 'i')
    def jaws_callback(self, path, args):
        global server_
        jaw = args
	if( jaw[0] == 1):
            print "clenched"
   	    if server_ is not None:
                res = "true"
	        server_.sendMessage(res.encode('utf8'), False) 

def init_test(x):
    global server_
    server_ = x
    server = MuseServer()
    server.start()    
    while 1:
	time.sleep(1)

    
    
'''
try:
	init_test()
        
except ServerError, err:
        print "INSIDE EXCCEPTIPN"
        print str(err)
        sys.exit()
'''


#if __name__ == "__main__":
#    while 1:
#        time.sleep(1)
