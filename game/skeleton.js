function Skeleton(x, y, scalex, scaley, rot) {
    this.bones = [];
    this.points = [];
    this.polys = [];
    this.frames = [];
    this.x2 = x;
    this.y2 = y;
    this.scalex = scalex;
    this.scaley = scaley;
    this.rot = rot;
    this.rotu = rot;
    this.roti = rot;
    this.frame = 0;
    this.speed = 0.9;
    this.lit = -1;
    this.maxy = 0;

    function update() {
        for (var i = 0; i < this.frames.length; i++) {
            this.bones[i].roti = this.frames[i][0];
            this.bones[i].scale_length = this.frames[i][1];
            this.bones[i].update();
        }
        
        this.maxy = 0;
        
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].update();
            
            if (this.points[i].y1>this.maxy) this.maxy = this.points[i].y1; 
        }
    }
    
    function draw() {
        for (var i = 0; i < this.polys.length; i++) {
            this.polys[i].draw();
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

