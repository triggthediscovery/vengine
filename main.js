char = [[],
        []]

var canvas = document.getElementById("Screen");
var context = canvas.getContext("2d");

function dist(x1, y1, x2, y2) {
    return Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)));
}

function ldist(x1, y1, x2, y2, xo, yo) {
    if (x1==x2) {
        return new sPoint(yo-y1,xo-x1);
    }
    if (y1==y2) { 
        return new sPoint(xo-x1,yo-y1);
    }
    
    var m = (y1-y2)/(x1-x2);
    var b = y1-(m*x1);
    
    var m2 = -1/m;
    var b2 = yo-(m2*xo);
    
    var intx = (b-b2)/(m2-m);
    var inty = (m2*intx)+b2;
    
    var a = dist(intx,inty,xo,yo);
    var b = dist(intx,inty,x1,y1);
    
    if (xo>intx) a = -a;
    if (x1>intx) b = -b;
    
    if (x1<x2) b=-b;
    
    if (y1>y2) a=-a;
    
    return new sPoint(-b,a);
}

function sPoint(x, y) {
    this.x = x;
    this.y = y;
}

function findPt(pt) {
    var retVal=0;
    
    while (pts[retVal]!=pt) retVal++;
    
    return retVal;
}

var ani=0;

var skele = new Skeleton(200, 225, 1, 0, anima[0], anima[1]);

var bns = [];
var pts = [];
var pls = [new Poly(null,null,null,"#FFFFFF")];

function init() {
    bns = [];
    pts = [];
    pls = [];

    for (var i=0; i<bones.length; i++) {
        bns.push(new Bone(bns[bones[i][0]], bns.length, bones[i][1], 1, 1, 1, bones[i][2]));
    }
    
    bns[0].parent = skele;
    
    for (var i=0; i<points.length; i++) {
        pts.push(new Point(points[i][0], points[i][1],bns[points[i][2]],0,bns[points[i][3]],0));
    }
    
    for (var i=0; i<polys.length; i++) {
        pls.push(new Poly(pts[polys[i][0]],pts[polys[i][1]],pts[polys[i][2]],polys[i][3]));
    }
}

init();

skele.bones = bns;
skele.points = pts;
skele.polys = pls;

context.lineWidth = 1;
context.lineCap="none";

function draw() {
    context.clearRect(0, 0, 1280, 720);
    
    context.fillStyle = '#E0E0E0';
    
    context.fillRect(0,0,848,480);
    
    context.fillStyle = 'black';
    
    ani++;
    
    var str = ""
    
    if (mode == 1) str = 'point mode'; 
    else if (mode == 0) str = 'bone mode'; 
    else if (mode == 2) str = 'poly mode';
    else if (mode == 3) str = 'ani mode';
    
    if (mode == 3) {
        if (play) {
            skele.frame++;
            
            if (skele.frame==skele.frames.length) {
                skele.frame=0;
            }
        }
    } else {
        skele.frame=0;
        play = false;
    }
    
    context.fillText(str,20,20);
    context.fillText(skele.frame,20,40);

	for (var i=0; i<pts.length; i++) {
	    pts[i].initalize();
	}
	
	for (var i=0; i<bns.length; i++) {
	    bns[i].initalize();
	}

    skele.update();
	skele.draw();
	skele.show();
	
	if (polySel!=-1 && pls[polySel].p1!=null && pls[polySel].p2!=null && pls[polySel].p3!=null) {
	    context.strokeStyle = "#FFFF00";
        context.beginPath();

        context.moveTo(pls[polySel].p1.x+600,pls[polySel].p1.y+225);
        context.lineTo(pls[polySel].p2.x+600,pls[polySel].p2.y+225);
        context.lineTo(pls[polySel].p3.x+600,pls[polySel].p3.y+225);
        context.lineTo(pls[polySel].p1.x+600,pls[polySel].p1.y+225);

        context.closePath();
        context.stroke();
    }

	writeOut();
	
	Input();
    KeyPrev();
    MousePrev();
}

function writeOut() {
    var boneStr = 'var bones = [';
	
	for (var i=0; i<bns.length; i++) {
	    boneStr += bns[i].write();
	    if (i+1<bns.length) boneStr += ', ';
	}
	
	boneStr += ']';
	
	var pointStr = 'var points = [';
	
	for (var i=0; i<pts.length; i++) {
	    pointStr += pts[i].write();
	    if (i+1<pts.length) pointStr += ', ';
	}
	
	pointStr += ']';
	
	var polyStr = 'var polys = [';
	
	for (var i=0; i<pls.length; i++) {
	    polyStr += pls[i].write();
	    if (i+1<pls.length) polyStr += ', ';
	}
	
	polyStr += ']';
	
	var aniStr = 'var anima = ' + skele.write();
	
	document.querySelector('.results1').innerHTML = boneStr;
	document.querySelector('.results2').innerHTML = pointStr;
	document.querySelector('.results3').innerHTML = polyStr;
	document.querySelector('.results4').innerHTML = aniStr;
}

function changeCol(col, rc, gc, bc) {
    var r = col.substr(1,2);
    var g = col.substr(3,2);
    var b = col.substr(5,2);
    
    r = parseInt(r,16);
    g = parseInt(g,16);
    b = parseInt(b,16);
    
    r += rc;
    g += gc;
    b += bc;
    
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
		
