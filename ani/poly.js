function Poly(p1, p2, p3, color) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.color = color;
    
    function draw() {
        if (this.p1 == null || this.p2 == null || this.p3 == null) return;

        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.beginPath();

        context.moveTo(this.p1.x1,this.p1.y1);
        context.lineTo(this.p2.x1,this.p2.y1);
        context.lineTo(this.p3.x1,this.p3.y1);
        context.lineTo(this.p1.x1,this.p1.y1);

        context.closePath();
        context.fill();
        context.stroke();
    }
    
    function show() {
        if (this.p1 == null || this.p2 == null || this.p3 == null) return;
        
        var scx = this.p1.parent_a.scalex;
        var scy = this.p1.parent_a.scaley;

        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.beginPath();

        context.moveTo(this.p1.x*scx+skele.x+400,this.p1.y*scy+skele.y);
        context.lineTo(this.p2.x*scx+skele.x+400,this.p2.y*scy+skele.y);
        context.lineTo(this.p3.x*scx+skele.x+400,this.p3.y*scy+skele.y);
        context.lineTo(this.p1.x*scx+skele.x+400,this.p1.y*scy+skele.y);

        context.closePath();
        context.fill();
        context.stroke();
    }
    
    function write() {
        var retStr = '[';

        retStr += findPt(this.p1);
        retStr += ', ';
        retStr += findPt(this.p2);
        retStr += ', ';
        retStr += findPt(this.p3);
        retStr += ', \'';
        retStr += this.color;
        retStr += '\']';
        
        return retStr;
    }
    
    function selected() {
        var a, b;
        
        a = ldist(this.p1.x,this.p1.y,this.p2.x,this.p2.y,mouse_x-600,mouse_y-225);
        b = ldist(this.p1.x,this.p1.y,this.p2.x,this.p2.y,this.p3.x,this.p3.y);
        
        if ((a.y/Math.abs(a.y)) != (b.y/Math.abs(b.y))) return false;
        
        a = ldist(this.p3.x,this.p3.y,this.p2.x,this.p2.y,mouse_x-600,mouse_y-225);
        b = ldist(this.p3.x,this.p3.y,this.p2.x,this.p2.y,this.p1.x,this.p1.y);
        
        if ((a.y/Math.abs(a.y)) != (b.y/Math.abs(b.y))) return false;
        
        a = ldist(this.p1.x,this.p1.y,this.p3.x,this.p3.y,mouse_x-600,mouse_y-225);
        b = ldist(this.p1.x,this.p1.y,this.p3.x,this.p3.y,this.p2.x,this.p2.y);
        
        if ((a.y/Math.abs(a.y)) != (b.y/Math.abs(b.y))) return false;
        
        return true;
    }
    
    this.draw = draw;
    this.write = write;
    this.selected = selected;
    this.show = show;
}
