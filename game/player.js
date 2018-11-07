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
    this.py = 0;
    this.enemy = undefined;
    this.iframes = -1;
    this.lastOff = [0,0,0];
    this.turn = false;
    this.maxy = 0;
    this.tar_y = 0;
    this.blocked = false;
    this.health = 100;
    
    this.Keys = [];
    this.Keysp = [];

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
    
    function hit(damage) {
        if (this.iframes < 0) { 
            this.iframes = 30;
            
            this.health-=damage;
            
            if (this.health<0) {
                this.aniEn.forceState(13);
            
                this.health=0;
            }
        }
    }
    
    //pt99 is sword tip

    function update() {
        
        
        this.iframes--;
        
        this.playerPt.x = this.x;
        this.playerPt.y = this.y;
        this.playerPt.z = this.z;
        
        this.playerPt.update();
        
        this.aniEn.update();
        
        if (this.turn) {
            if (this.x > this.enemy.x) 
                this.skele.scalex = -Math.abs(this.skele.scalex); 
            else 
                this.skele.scalex = Math.abs(this.skele.scalex);
        }

        this.speed = 0;
        
        var find = false;
        this.turn=false;
        
        for (var i=0; i<this.aniEn.currStates.length; i++) {
            if (this.aniEn.currStates[i].id == 0 || this.aniEn.currStates[i].id == 11) {
                this.speed = this.aniEn.currStates[i].weight * (this.skele.scalex/Math.abs(this.skele.scalex)) * this.aniEn.currStates[i].speed * 12;
                this.turn = true;
            } else if (this.aniEn.currStates[i].id == 1 && this.speed == 0) {
                this.turn = true;
            } else if (((this.aniEn.currStates[i].id == 6 && this.aniEn.currStates[i].time>0.8) || 
                        (this.aniEn.currStates[i].id == 7)) && 
                         this.speed == 0 && this.aniEn.currStates[i].wMode == 0) {
                this.speed = 1.5 * (this.skele.scalex/Math.abs(this.skele.scalex));
                
                find = true;
                
                if (this.y>-0.5) {
                    this.py = -2.5;
                }
            } else if (this.aniEn.currStates[i].id == 6 || this.aniEn.currStates[i].id == 7 || this.aniEn.currStates[i].id == 8) {
                find = true;
            }
        }

        this.x += 0.02*this.speed;

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
        
        //var cx = ((posArr[0]-this.lastOff[0])/320)*this.skele.scalex/2;
        //var cy = ((posArr[1]-this.lastOff[1])/320)*this.skele.scaley/2;
        
        this.x += (posArr[0]/380)*this.skele.scalex/2;
        //this.y += (posArr[1]/380)*this.skele.scaley/2;
        
        this.lastOff = fr[0];
        
        this.skele.x2 = 0;//posArr[0]*this.skele.scalex/2;
        this.skele.y2 = 0;//posArr[1]*this.skele.scaley/2;
        this.skele.rot = posArr[2];
        this.skele.rotu = posArr[2];
        this.skele.roti = posArr[2];
        this.skele.scaley = mscale;

        if (Math.round(this.iframes/4)%5>3 && this.iframes>0) {
            this.skele.x2+=1000;
        }
        
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
        
        this.tar_y = (this.skele.maxy/300)/this.skele.scaley;
        
        if (this.y>-this.tar_y) {
            this.y = 0.0001-this.tar_y;
            this.py = 0;
        }

        if (this.py != undefined) {
            this.y += 0.02*this.py;
            this.py += 0.2;
        }
    }
    
    function draw() {
        this.skele.draw();
    }
    
    this.update = update;
    this.draw = draw;
    this.init = init;
    this.hit = hit;
    
    this.init();
}
