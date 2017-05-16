var canvas = document.getElementById("Screen");
var context = canvas.getContext("2d");

function Point(x, y, z) {
    this.x = -x;
    this.y = -z;
    this.z = -y;
    this.sx = x;
    this.sy = y;

    function update() {    
        var nx = (this.x*500)+scrollx;
        var ny = (this.y*500)+scrolly;
        
        this.sx = (nx/(-this.z+5))+400;
        this.sy = (ny/(-this.z+5))+255;
    }
    
    function draw() {
        context.fillStyle = "blue";
        context.beginPath();

        context.moveTo(this.sx+2,this.sy);
        context.lineTo(this.sx,this.sy+2);
        context.lineTo(this.sx-2,this.sy);
        context.lineTo(this.sx,this.sy-2);
        context.lineTo(this.sx+2,this.sy);

        context.closePath();
        context.fill();
    }

    this.update = update;
    this.draw = draw;
}

var damt=1000;

function Poly(p1, p2, p3, nx, ny, nz, col) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.nx = nx;
    this.ny = ny;
    this.nz = nz;
    this.depth = points[p1].z;
    if (this.depth > points[p2].z) this.depth = points[p2].z;
    if (this.depth > points[p3].z) this.depth = points[p3].z;
    this.sdepth = 0;
    this.col = col;
    this.norm = Math.round(Math.sqrt(((this.nx-0.47465)*(this.nx-0.47465)) + ((this.ny-0.73279)*(this.ny-0.73279)) + ((this.nz-0.48757)*(this.nz-0.48757)))*16); 
    
    function update() {
        var lx = points[p1].x;
        if (points[p2].x < lx) lx = points[p2].x;
        if (points[p3].x < lx) lx = points[p3].x;
        var hx = points[p1].x;
        if (points[p2].x > hx) hx = points[p2].x;
        if (points[p3].x > hx) hx = points[p3].x;
        
        var ly = points[p1].y;
        if (points[p2].y < ly) ly = points[p2].y;
        if (points[p3].y < ly) ly = points[p3].y;
        var hy = points[p1].y;
        if (points[p2].y > hy) hy = points[p2].y;
        if (points[p3].y > hy) hy = points[p3].y;
        
        var lz = points[p1].z, hz = points[p1].z;
        if (points[p2].z < lz) lz = points[p2].z;
        if (points[p2].z > hz) hz = points[p2].z;
        if (points[p3].z < lz) lz = points[p3].z;
        if (points[p3].z > hz) hz = points[p3].z;
     
        var dx = (((lx + hx)/2)*500)+scrollx;
        var dy = (((ly + hy)/2)*500)+scrolly;
        var dz = (((lz + hz)/2)+5)*damt;

        this.depth = Math.abs(dx)+Math.abs(dy)-Math.abs(dz);
    }

    function draw() {
        var camt = -this.norm;
    
        context.fillStyle = changeCol(this.col,camt,camt,camt);
        context.strokeStyle = changeCol(this.col,camt,camt,camt);

        context.beginPath();

        context.moveTo(points[this.p1].sx,points[this.p1].sy);
        context.lineTo(points[this.p2].sx,points[this.p2].sy);
        context.lineTo(points[this.p3].sx,points[this.p3].sy);
        context.lineTo(points[this.p1].sx,points[this.p1].sy);

        context.closePath();
        context.fill();
        context.stroke();
    }

    this.update = update;
    this.draw = draw;
}

var points = [];
var polys = [];

for (var i=0; i<Verts.length; i++) {
    points.push(new Point(Verts[i][0], Verts[i][1], Verts[i][2]));
}

for (var i=0; i<Polys.length; i++) {
    polys.push(new Poly(Polys[i][0], Polys[i][1], Polys[i][2], Polys[i][3], Polys[i][4], Polys[i][5], Polys[i][6]));
}

function compare(a, b) {
    return (b.depth) - (a.depth);
}

function draw() {
    context.clearRect(0, 0, 1280, 720);
    
    context.fillStyle = '#E0E0E0';
    
    context.fillRect(0,0,848,480);
    
    for (var i=0; i<points.length; i++) {
        points[i].update();
        points[i].draw();
    }
    
    if (QKey) damt+=10;
    if (EKey) damt-=10;
    
    for (var i=0; i<polys.length; i++) {
        polys[i].update();
    }
    
    polys.sort(compare);
    polys.sort(compare);
    
    for (var i=0; i<polys.length; i++) {
        polys[i].draw();
    }
	
	Input();
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
		
