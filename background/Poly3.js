function Poly3(p1, p2, p3, nx, ny, nz, col) {
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
        
        context.strokeStyle = "black";

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
