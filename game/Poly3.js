function Poly3(p1, p2, p3, nx, ny, nz, col) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.nx = nx;
    this.ny = nz;
    this.nz = ny;
    this.depth = p1.z;
    if (this.depth > p2.z) this.depth = p2.z;
    if (this.depth > p3.z) this.depth = p3.z;
    this.sdepth = 0;
    this.col = col;
    this.norm = Math.round(Math.sqrt(((this.nx-0.47465)*(this.nx-0.47465)) + ((this.ny-0.73279)*(this.ny-0.73279)) + ((this.nz+0.48757)*(this.nz+0.48757)))*32); 

    function update() {
        var lx = this.p1.x;
        if (this.p2.x < lx) lx = this.p2.x;
        if (this.p3.x < lx) lx = this.p3.x;
        var hx = this.p1.x;
        if (this.p2.x > hx) hx = this.p2.x;
        if (this.p3.x > hx) hx = this.p3.x;
        
        var ly = this.p1.y;
        if (this.p2.y < ly) ly = this.p2.y;
        if (this.p3.y < ly) ly = this.p3.y;
        var hy = this.p1.y;
        if (this.p2.y > hy) hy = this.p2.y;
        if (this.p3.y > hy) hy = this.p3.y;
        
        var lz = this.p1.z;
        if (this.p2.z < lz) lz = this.p2.z;
        if (this.p3.z < lz) lz = this.p3.z;
        var hz = this.p1.z;
        if (this.p2.z > hz) hz = this.p2.z;
        if (this.p3.z > hz) hz = this.p3.z;
        
        this.mx = (lx+hx)/2;
        this.my = (ly+hy)/2;
        this.mz = (lz+hz)/2;
        
        this.cx = (this.p1.x+this.p2.x+this.p3.x)/3;
        this.cy = (this.p1.y+this.p2.y+this.p3.y)/3;
        this.cz = (this.p1.z+this.p2.z+this.p3.z)/3;

        var dx = (this.mx+scrollx)*1500;
        var dy = (this.my+scrolly)*1500;
        var dz = ((5*scale)-this.mz)*1000;

        this.depth = Math.abs(dx)+Math.abs(dy)+Math.abs(dz);
    }

    function draw() {
        if (this.cz>2) return;
    
        var amt = scene.getLum(this.cx, this.cy, this.cz, this.nx, this.ny, this.nz);
        var col = changeCol(this.col,amt[0],amt[1],amt[2]);
        
        context.fillStyle = col;
        context.strokeStyle = col;

        context.beginPath();

        context.moveTo(this.p1.sx,this.p1.sy);
        context.lineTo(this.p2.sx,this.p2.sy);
        context.lineTo(this.p3.sx,this.p3.sy);

        context.closePath();
        context.fill();
        context.stroke();
    }

    this.update = update;
    this.draw = draw;
}
