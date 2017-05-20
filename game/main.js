var canvas = document.getElementById("Screen");
var context = canvas.getContext("2d");

function compare(a, b) {
    return (b.depth) - (a.depth);
}

var player = new Player(0,-0.35,0.2,bones,points,polys,anima);
var background = new Model(0,0,0,Verts,Polys,1);
var sun = new Model(0,-0.5,1,sunVerts,sunPolys,0.2);
var cloud1 = new Model(1,-3.1,1,cloudVerts,cloudPolys,0.5);
var cloud2 = new Model(-0.8,-3.3,1,cloudVerts,cloudPolys,0.7);
var cloud3 = new Model(-1.6,-3.2,1,cloudVerts,cloudPolys,0.6);
var cloud4 = new Model(0.4,-3.6,1,cloudVerts,cloudPolys,0.7);

var drawArr = background.pls.concat([player]);

drawArr = drawArr.concat(sun.pls);
drawArr = drawArr.concat(cloud1.pls);
drawArr = drawArr.concat(cloud2.pls);
drawArr = drawArr.concat(cloud3.pls);
drawArr = drawArr.concat(cloud4.pls);

context.lineWidth = 1;
context.lineCap="none";

var lights = [new Light(0.35, -0.75, -0.5, 1, 0.2, 0, 3), new Light(-0.35, -0.75, -0.5, 1, 0.2, 0, 3), new Light(0,-1, -16, 0.4, 0.4, 1, 0.5), new Light(0,-1, -16, 0, 0, 0.3, 0.5), new Light(0,-7, -16, 1, 1, 1, 0.05), new Light(0.35, -0.75, -3.4, 1, 0.2, 0, 3), new Light(-0.35, -0.75, -3.4, 1, 0.2, 0, 3)];
var scene = new Scene(lights);

var ani=0;

function draw() {
    context.clearRect(0, 0, 1280, 720);
    
    context.fillStyle = '#E0E0E0';
    
    context.fillRect(0,0,848,480);
    
    if (WKey) player.z+=0.05;
    if (SKey) player.z-=0.05;
    
    ani+=5;
    
    //lights[0].x = (Math.sin(ani/5)/10)+0.35;
    //lights[1].x = (Math.cos(ani/5)/10)-0.35;

    lights[2].z =-(Math.sin(ani/500)*4) - 35;
    lights[3].z =-(Math.sin(ani/500)*4) - 35;
    
    sun.y = Math.sin(ani/-500)*20;
    sun.z = Math.cos(ani/-500)*20;
    
    lights[4].x = sun.x*10;
    lights[4].y = sun.y*10;
    lights[4].z = sun.z*10;
    
    var uy = sun.y - 15;
    
    if (uy<0) {
        if (sun.z>0 || uy<-50) {
            lights[4].ramt = 1;
            lights[4].gamt = 1;
            lights[4].bamt = 1;
        } else {
            lights[4].ramt = 1;
            lights[4].gamt = 0.6+(0.008*-uy);
            lights[4].bamt = 0.4+(0.01*-uy);
        }
        
        lights[4].dist = -0.001/uy;
    } else {
        lights[4].dist = 1000;
    }

    cloud1.z = -(((ani/100))%40)-10;
    cloud2.z = -(((ani/100)+10)%40)-10;
    cloud3.z = -(((ani/100)+20)%40)-10;
    cloud4.z = -(((ani/100)+30)%40)-10;
    
    player.update();
    background.update();
    sun.update();
    cloud1.update();
    cloud2.update();
    cloud3.update();
    cloud4.update();

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
		
