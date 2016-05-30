var express=require('express'),
app=express(),
server=require('http').createServer(app),
io = require('socket.io',{transports: ['websocket']}).listen(server);
server.listen(3000);
var shortId = require('shortid');

//ip
var os = require( 'os' );
var networkInterfaces = os.networkInterfaces( );


//poder accedir al server i interactuar
app.use(express.static(__dirname + '/clientLeap'));

var numconnections=0;

io.on('connection', function (socket) {
	socket.on('newconnection', function (data,callback){
		numconnections++;
		console.log("numconnections: " + numconnections);
		io.sockets.emit('numconnections',{numconnections}); //aqí envia la data
	});
	socket.on('rotationR', function (data,callback){
		//console.log(data);
			io.sockets.emit('rotationR',{data}); //aqí envia la data
	});
	socket.on('rotationL', function (data,callback){
		//console.log(data);
			io.sockets.emit('rotationL',{data}); //aqí envia la data
	});

	socket.on('zoomIn', function (data,callback){
		console.log('zoomIn');
			io.sockets.emit('zoomIn',{data}); //aqí envia la data
	});
	socket.on('zoomOut', function (data,callback){
		console.log('zoomOut');
			io.sockets.emit('zoomOut',{data}); //aqí envia la data
	});
	socket.on('addCube', function (data,callback){
		console.log("addCube" + data);
			io.sockets.emit('addCube',{data}); //aqí envia la data
	});

});

console.log("------- server is running at "+networkInterfaces.wlan0[0].address+"-------");
