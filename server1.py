import osc_server_jaws as osc
from twilio.rest import TwilioRestClient 
from autobahn.twisted.websocket import WebSocketServerProtocol, \
    WebSocketServerFactory
class MyServerProtocol(WebSocketServerProtocol):

    def onConnect(self, request):
        global x
        x = self
        print("Client connecting: {0}".format(request.peer))	

    def onOpen(self):
        global x
        x = self
        print("WebSocket connection open.")

    def onMessage(self, payload, isBinary):
        self.send_sms(payload)
        if isBinary:
            print("Binary message received: {0} bytes".format(len(payload)))
        else:
            print("Text message received: {0}".format(payload.decode('utf8')))

        # echo back message verbatim
	# count = 1
	# while 1==1:
	#     #str = ""+count	     
	#     self.sendMessage(str(count).encode('utf8'), isBinary)
	#     count = count + 1
	#     if count == 5:
	#     	break;	 

    def onClose(self, wasClean, code, reason):
        print("WebSocket connection closed: {0}".format(reason))
    def send_sms(self, text):
 
        # put your own credentials here 
        ACCOUNT_SID = "AC2c3676a11ab15b14427a526f805000ca" 
        AUTH_TOKEN = "4607b8f2cc2e593a4e8906619fc95a4a" 
         
        client = TwilioRestClient(ACCOUNT_SID, AUTH_TOKEN) 
         
        client.messages.create(
            to="+17163489390", 
            from_="+17169264060", 
            body=text, 
        )

class ThreadingExample(object):
    """ Threading example class

    The run() method will be started and it will run in the background
    until the application exits.
    """
 
    def __init__(self, interval=1):
        """ Constructor

        :type interval: int
        :param interval: Check interval, in seconds
        """
        self.interval = interval
        thread = threading.Thread(target=self.run, args=())
        thread.daemon = True                            # Daemonize thread
        thread.start()                                  # Start the execution
 
    def run(self):
        """ Method that runs forever """
        # Do something
        global x
        print('Doing something imporant in the background')
        while (x is None):
            time.sleep(1)
            print ("sleeping")
            print ("here")
        ACCOUNT_SID = "AC2c3676a11ab15b14427a526f805000ca" 
        AUTH_TOKEN = "4607b8f2cc2e593a4e8906619fc95a4a" 
         
        client = TwilioRestClient(ACCOUNT_SID, AUTH_TOKEN) 
        old_len = len(client.messages.list(to="+17169264060"))
        while (1):
            flag,new_len = self.newMsgCame(client,old_len)
            print "old_len,new_len,flag:",old_len,new_len,flag
            old_len = new_len

            if (flag):
                res= self.getMsg(client)
                print "msg text",res
                x.sendMessage(res.encode('utf8'), False)
            time.sleep(5)

        # while 1:
        #     self.listen_sms()

        #x.sendMessage(str(12).encode('utf8'), False)
        time.sleep(self.interval)
    def newMsgCame(self,client,old_len):
        new_len = len(client.messages.list(to="+17169264060"))
        if(new_len > old_len):
            return True,new_len
        return False,new_len

    def getMsg(self,client):
        
        messages = client.messages.list(to="+17169264060")
        print "messages length" ,len(messages)
        if (len(messages) != 0):
            return messages[0].body
        return ""

    def listen_sms(self):
        print "listening"



if __name__ == '__main__':

    import sys
    import time, threading
    from twisted.python import log
    from twisted.internet import reactor
    x = None
    example = ThreadingExample()
    log.startLogging(sys.stdout)
    factory = WebSocketServerFactory("ws://localhost:9001", debug=False)
    factory.protocol = MyServerProtocol
    # factory.setProtocolOptions(maxConnections=2)

    print "before listen"
    reactor.listenTCP(9001, factory)
    reactor.run()
    print "after run"
            

def onDisconnect(self):
    reactor.stop()

