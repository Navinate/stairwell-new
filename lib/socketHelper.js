function connectToWebSocket() {
	//return io("ws://127.0.0.1:3000"); //LOCAL TESTING
	return io(); //LIVE SERVER
}