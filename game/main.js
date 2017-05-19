var canvas = document.getElementById("Screen");
var context = canvas.getContext("2d");

function compare(a, b) {
    return (b.depth) - (a.depth);
}

var player = new Player(0,-0.35,0.2,bones,points,polys,anima);
var background = new Model(0,0,0,Verts,Polys,1);
var sun = new Model(0,-0.5,1,sunVerts,sunPolys,0.2);

var drawArr = background.pls.concat([player]);

drawArr = drawArr.concat(sun.pls);

context.lineWidth = 1;
context.lineCap="none";

var lightx = 0;
var lighty = -0.5;
var lightz = 1;

var ani=0;

function draw() {
    context.clearRect(0, 0, 1280, 720);
    
    context.fillStyle = '#E0E0E0';
    
    context.fillRect(0,0,848,480);
    
    if (WKey) player.z+=0.05;
    if (SKey) player.z-=0.05;
    if (QKey) lightx-=0.05;
    if (EKey) lightx+=0.05;
    if (RKey) lighty-=0.05;
    if (FKey) lighty+=0.05;
    
    ani++;
    
    sun.x = Math.sin(ani/100);
    
    lightx = sun.x;
    lighty = sun.y;
    lightz = sun.z;
    
    player.update();
    background.update();
    sun.update();

    drawArr.sort(compare);
    
    for (var i=0; i<drawArr.length; i++) {
        drawArr[i].draw();
    }

    context.fillStyle = 'black';

    KeyPrev();
    MousePrev();
}

function changeCol(col, rc, gc, bc) {
    var r = col.substr(1,2);
    var g = col.substr(3,2);
    var b = col.substr(5,2);
    
    r = parseInt(r,16);
    g = parseInt(g,16);
    b = parseInt(b,16);
    
    r *= rc;
    g *= gc;
    b *= bc;
    
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    
    if (r>255) r = 255;
    if (r<0) r = 0; 
    if (g>255) g = 255;
    if (g<0) g = 0; 
    if (b>255) b = 255;
    if (b<0) b = 0; 
    
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    
    if (r.length==1) r = '0' + r;
    if (g.length==1) g = '0' + g;
    if (b.length==1) b = '0' + b;
    
    return '#' + r + g + b;
}
	
var fps = 60;
setInterval(function () {
    draw();
}, 1000 / fps);

document.addEventListener("keydown", KeyDown, false);
document.addEventListener("keyup", KeyUp, false);
document.addEventListener("mousedown", MouseDown, false);
document.addEventListener("mouseup", MouseUp, false);
document.addEventListener("mousemove", MouseMove, false);
		
