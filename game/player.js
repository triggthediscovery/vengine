function Player(x, y, z, PBones, PPoints, PPolys, animations, aniEn) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.skele = new Skeleton(this.x, this.y, 1, 1, 0);
    this.bns = [];
    this.pts = [];
    this.pls = [];
    this.anim = animations;
    this.frame = 0;
    this.speed = 0;
    this.sx;
    this.sy;
    this.playerPt = new Point3(this.x,this.y,this.z);
    this.aniEn = aniEn;

    function init() {
        for (var i=0; i<PBones.length; i++) {
            this.bns.push(new Bone(this.bns[PBones[i][0]], this.bns.length, PBones[i][1], 1, 1, 1, PBones[i][2]));
        }
        
        this.bns[0].parent = this.skele;
        
        for (var i=0; i<PPoints.length; i++) {
            this.pts.push(new Point(PPoints[i][0], PPoints[i][1],this.bns[PPoints[i][2]],0,this.bns[PPoints[i][3]],0));
        }
        
        for (var i=0; i<PPolys.length; i++) {
            this.pls.push(new Poly(this.pts[PPolys[i][0]],this.pts[PPolys[i][1]],this.pts[PPolys[i][2]],PPolys[i][3],this));
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
        this.aniEn.update();

        this.speed = 0;
        
        for (var i=0; i<this.aniEn.currStates.length; i++) {
            if (this.aniEn.currStates[i].id == 0) {
                this.speed = this.aniEn.currStates[i].weight * (this.skele.scalex/Math.abs(this.skele.scalex));
            } if (this.aniEn.currStates[i].id == 1 && this.speed == 0) {
                //this.speed = 0.001;
            }
        }
        
        if ((Keys[65] || Keys[68]) && !(Keys[65] && Keys[68]) && this.speed != 0) {
             if (Keys[65]) this.skele.scalex = -1; else this.skele.scalex = 1;
        }
        
        this.x += 0.02*this.speed;

        this.playerPt.x = this.x;
        this.playerPt.y = this.y;
        this.playerPt.z = this.z;
        
        this.playerPt.update();
    
        var dx = (this.x+scrollx)*1500;
        var dy = (this.y-0.2+scrolly)*1500;
        var dz = ((5*scale)-this.z)*1000;

        this.depth = Math.abs(dx)+Math.abs(dy)+Math.abs(dz);

        this.sx = this.playerPt.sx;
        this.sy = this.playerPt.sy;
        
        var mscale = 5/(-this.z+(5*scale));
        
        var fr = this.aniEn.getAni();
        
        var posArr = fr[0];
        var barr = fr[1];
        
        this.skele.x2 = posArr[0]*this.skele.scalex/2;
        this.skele.y2 = posArr[1]*this.skele.scaley/2;
        this.skele.rot = posArr[2];
        this.skele.rotu = posArr[2];
        this.skele.roti = posArr[2];
        this.skele.scaley = mscale;
        
        this.skele.scalex = mscale * (this.skele.scalex/Math.abs(this.skele.scalex));

        this.skele.frames = barr;

        this.frame+=0.8;
    
        if (this.frame>=80) {
            this.frame=0;
        }
        
        if (this.frame<0) {
            this.frame=80;
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
