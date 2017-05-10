function Skeleton(x, y, scale, rot, frames) {
    this.bones = [];
    this.points = [];
    this.polys = [];
    this.frames = frames;
    this.x2 = x;
    this.y2 = y;
    this.scale = scale;
    this.rot = rot;
    this.frame = 0;
    
    function findBlend(arr, curr) {
        var retArr = [];
        
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
            
            //retArr.push(bns[i].roto);
        }
        
        return retArr;
    }
    
    function update() {
        var barr = findBlend(this.frames,this.frame);
    
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

        retStr += this.x2;
        retStr += ', ';
        retStr += this.y2;
        retStr += ', ';
        retStr += this.scale;
        retStr += ', ';
        retStr += this.rot;
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

