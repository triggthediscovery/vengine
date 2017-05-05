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

function Point(x, y, parent_a, parent_a_weight, parent_b, parent_b_weight) {
    this.x = x;
    this.y = y;
    this.parent_a = parent_a;
    this.parent_a_weight = parent_a_weight;
    this.parent_b = parent_b;
    this.parent_b_weight = parent_b_weight;
    this.x1 = x;
    this.y1 = y;

    function initalize() {
        if (typeof this.parent_a != 'object') {
            this.parent_a = bns[this.parent_a];
        }
    
        var b = ldist(this.parent_a.ox1,this.parent_a.oy1,
                      this.parent_a.ox2,this.parent_a.oy2,
                      this.x,this.y);
    
        this.offsetp1x = b.x;
        this.offsetp1y = -b.y;
    }
    
    function update() {    
        this.x1 = (this.offsetp1x*this.parent_a.parx) + (this.offsetp1y*this.parent_a.perx) + this.parent_a.x1;
        this.y1 = (this.offsetp1x*this.parent_a.pary) + (this.offsetp1y*this.parent_a.pery) + this.parent_a.y1; 
    }
    
    function draw() {
        if (this!=pts[pointSel]) {
            context.fillStyle = "blue";
        } else {
            context.fillStyle = "green";
        }
        context.beginPath();

        context.moveTo(this.x1+2,this.y1);
        context.lineTo(this.x1,this.y1+2);
        context.lineTo(this.x1-2,this.y1);
        context.lineTo(this.x1,this.y1-2);
        context.lineTo(this.x1+2,this.y1);

        context.closePath();
        context.fill();
    }
    
    function show() {
        if (this!=pts[pointSel]) {
            context.fillStyle = "blue";
        } else {
            context.fillStyle = "green";
        }
        context.beginPath();

        context.moveTo(this.x+2+600,this.y+225);
        context.lineTo(this.x+600,this.y+2+225);
        context.lineTo(this.x-2+600,this.y+225);
        context.lineTo(this.x+600,this.y-2+225);
        context.lineTo(this.x+2+600,this.y+225);

        context.closePath();
        context.fill();
    }
        
    function write() {
        var retStr = '[';

        retStr += this.x;
        retStr += ', ';
        retStr += this.y;
        retStr += ', ';
        retStr += this.parent_a.ID;
        retStr += ', ';
        retStr += this.parent_a_weight;
        retStr += ']';
        
        return retStr;
    }
    
    this.initalize = initalize;
    this.update = update;
    this.draw = draw;
    this.show = show;
    this.write = write;
    
    this.initalize();
}

function findPt(pt) {
    var retVal=0;
    
    while (pts[retVal]!=pt) retVal++;
    
    return retVal;
}

function Skeleton(x, y, scale, rot) {
    this.bones = [];
    this.points = [];
    this.polys = [];
    this.x2 = x;
    this.y2 = y;
    this.scale = scale;
    this.rot = rot;
    
    function update() {
        for (var i = 0; i < this.bones.length; i++) {
            this.bones[i].update();
        }
        
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].update();
        }
    }
    
    function draw() {
        for (var i = 0; i < this.bones.length; i++) {
            this.bones[i].draw();
        }  
              
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].draw();
        }
        
        for (var i = 0; i < this.polys.length; i++) {
            this.polys[i].draw();
        }
    }
    
    function show() {
        for (var i = 0; i < this.bones.length; i++) {
            this.bones[i].show();
        }  
              
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].show();
        }
    }
    
    this.update = update;
    this.draw = draw;
    this.show = show;
}

