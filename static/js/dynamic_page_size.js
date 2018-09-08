var w = window.innerWidth;
if(w<1920){
    document.getElementById("html").style.zoom = 0.8;
}
if(w<1680){
    document.getElementById("html").style.zoom = 0.75;
}
if(w<1440){
    document.getElementById("html").style.zoom = 0.67;
}
if(w<1280){
    document.getElementById("html").style.zoom = 0.55;
}
function changeSize() {
    var w = window.innerWidth;
    if(w>=1920){
        document.getElementById("html").style.zoom = 1;
    }
    if(w<1920){
        document.getElementById("html").style.zoom = 0.8;
    }
    if(w<1680){
        document.getElementById("html").style.zoom = 0.75;
    }
    if(w<1440){
        document.getElementById("html").style.zoom = 0.67;
    }
    if(w<1280){
        document.getElementById("html").style.zoom = 0.55;
    }
    if(w<=800){
        document.getElementById("html").style.zoom = 0.33;
    }
}