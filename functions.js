var ABB_Web_Users;
var ABB_Unity_Users;
var ABB_Robotstudio_Users;
var ABB_Rooms;
var actualDraggingUnityUser;


    jQuery(function($)
    {
        var socket=io.connect();
        var $nickForm=$('#setNick');
        var $nickError=$('#nickError');
        var $nickBox=$('#nickname');
        var $users2=$('#users2');
        var $usersStations=$('#usersStations');
        var $usersUnity=$('#usersUnity');
        var $RSrooms=$('#RSrooms');
        var $messageForm=$('#send-message');
        var $messageBox=$('#message');
        var $chat=$('#chat');
            $nickForm.submit(function(e)
            {
            e.preventDefault();
            socket.emit('newuser',$nickBox.val(),function(data){
                if(data){
                $('#nickWrap').hide();
                $('#contentWrap').show();
                }else{
                    $nickError.html('That username is already taken:Try Again!');
                }
            });
            $nickBox.val('');
            });
            $messageForm.submit(function(e)
            {
                e.preventDefault();
                socket.emit('sendmessage',$messageBox.val());
                $messageBox.val('');
            });
            socket.on('newmessage',function(data){
                $chat.append('<b>'+data.nick+':</b>'+data.msg+"<br/>");
            });
            socket.on('usernames',function(data){
                ABB_Web_Users=data.ABB_Web_Users;
                var jsonStr = JSON.stringify(data);
                var html='';
                /*for (i=0;i<jsonStr.length;i++){
                    html+=jsonStr[i];
                }*/
                //html+=jsonStr[i];
                html="ABB_Web_Users: ";
                for(i=0; i<ABB_Web_Users.length; i++)
                {
                    html+="<div class='nom'>" + ABB_Web_Users[i] + "</div>";
                }

                $users2.html(html);
                console.log(html);
                UpdateAllInfo();
            });
            socket.on('stationnames',function(data){
                ABB_Robotstudio_Users=data.ABB_Robotstudio_Users;
                var jsonStr = JSON.stringify(data);
                var html='';
                /*for (i=0;i<jsonStr.length;i++){
                    html+=jsonStr[i]
                }*/
                //document.getElementById("usersStations").innerHTML = cars;
                html="ABB_Robotstudio_Users: ";
                for(i=0; i<ABB_Robotstudio_Users.length; i++)
                {
                    html+="<div class='nom'>" + ABB_Robotstudio_Users[i] + "</div>";
                }
                $usersStations.html(html);
                console.log(html);
                UpdateAllInfo();
            });
            socket.on('Unitynames',function(data){
                ABB_Unity_Users=data.ABB_Unity_Users;
                var jsonStr = JSON.stringify(data);
                var html='';
                /*for (i=0;i<jsonStr.length;i++){
                    html+=jsonStr[i]
                }*/
                //docuament.getElementById("usersStations").innerHTML = cars;
                html="ABB_Unity_Users: ";
                for(i=0; i<ABB_Unity_Users.length; i++)
                {
                    html+="<div id='"+ABB_Unity_Users[i]+"' class='nom' draggable='true' ondragstart='drag(event, this.id)'>" + ABB_Unity_Users[i] + "</div>";
                }
                $usersUnity.html(html);
                console.log(html);
                UpdateAllInfo();
            });
            socket.on('rooms',function(data){
                ABB_Rooms=data.ABB_Rooms;
                var jsonStr = JSON.stringify(data);
                var html='';
                /*for (i=0;i<jsonStr.length;i++){
                    html+=jsonStr[i]
                }*/
                html="ABB_Rooms: ";
                for(i=0; i<ABB_Rooms.length; i++)
                {
                    html+="<div class='nom'>" + ABB_Rooms[i] + "</div>";
                }
                //document.getElementById("usersStations").innerHTML = cars;
                $RSrooms.html(html);
                console.log(html);
                UpdateAllInfo();
            });
    });
    function NoWindowsApanyo(){
        //ABB_Unity_Users=["uu1"];
        ABB_Rooms=["room1", "room2"];
        ABB_Robotstudio_Users=["rb1", "rb2"];

        UpdateUnityUsersAvailable();
    }
    function GenerateRandomId()
    {
        idgenerated=Math.random();
        idgenerated=idgenerated*100;
        idgenerated=Math.round(idgenerated);
        idgenerated=idgenerated.toString();
        return(idgenerated);
    }
    function OnLoadHTML(){
        var socket=io.connect();
        idg=GenerateRandomId();
        socket.emit('newuser',idg,function(data){});
        UpdateUnityUsersAvailable();
    }
    function UpdateUnityUsersAvailable(){
        if(ABB_Unity_Users!=undefined)
        {
            html="ABB_Unity_Users: ";
            for(i=0; i<ABB_Unity_Users.length; i++)
            {
                html+="<div id='"+ABB_Unity_Users[i]+"' class='nom' draggable='true' ondragstart='drag(event, this.id)'>" + ABB_Unity_Users[i] + "</div>";
            }
            document.getElementById('usersUnity').innerHTML=html;
        }
    }
    function UpdateAllInfo(){

        //NoWindowsApanyo();

        document.getElementById("systeminfo").innerHTML="";
        saux="";
        if(ABB_Rooms!=undefined)
        {
            saux+="System info<br>";
            for(i=0; i<ABB_Rooms.length; i++)
            {
                saux+="<div id='"+ABB_Rooms[i]+"' class='Room' ondrop='drop(event, this.id)' ondragover='allowDrop(event)'>" + ABB_Rooms[i];
                if(ABB_Robotstudio_Users!=undefined)
                {
                    for(j=0; j<ABB_Robotstudio_Users.length; j++)
                    {
                        saux+="	<div class='Robotstudio_User'>" + ABB_Robotstudio_Users[j] + "</div>";
                    }
                }
    /*			if(ABB_Unity_Users!=undefined)
                {
                    for(j=0; j<ABB_Unity_Users.length; j++)
                    {
                        saux+="	<div class='Unity_User'>" + ABB_Unity_Users[j] + "</div>";
                    }
                }*/


                saux+="</div>";
            }
        }
        document.getElementById('systeminfo').innerHTML=saux;
    }


    function RemoveFromUnityUsersArray(unityusergiv){
        for(var i=0; i<ABB_Unity_Users.length; i++)
        {
            if(ABB_Unity_Users[i]==unityusergiv)
            {
                ABB_Unity_Users.splice(i, 1);
            }
        }
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev, idUnityUser) {
        ev.dataTransfer.setData("text", ev.target.id);
            actualDraggingUnityUser=idUnityUser;
    }

    function drop(ev, idRoom) {
        ev.preventDefault();
            cont="";
            cont+="<div id='"+ actualDraggingUnityUser +"' class='nom'>" + actualDraggingUnityUser + "</div>";
            document.getElementById(idRoom).innerHTML+=cont;
            RemoveFromUnityUsersArray(actualDraggingUnityUser);
            UpdateUnityUsersAvailable();
            //AQUÍ LA FUNCIÓ DE QUE UN UNITY ES CONECTA A UN ROOM:
            UnityToRoom(idRoom, actualDraggingUnityUser);
    }
    function UnityToRoom(room, unity){
        //funció de quan un unity es conecta a un room
        //aqí lu del socet emit cap al server avisant de que el unity està a la room
        //a la variable room i a la variable unity hi tens la info de quin unity es conecta a quin room
        alert("El user: " + unity + " es conecta a la room: " + room);
        //aqí pots posar la info de qin unityuser es conecta a qina room a una array o algu
    }
