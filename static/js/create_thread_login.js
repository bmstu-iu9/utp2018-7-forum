var a = document.cookie.split(';');
for(var i=0; i<a.length; i++){
	if(a[i].indexOf("login")>-1)
		b=a[i];
}
var log = b.split('=')[1];
document.getElementById('author').value = log;