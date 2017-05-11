function findBlend(arr, curr, len) {
    var retArr = [];
    
    while (arr[curr].length<len) arr[curr].push(undefined);
    
    for (var i=0; i<arr[curr].length; i++) {
        
        if (arr[curr][i] != undefined) {
            retArr.push(arr[curr][i]);
        } else {
            var s=curr, e=curr;
            
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
                
                retArr.push(arr[s][i]+(m*(curr-s)));
            }
        }
    }
    
    return retArr;
}

function Skeleton(x, y, scale, rot, poss, frames) {
    this.bones = [];
    this.points = [];
    this.polys = [];
    this.frames = frames;
    this.poss = poss;
    this.x2 = x;
    this.y2 = y;
    this.scale = scale;
    this.rot = rot;
    this.rotu = rot;
    this.roti = rot;
    this.frame = 0;

    function update() {
        var posArr = findBlend(this.poss,this.frame,3);
        
        this.x2 = posArr[0]+x;
        this.y2 = posArr[1]+y;
        this.rot = posArr[2];
        this.rotu = posArr[2];
        this.roti = posArr[2];
    
        var barr = findBlend(this.frames,this.frame,bns.length);
    
        for (var i = 0; i < this.bones.length; i++) {
            this.bones[i].roti = barr[i];
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
                if (j>=3) {
                    retStr += 'null';
                } else {
                    retStr += this.poss[i][j];
                }
                
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
                if (j>=this.frames[i].length) {
                    retStr += 'null';
                } else {
                    retStr += this.frames[i][j];
                }
                
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

