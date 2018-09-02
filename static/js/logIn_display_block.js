if (document.cookie.includes('session_id')) {
	document.getElementById('logedIn').style.display = "block";
}
var log = document.cookie.split(';')[1].split('=')[1];
document.getElementById('logInText').innerHTML = log;