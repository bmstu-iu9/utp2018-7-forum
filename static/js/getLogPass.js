function sendLogPas() {
    var log=document.getElementById('Log');
    var pass=document.getElementById('Pass');
    var myObj = JSON.parse("../../modules/db/users/users.json");
    var found = false;
    for(i=0; i<Object.keys(myObj.Users).length; i++){
        if(myObj.Users[i].login == log){
            found = true;
            if(myObj.Users[i].password == pass){
                alert("nice");
            } else {
                alert("wrong password");
            }
        }
    }
    if(!found){
        alert("wrong login");
    }
}