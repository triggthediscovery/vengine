function Skeleton(x, y, scale, rot) {
    this.bones = [];
    this.points = [];
    this.polys = [];
    this.x2 = x;
    this.y2 = y;
    this.scale = scale;
    this.rot = rot;
    
    function update() {
        for (var i = 0; i < this.bones.length; i++) {
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
    
    this.update = update;
    this.draw = draw;
    this.show = show;
}

