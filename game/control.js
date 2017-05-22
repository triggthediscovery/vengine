var LMouse=false, RMouse=false, LMousep=false, RMousep=false;
var mouse_x=0, mouse_y=0, mouse_xp=0, mouse_yp=0;
var scrollx=0, scrolly=0.5, cursor_x=4000, cursor_y=150;

var Keys = new Array(100);
for (var i = 0; i < Keys.length; i++) Keys[i] = false;

var Keysp = new Array(100);
for (var i = 0; i < Keysp.length; i++) Keysp[i] = false;

var move = false;
var anim = true;
/*
LMouse - edit
AKey - change edit mode
EKey - add point
RKey - change parent

CKey - copy
VKey - paste
*/

var pointSel = -1;
var boneSel = -1;
var polySel = -1;
var selected = false;
var colBuf = "#000000";
var play = false;

var scale = 1;

function KeyDown(event) {
    if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }
    
    var Pressedkey = event.keyCode;

    Keys[Pressedkey] = true;
}
function KeyUp(event) {
    var Pressedkey = event.keyCode;

    Keys[Pressedkey] = false;
}
function KeyPrev() {
    for (var i = 0; i < Keysp.length; i++) Keysp[i] = Keys[i];
}
function MouseMove(event) {
    mouse_x = event.clientX - 10;
    mouse_y = event.clientY - 10;
}
function MouseDown(event) {
    if (event.button == 0) {
        LMouse = true;
    }
    if (event.button == 2) {
        RMouse = true;
    }
}
function MouseUp(event) {
    if (event.button == 0) {
        LMouse = false;
    }
    if (event.button == 2) {
        RMouse = false;
    }
}
function MousePrev() {
    RMousep = RMouse;
    LMousep = LMouse;
    mouse_xp = mouse_x;
    mouse_yp = mouse_y;
}
function MouseWheelHandler(event) {
    
    if (pause==true) {return;}
    
    var olzoom = zoom;
    
    var dats=event.wheelDelta;
    
    dats=dats*zoom*2;

    zoom += (dats) / 2000;

    var fixx, fixy, ch;

    fixx = ((mouse_x + scrollx) / olzoom);
    fixy = ((mouse_y + scrolly) / olzoom);
    ch = Math.abs((dats) / 2000);

    if (event.wheelDelta > 0) {
        scrollx += fixx * ch;
    } else {
        scrollx -= fixx * ch;
    }
    if (event.wheelDelta > 0) {
        scrolly += fixy * ch;
    } else {
        scrolly -= fixy * ch;
    }

    return false;
}
