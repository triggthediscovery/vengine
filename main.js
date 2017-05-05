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
    
        if (ani%100<50) {
            context.fillStyle = this.color;
        } else {
            context.fillStyle = "black";
        }
        context.beginPath();

        context.moveTo(this.p1.x1,this.p1.y1);
        context.lineTo(this.p2.x1,this.p2.y1);
        context.lineTo(this.p3.x1,this.p3.y1);
        context.lineTo(this.p1.x1,this.p1.y1);

        context.closePath();
        context.fill();
    }
    
    this.draw = draw;
}

var ani=0;

var skele = new Skeleton(200,225,1,0);

var bns = [];
var pts = [];
var pls = [new Poly(null,null,null,"#FFFFFF")];

function init() {
    bns = [];
    pts = [];

    for (var i=0; i<bones.length; i++) {
        bns.push(new Bone(bns[bones[i][0]], bns.length, bones[i][1], 1, 1, 1, bones[i][2]));
    }
    
    bns[0].parent = skele;
    
    for (var i=0; i<points.length; i++) {
        pts.push(new Point(points[i][0], points[i][1],points[i][2],points[i][3],null,0));
    }
}

init();

skele.bones = bns;
skele.points = pts;
skele.polys = pls;

var mode = false;
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
    
    if (!mode) str = 'point mode'; else str = 'bone mode';
    
    context.fillText(str,20,20);
	
	for (var i=0; i<bns.length; i++) {
	    bns[i].initalize();
	}
	
	skele.show();
	
	for (var i=0; i<pts.length; i++) {
	    pts[i].initalize();
	}

	if (AKey && !AKeyp) {
	    mode = !mode;
	}
	
	if (EKey && !EKeyp) {
	    if (mode) {
	        var bdist = dist(mouse_x-600,mouse_y-225,bns[boneSel].ox2,bns[boneSel].oy2);
	        var brot = Math.round(Math.atan((mouse_y-bns[boneSel].oy2-225)/(mouse_x-bns[boneSel].ox2-600))*57.29577)-bns[boneSel].rot+180;
	        
	        if ((mouse_x-bns[boneSel].ox2-600)>0) {
		        brot+=180;
	        }

	        bns.push(new Bone(bns[boneSel], bns.length, bdist, 1, 1, 1, brot));
	    } else {
	        pts.push(new Point(mouse_x-600, mouse_y-225,bns[boneSel],1,null,0));
	    }
	}
	
	if (DeKey && !DeKeyp) {
	    if (mode) {
	        bns.splice(boneSel,1);
	    } else {
	        pts.splice(pointSel,1);
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
    
    if (psel!=-1) {
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
	
	if (LMouse) {
	    if (mode) {
	        animation_Config();
	    } else {
	        point_Config();
	    }
	    
	    selected = true;
	} else {
	    selected = false;
	}
	
	var boneStr = '[';
	
	for (var i=0; i<bns.length; i++) {
	    boneStr += bns[i].write();
	    if (i+1<bns.length) boneStr += ', ';
	}
	
	boneStr += ']';
	
	var pointStr = '[';
	
	for (var i=0; i<pts.length; i++) {
	    pointStr += pts[i].write();
	    if (i+1<pts.length) pointStr += ', ';
	}
	
	pointStr += ']';
	
	document.querySelector('.results1').innerHTML = boneStr;
	document.querySelector('.results2').innerHTML = pointStr;
	
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
	
var fps = 60;
setInterval(function () {
    draw();
}, 1000 / fps);

document.addEventListener("keydown", KeyDown, false);
document.addEventListener("keyup", KeyUp, false);
document.addEventListener("mousedown", MouseDown, false);
document.addEventListener("mouseup", MouseUp, false);
document.addEventListener("mousemove", MouseMove, false);
		
