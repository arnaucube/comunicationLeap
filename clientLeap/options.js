function OnBtnClick(idbtn){
  actObj=idbtn.replace("btn", "");
  document.getElementById('btnSelected').innerHTML=actObj;
}


function msg(text){
  document.getElementById("msg").innerHTML=text;
}

function OnLoadIndex(){
  NewConnection();
}
