function findBlend(arr, curr, len) {
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

function findBlend2(arr, curr, len, len2) {
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
                else {
                    if (j==0) pArr.push(bns[i].roto); else pArr.push(1);
                }
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

function Skeleton(x, y, scalex, scaley, rot, poss, frames) {
    this.bones = [];
    this.points = [];
    this.polys = [];
    this.frames = frames;
    this.poss = poss;
    this.x = x;
    this.y = y;
    this.x2 = x;
    this.y2 = y;
    this.scalex = scalex;
    this.scaley = scaley;
    this.rot = rot;
    this.rotu = rot;
    this.roti = rot;
    this.frame = 0;
    this.speed = 0.07;

    function update() {
        var posArr = findBlend(this.poss,this.frame,3);
        
        this.x2 = posArr[0]+this.x;
        this.y2 = posArr[1]+this.y;
        this.rot = posArr[2];
        this.rotu = posArr[2];
        this.roti = posArr[2];
    
        var barr = findBlend2(this.frames,this.frame,bns.length,2);
    
        for (var i = 0; i < this.bones.length; i++) {
            this.bones[i].roti = barr[i][0];
            this.bones[i].scale_length = barr[i][1];
            this.bones[i].update();
        }
        
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].update();
        }
    }
    
    function draw() {
        for (var i = 0; i < this.polys.length; i++) {
            this.polys[i].draw();
        }
    
        for (var i = 0; i < this.bones.length; i++) {
            this.bones[i].draw();
        }  
    }
    
    function show() {
        for (var i = 0; i < this.polys.length; i++) {
            this.polys[i].show();
        }
    
        for (var i = 0; i < this.bones.length; i++) {
            this.bones[i].show();
        }  
              
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].show();
        }
        
        
    }
    
    function write() {
        var retStr = '[';

        retStr += '[';
        for (var i=0; i<this.poss.length;i++) {
            retStr += '[';
            for (var j=0; j<3;j++) {
                retStr += this.poss[i][j];

                if (j != 2) retStr += ', '; 
            }
            retStr += ']';
            if (i != this.poss.length-1) retStr += ', '; 
        }
        retStr += ']';
        
        retStr += ', [';
        for (var i=0; i<this.frames.length;i++) {
            retStr += '[';
            for (var j=0; j<this.bones.length;j++) {
                retStr += '[';
                retStr += this.frames[i][j][0];
                retStr += ', ';
                retStr += this.frames[i][j][1];
                retStr += ']';
                                
                if (j != this.bones.length-1) retStr += ', '; 
            }
            retStr += ']';
            if (i != this.frames.length-1) retStr += ', '; 
        }
        retStr += ']]';
        
        return retStr;
    }
    
    this.update = update;
    this.draw = draw;
    this.show = show;
    this.write = write;
}

