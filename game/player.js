function Player(x, y, PBones, PPoints, PPolys, animations) {
    this.x = x;
    this.y = y;
    this.skele = new Skeleton(this.x, this.y, 1, 1, 0, animations);
    this.bns = [];
    this.pts = [];
    this.pls = [];
    
    function init() {
        for (var i=0; i<PBones.length; i++) {
            this.bns.push(new Bone(this.bns[PBones[i][0]], this.bns.length, PBones[i][1], 1, 1, 1, PBones[i][2]));
        }
        
        this.bns[0].parent = this.skele;
        
        for (var i=0; i<PPoints.length; i++) {
            this.pts.push(new Point(PPoints[i][0], PPoints[i][1],this.bns[PPoints[i][2]],0,this.bns[PPoints[i][3]],0));
        }
        
        for (var i=0; i<PPolys.length; i++) {
            this.pls.push(new Poly(this.pts[PPolys[i][0]],this.pts[PPolys[i][1]],this.pts[PPolys[i][2]],PPolys[i][3]));
        }
        
        this.skele.bones = this.bns;
        this.skele.points = this.pts;
        this.skele.polys = this.pls;
        
        for (var i=0; i<this.bns.length; i++) {
            this.bns[i].initalize();
        }

        for (var i=0; i<this.pts.length; i++) {
            this.pts[i].initalize();
        }
    }

    function update() {
        this.skele.frame+=this.skele.speed;
    
        if (this.skele.frame>=(this.skele.frames[0][0].length-1)) {
            this.skele.frame=0;
        }
        
        if (this.skele.frame<0) {
            this.skele.frame=(this.skele.frames[0][0].length-1);
        }
        
        this.skele.update();
    }
    
    function draw() {
        this.skele.draw();
    }
    
    this.update = update;
    this.draw = draw;
    this.init = init;
    
    this.init();
}
