function findBlend(arr, curr, len, bns) {
    var retArr = [];

    while (arr[Math.ceil(curr)].length<len) arr[Math.ceil(curr)].push(undefined);
    
    for (var i=0; i<arr[Math.ceil(curr)].length; i++) {
        var s=Math.floor(curr), e=Math.ceil(curr);
        
        while (s>=0 && arr[s][i] == undefined) s--;
        while (e<arr.length && arr[e][i] == undefined) e++;
        
        if (s==-1 || e==arr.length) {
            if (s!=-1) retArr.push(arr[s][i]);
            else if (e!=arr.length) retArr.push(arr[e][i]);
            else retArr.push(bns[i].roto);
        } else {
            var d = arr[s][i]-arr[e][i];
            
            while (d>180) d-=360;
            while (d<-180) d+=360;
            
            var m = d/(s-e);
            
            if (isNaN(m)) m=0;
            
            retArr.push(arr[s][i]+(m*(curr-s)));
        }
    }
    
    return retArr;
}

function findBlend2(arr, curr, len, len2, bns) {
    var retArr = [];

    while (arr[Math.ceil(curr)].length<len) arr[Math.ceil(curr)].push(undefined);
    
    for (var i=0; i<arr[Math.ceil(curr)].length; i++) {
        var pArr = [];
    
        for (var j=0; j<len2; j++) {
            var s=Math.floor(curr), e=Math.ceil(curr);
            
            while (s>=0 && arr[s][i][j] == undefined) s--;
            while (e<arr.length && arr[e][i][j] == undefined) e++;
            
            if (s==-1 || e==arr.length) {
                if (s!=-1) pArr.push(arr[s][i][j]);
                else if (e!=arr.length) pArr.push(arr[e][i][j]);
                else if (j==0) pArr.push(bns[i].roto); 
                else pArr.push(1);
            } else {
                var d = arr[s][i][j]-arr[e][i][j];
                
                while (d>180) d-=360;
                while (d<-180) d+=360;
                
                var m = d/(s-e);
                
                if (isNaN(m)) m=0;
                
                pArr.push(arr[s][i][j]+(m*(curr-s)));
            }
        }
        
        retArr.push(pArr);
    }
    
    return retArr;
}

function MixFrames(arra, arrb, amt) {
    var retArr = [];
    
    for (var i=0; i<arra.length; i++) {
        if (Array.isArray(arra[i])) {
            var pushArr = [];
        
            for (var j=0; j<arra[i].length; j++) {
                while ((arra[i][j]-arrb[i][j])>180) arra[i][j] -= 360;
                while ((arrb[i][j]-arra[i][j])>180) arrb[i][j] -= 360;
            
                pushArr.push((arra[i][j]*amt) + (arrb[i][j]*(1-amt)));
            }
            
            retArr.push(pushArr);
        } else {
            retArr.push((arra[i]*amt) + (arrb[i]*(1-amt)));
        }
    }
    
    return retArr
}

function Player(x, y, z, PBones, PPoints, PPolys, animations) {
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
        if ((AKey || DKey) && !(AKey && DKey)) {
            if (AKey) {
                this.speed -= 0.1;
                if (this.speed<-1) this.speed = -1;
            } else {
                this.speed += 0.1;
                if (this.speed>1) this.speed = 1;
            }
            
            if (this.speed<0) this.skele.scalex = -1; else this.skele.scalex = 1;
        } else {
            if (Math.abs(this.speed)<0.05) this.speed = 0;
            else if (this.speed>0) this.speed = this.speed - 0.05; 
            else this.speed = this.speed + 0.05;
        }
        
        this.x += 0.03*this.speed;
        
        this.playerPt.x = this.x;
        this.playerPt.y = this.y;
        this.playerPt.z = this.z;
        
        this.playerPt.update();
        
        while (this.playerPt.sx<200) {
            scrollx+=0.01;
            this.playerPt.update();
        }
        
        while (this.playerPt.sx>600) {
            scrollx-=0.01;
            this.playerPt.update();
        }
        
        var posArra = findBlend(this.anim[0][0],this.frame,3,this.skele.bones);
        var posArrb = findBlend(this.anim[1][0],0.5,3,this.skele.bones);
        var posArr = MixFrames(posArra,posArrb,Math.abs(this.speed));
        
        this.sx = this.playerPt.sx;
        this.sy = this.playerPt.sy;
        
        this.skele.x2 = this.sx; //posArr[0];
        this.skele.y2 = this.sy; //posArr[1];
        this.skele.rot = posArr[2];
        this.skele.rotu = posArr[2];
        this.skele.roti = posArr[2];
        
        var barra = findBlend2(this.anim[0][1],this.frame,this.skele.bones.length,2,this.skele.bones);
        var barrb = findBlend2(this.anim[1][1],0.5,this.skele.bones.length,2,this.skele.bones);
        var barr = MixFrames(barra,barrb,Math.abs(this.speed));
        
        this.skele.frames = barr;

        this.frame+=0.8;
    
        if (this.frame>=(this.anim[0][0].length-1)) {
            this.frame=0;
        }
        
        if (this.frame<0) {
            this.frame=(this.anim[0][0].length-1);
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
