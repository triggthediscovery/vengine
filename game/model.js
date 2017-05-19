function Model(x, y, z, MPoints, MPolys, mscale) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.pts = [];
    this.pls = [];
    this.scale = mscale;
    
    function init() {
        for (var i=0; i<MPoints.length; i++) {
            this.pts.push(new Point3(MPoints[i][0], MPoints[i][1], MPoints[i][2]));
        }

        for (var i=0; i<MPolys.length; i++) {
            this.pls.push(new Poly3(this.pts[MPolys[i][0]], this.pts[MPolys[i][1]], this.pts[MPolys[i][2]], MPolys[i][3], MPolys[i][4], MPolys[i][5], MPolys[i][6]));
        }
    }
    
    function update() {
        for (var i = 0; i < this.pts.length; i++) {
            this.pts[i].x = (this.pts[i].ox*this.scale) + this.x;
            this.pts[i].y = (this.pts[i].oy*this.scale) + this.y;
            this.pts[i].z = (this.pts[i].oz*this.scale) + this.z;
            this.pts[i].update();
        }
        
        for (var i = 0; i < this.pls.length; i++) {
            this.pls[i].update();
        }
    }
    
    function draw() {
        for (var i = 0; i < this.pls.length; i++) {
            this.pls[i].draw();
        }
    }
    
    this.update = update;
    this.draw = draw;
    this.init = init;
    
    this.init();
    
}