function Bone(parent, ID, length, scale_front, scale_back, scale_length, roti) {
    this.parent = parent;
    this.ID = ID;
    this.length = length;
    this.scale_front = scale_front;
    this.scale_back = scale_back;
    this.scale_length = scale_length;
    this.roti = roti; 
    this.roto = roti;
    this.help = -1;
    this.rot = 0;

    function initalize() {
        if (typeof this.parent != 'object') {
            this.parent = bns[this.parent];
        }
    
        if (this.parent.help==-1) {
            this.ox1 = this.parent.ox2; 
            this.oy1 = this.parent.oy2;
            this.rot = this.roto + this.parent.rot;
        } else {
            this.ox1 = 0; 
            this.oy1 = 0;
            this.rot = this.roto;
        }
        this.ox2 = (Math.cos(this.rot/57.29577)*this.length*this.scale_length)+this.ox1; 
        this.oy2 = (Math.sin(this.rot/57.29577)*this.length*this.scale_length)+this.oy1;
    }

    function update() {
        if (this.parent==null) {
            this.x1 = 400;
            this.y1 = 225;
            this.rot = this.roti;
        } else {
            this.x1 = this.parent.x2;
            this.y1 = this.parent.y2;
            this.rot = this.roti+this.parent.rot;
        }

        this.parx = Math.cos(this.rot/57.29577);
        this.pary = Math.sin(this.rot/57.29577); 
        this.perx = Math.sin(this.rot/57.29577); 
        this.pery = -Math.cos(this.rot/57.29577);
        
        this.x2 = (Math.cos(this.rot/57.29577)*this.length*this.scale_length)+this.x1; 
        this.y2 = (Math.sin(this.rot/57.29577)*this.length*this.scale_length)+this.y1;
    }
    
    function draw() {
        if (this!=bns[boneSel]) {
            context.strokeStyle = "red";
        } else {
            context.strokeStyle = "green";
        }
        context.beginPath();
        
        context.moveTo(this.x1,this.y1);
        context.lineTo(this.x2,this.y2);
        
        context.closePath();
        context.stroke();
    }
    
    function show() {
        if (this!=bns[boneSel]) {
            context.strokeStyle = "red";
        } else {
            context.strokeStyle = "green";
        }
        context.beginPath();
        
        context.moveTo(this.ox1+600,this.oy1+225);
        context.lineTo(this.ox2+600,this.oy2+225);
        
        context.closePath();
        context.stroke();
    }
    
    function write() {
        var retStr = '[';

        retStr += this.parent.ID;
        retStr += ', ';
        retStr += this.length;
        retStr += ', ';
        retStr += this.roto;
        retStr += ']';
        
        return retStr;
    }
    
    this.initalize = initalize;
    this.update = update;
    this.draw = draw;
    this.show = show;
    this.write = write;
}

