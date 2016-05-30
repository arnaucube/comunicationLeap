var socket=io.connect();
function NewConnection(){
  socket.emit('newconnection',"newcon",function(data){
    //
  });
}
function RotationR2Server(obj){
  socket.emit('rotationR',obj,function(data){
    //
  });
}
function RotationL2Server(obj){
  socket.emit('rotationL',obj,function(data){
    //
  });
}
function ZoomIn2Server(obj){
  socket.emit('zoomIn',obj,function(data){
    //
  });
}
function ZoomOut2Server(obj){
  socket.emit('zoomOut',obj,function(data){
    //
  });
}
function AddCube2Server(obj){
  socket.emit('addCube',obj,function(data){
    //
  });
}

socket.on('numconnections',function(data){
    document.getElementById("idNumConnections").innerHTML=data.numconnections;
});
socket.on('rotationR',function(data){
    //mRotation(getObjByName(data));
    mRotationR(window[data.data]);
});
socket.on('rotationL',function(data){
    //mRotation(getObjByName(data));
    mRotationL(window[data.data]);
});
socket.on('zoomIn',function(data){
    //mRotation(getObjByName(data));
    mZoomIn();
});
socket.on('zoomOut',function(data){
    //mRotation(getObjByName(data));
    mZoomOut();
});
socket.on('addCube',function(data){
    //mRotation(getObjByName(data));
    mAddBus();
});
