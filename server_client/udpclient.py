from socket import * 
serverName = '114.203.226.167'
serverPort = 12000 
clientSocket = socket(AF_INET,
SOCK_DGRAM) 
m = input('input lowercase sentence')
clientSocket.sendto(m.encode(),(serverName, serverPort)) 
modifiedMessage, serverAddress = clientSocket.recvfrom(2048)
print (modifiedMessage.decode())
clientSocket.close()