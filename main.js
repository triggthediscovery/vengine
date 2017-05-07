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

function Poly(p1, p2, p3, color) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.color = color;
    
    function draw() {
        if (this.p1 == null || this.p2 == null || this.p3 == null) return;

        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.beginPath();

        context.moveTo(this.p1.x1,this.p1.y1);
        context.lineTo(this.p2.x1,this.p2.y1);
        context.lineTo(this.p3.x1,this.p3.y1);
        context.lineTo(this.p1.x1,this.p1.y1);

        context.closePath();
        context.fill();
        context.stroke();
    }
    
    function show() {
        if (this.p1 == null || this.p2 == null || this.p3 == null) return;

        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.beginPath();

        context.moveTo(this.p1.x+600,this.p1.y+225);
        context.lineTo(this.p2.x+600,this.p2.y+225);
        context.lineTo(this.p3.x+600,this.p3.y+225);
        context.lineTo(this.p1.x+600,this.p1.y+225);

        context.closePath();
        context.fill();
        context.stroke();
    }
    
    function write() {
        var retStr = '[';

        retStr += findPt(this.p1);
        retStr += ', ';
        retStr += findPt(this.p2);
        retStr += ', ';
        retStr += findPt(this.p3);
        retStr += ', \'';
        retStr += this.color;
        retStr += '\']';
        
        return retStr;
    }
    
    function selected() {
        var a, b;
        
        a = ldist(this.p1.x,this.p1.y,this.p2.x,this.p2.y,mouse_x-600,mouse_y-225);
        b = ldist(this.p1.x,this.p1.y,this.p2.x,this.p2.y,this.p3.x,this.p3.y);
        
        if ((a.y/Math.abs(a.y)) != (b.y/Math.abs(b.y))) return false;
        
        a = ldist(this.p3.x,this.p3.y,this.p2.x,this.p2.y,mouse_x-600,mouse_y-225);
        b = ldist(this.p3.x,this.p3.y,this.p2.x,this.p2.y,this.p1.x,this.p1.y);
        
        if ((a.y/Math.abs(a.y)) != (b.y/Math.abs(b.y))) return false;
        
        a = ldist(this.p1.x,this.p1.y,this.p3.x,this.p3.y,mouse_x-600,mouse_y-225);
        b = ldist(this.p1.x,this.p1.y,this.p3.x,this.p3.y,this.p2.x,this.p2.y);
        
        if ((a.y/Math.abs(a.y)) != (b.y/Math.abs(b.y))) return false;
        
        return true;
    }
    
    this.draw = draw;
    this.write = write;
    this.selected = selected;
    this.show = show;
}

var ani=0;

var skele = new Skeleton(200,225,1,0);

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
        pts.push(new Point(points[i][0], points[i][1],points[i][2],points[i][3],null,0));
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
    
    if (mode == 1) str = 'point mode'; else if (mode == 0) str = 'bone mode'; else if (mode == 2) str = 'poly mode';
    
    context.fillText(str,20,20);

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

        context.moveTo(pls[polySel].p1.x1,pls[polySel].p1.y1);
        context.lineTo(pls[polySel].p2.x1,pls[polySel].p2.y1);
        context.lineTo(pls[polySel].p3.x1,pls[polySel].p3.y1);
        context.lineTo(pls[polySel].p1.x1,pls[polySel].p1.y1);

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
	
	document.querySelector('.results1').innerHTML = boneStr;
	document.querySelector('.results2').innerHTML = pointStr;
	document.querySelector('.results3').innerHTML = polyStr;
}

function point_Config() {
    var tde = 64;

    if (selected && (pointSel != -1)) {
        pts[pointSel].x = mouse_x-600;
        pts[pointSel].y = mouse_y-225;
    } else {
        for (var i=0; i<pts.length; i++) {
            dde=Math.abs(mouse_x-pts[i].x-600)+Math.abs(mouse_y-pts[i].y-225);

	        if (dde<tde) {
		        bd=i;
		        tde=dde;
	        }
	    }

	    if (tde<32) {		
		    pointSel = bd;
	    } else {
	        pointSel=-1;
	    }
    }
}

function animation_Config() {
    var tde = 6400;

    if (selected && (boneSel != -1)) {
        if (anim) {
            skele.draw();
        
            var rn = bns[boneSel].parent.rot;
            
            bns[boneSel].roti = Math.round(Math.atan((mouse_y-bns[boneSel].y1)/(mouse_x-bns[boneSel].x1))*57.29577)-rn+180;
		
	        if ((mouse_x-bns[boneSel].x1)>=0) {
		        bns[boneSel].roti+=180;
	        }
	    } else {
	        var bdist = dist(mouse_x-600,mouse_y-225,bns[boneSel].ox1,bns[boneSel].oy1);
	        var brot = Math.round(Math.atan((mouse_y-bns[boneSel].oy1-225)/(mouse_x-bns[boneSel].ox1-600))*57.29577)-bns[boneSel].parent.rotu+180;
	        
	        if ((mouse_x-bns[boneSel].ox1-600)>0) {
		        brot+=180;
	        }
	        
	        bns[boneSel].roto = brot;
	        bns[boneSel].length = bdist;
	    }
    } else {
        for (var i=0; i<bns.length; i++) {
            dde=Math.abs(mouse_x-bns[i].x2)+Math.abs(mouse_y-bns[i].y2);

	        if (dde<tde) {
		        bd=i;
		        tde=dde;
	        }
	    }

	    if (tde<32) {
		    boneSel=bd;
		    
		    anim=true;
	    } else {
	        for (var i=0; i<bns.length; i++) {
                dde=Math.abs(mouse_x-bns[i].ox2-600)+Math.abs(mouse_y-bns[i].oy2-225);

	            if (dde<tde) {
		            bd=i;
		            tde=dde;
	            }
	        }

	        if (tde<32) {
		        boneSel=bd;
		        
		        anim=false;
	        } else {
	            boneSel=-1;
	        }
	    }
    }
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
		
