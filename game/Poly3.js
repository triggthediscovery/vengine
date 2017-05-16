function Poly3(p1, p2, p3, nx, ny, nz, col) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.nx = nx;
    this.ny = ny;
    this.nz = nz;
    this.depth = pnts[p1].z;
    if (this.depth > pnts[p2].z) this.depth = pnts[p2].z;
    if (this.depth > pnts[p3].z) this.depth = pnts[p3].z;
    this.sdepth = 0;
    this.col = col;
    this.norm = Math.round(Math.sqrt(((this.nx-0.47465)*(this.nx-0.47465)) + ((this.ny-0.73279)*(this.ny-0.73279)) + ((this.nz-0.48757)*(this.nz-0.48757)))*16); 
    
    function update() {
        var lx = pnts[p1].x;
        if (pnts[p2].x < lx) lx = pnts[p2].x;
        if (pnts[p3].x < lx) lx = pnts[p3].x;
        var hx = pnts[p1].x;
        if (pnts[p2].x > hx) hx = pnts[p2].x;
        if (pnts[p3].x > hx) hx = pnts[p3].x;
        
        var ly = pnts[p1].y;
        if (pnts[p2].y < ly) ly = pnts[p2].y;
        if (pnts[p3].y < ly) ly = pnts[p3].y;
        var hy = pnts[p1].y;
        if (pnts[p2].y > hy) hy = pnts[p2].y;
        if (pnts[p3].y > hy) hy = pnts[p3].y;
        
        var lz = pnts[p1].z, hz = pnts[p1].z;
        if (pnts[p2].z < lz) lz = pnts[p2].z;
        if (pnts[p2].z > hz) hz = pnts[p2].z;
        if (pnts[p3].z < lz) lz = pnts[p3].z;
        if (pnts[p3].z > hz) hz = pnts[p3].z;
     
        var dx = (((lx + hx)/2)*500)+scrollx;
        var dy = (((ly + hy)/2)*500)+scrolly;
        var dz = (((lz + hz)/2)+5)*1000;

        this.depth = Math.abs(dx)+Math.abs(dy)-Math.abs(dz);
    }

    function draw() {
        var camt = -this.norm;
    
        context.fillStyle = changeCol(this.col,camt,camt,camt);
        context.strokeStyle = changeCol(this.col,camt,camt,camt);

        context.beginPath();

        context.moveTo(pnts[this.p1].sx,pnts[this.p1].sy);
        context.lineTo(pnts[this.p2].sx,pnts[this.p2].sy);
        context.lineTo(pnts[this.p3].sx,pnts[this.p3].sy);
        context.lineTo(pnts[this.p1].sx,pnts[this.p1].sy);

        context.closePath();
        context.fill();
        context.stroke();
    }

    this.update = update;
    this.draw = draw;
}