function Poly(p1, p2, p3, color) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.color = color;
    
    function draw() {
        if (this.p1 == null || this.p2 == null || this.p3 == null) return;
    
        if (ani%100<25 && this==pls[polySel]) {
            context.fillStyle = "black";
        } else {
            context.fillStyle = this.color;
        }
        context.beginPath();

        context.moveTo(this.p1.x1,this.p1.y1);
        context.lineTo(this.p2.x1,this.p2.y1);
        context.lineTo(this.p3.x1,this.p3.y1);
        context.lineTo(this.p1.x1,this.p1.y1);

        context.closePath();
        context.fill();
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
    
    this.draw = draw;
    this.write = write;
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

var mode = 0;
var anim = true;
/*
LMouse - edit
AKey - change edit mode
EKey - add point
RKey - change parent
*/

var pointSel = -1;
var boneSel = -1;
var polySel = 0;
var selected = false;

function draw() {
    context.clearRect(0, 0, 1280, 720);
    
    context.fillStyle = '#E0E0E0';
    
    context.fillRect(0,0,848,480);
    
    context.fillStyle = 'black';
    
    ani++;
    
    var str = ""
    
    if (mode == 1) str = 'point mode'; else if (mode == 0) str = 'bone mode'; else if (mode == 2) str = 'poly mode';
    
    context.fillText(str,20,20);
	
	for (var i=0; i<bns.length; i++) {
	    bns[i].initalize();
	}
	
	skele.show();
	
	for (var i=0; i<pts.length; i++) {
	    pts[i].initalize();
	}

	if (AKey && !AKeyp) {
	    mode++;
	    
	    if (mode>2) mode = 0;
	}
	
	if (EKey && !EKeyp) {
	    if (mode==0) {
	        var bdist = dist(mouse_x-600,mouse_y-225,bns[boneSel].ox2,bns[boneSel].oy2);
	        var brot = Math.round(Math.atan((mouse_y-bns[boneSel].oy2-225)/(mouse_x-bns[boneSel].ox2-600))*57.29577)-bns[boneSel].rot+180;
	        
	        if ((mouse_x-bns[boneSel].ox2-600)>0) {
		        brot+=180;
	        }

	        bns.push(new Bone(bns[boneSel], bns.length, bdist, 1, 1, 1, brot));
	    } else if (mode==1) {
	        pts.push(new Point(mouse_x-600, mouse_y-225,bns[boneSel],1,null,0));
	    } else if (mode==2) {
	        var found=false;
	        
	        for (var i=0; i<pls.length; i++) {
	            if (pls[i].p1 == null || pls[i].p2 == null || pls[i].p3 == null) {
	                polySel = i;
	                i = pls.length;
	                found = true;
	            }
	        }
	    
	        if (!found) {
	            pls.push(new Poly(null,null,null,"#FFFFFF"));
	            polySel = pls.length-1;
	        }
	    }
	}
	
	if (DeKey && !DeKeyp) {
	    if (mode == 0) {
	        bns.splice(boneSel,1);
	    } else if (mode == 1) {
	        pts.splice(pointSel,1);
	    } else if (mode == 2) {
	        pls.splice(polySel,1);
	    }
	}
	
	if (RKey && !RKeyp) {
	    pts[pointSel].parent_a = bns[boneSel];
	}

    skele.update();
	skele.draw();
	
	var tde = 100;
	var psel = -1;
	
	for (var i=0; i<pts.length; i++) {
        dde=Math.abs(mouse_x-pts[i].x-600)+Math.abs(mouse_y-pts[i].y-225);

        if (dde<tde) {
	        bd=i;
	        tde=dde;
        }
    }

    if (tde<32) {		
	    psel = bd;
    }
    
    if (psel!=-1 && mode==2) {
        if (OneKey && !OneKeyp) {
            pls[polySel].p1 = pts[psel];
        }
        if (TwoKey && !TwoKeyp) {
            pls[polySel].p2 = pts[psel];
        }
        if (ThreeKey && !ThreeKeyp) {
            pls[polySel].p3 = pts[psel];
        }
    }
    
    if (mode==2) {
        if (FourKey && !FourKeyp) {
            pls[polySel].color = changeCol(pls[polySel].color,-8,0,0);
        }
        if (SevenKey && !SevenKeyp) {
            pls[polySel].color = changeCol(pls[polySel].color,8,0,0);
        }
        if (FiveKey && !FiveKeyp) {
            pls[polySel].color = changeCol(pls[polySel].color,0,-8,0);
        }
        if (EightKey && !EightKeyp) {
            pls[polySel].color = changeCol(pls[polySel].color,0,8,0);
        }
        if (SixKey && !SixKeyp) {
            pls[polySel].color = changeCol(pls[polySel].color,0,0,-8);
        }
        if (NineKey && !NineKeyp) {
            pls[polySel].color = changeCol(pls[polySel].color,0,0,8);
        }
    }
	
	if (LMouse) {
	    if (mode == 0) {
	        animation_Config();
	    } else if (mode == 1) {
	        point_Config();
	    }
	    
	    selected = true;
	} else {
	    selected = false;
	}
	
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
	
    KeyPrev();
    MousePrev();
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
            var rn = bns[boneSel].parent.rot;
            
            bns[boneSel].roti = Math.round(Math.atan((mouse_y-bns[boneSel].y1)/(mouse_x-bns[boneSel].x1))*57.29577)-rn+180;
		
	        if ((mouse_x-bns[boneSel].x1)>=0) {
		        bns[boneSel].roti+=180;
	        }
	    } else {
	        var bdist = dist(mouse_x-600,mouse_y-225,bns[boneSel].ox1,bns[boneSel].oy1);
	        var brot = Math.round(Math.atan((mouse_y-bns[boneSel].oy1-225)/(mouse_x-bns[boneSel].ox1-600))*57.29577)-bns[boneSel].parent.rot+180;
	        
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
		
