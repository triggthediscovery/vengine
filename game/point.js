function dist(x1, y1, x2, y2) {
    return Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)));
}

function ldist(x1, y1, x2, y2, xo, yo) {
    if (x1==x2) {
        return new sPoint(yo-y1,xo-x1);
    }
    if (y1==y2) { 
        return new sPoint(xo-x1,yo-y1);
    }
    
    var m = (y1-y2)/(x1-x2);
    var b = y1-(m*x1);
    
    var m2 = -1/m;
    var b2 = yo-(m2*xo);
    
    var intx = (b-b2)/(m2-m);
    var inty = (m2*intx)+b2;
    
    var a = dist(intx,inty,xo,yo);
    var b = dist(intx,inty,x1,y1);
    
    if (xo>intx) a = -a;
    if (x1>intx) b = -b;
    
    if (x1<x2) b=-b;
    
    if (y1>y2) a=-a;
    
    return new sPoint(-b,a);
}

function sPoint(x, y) {
    this.x = x;
    this.y = y;
}

function Point(x, y, parent_a, parent_a_weight, parent_b, parent_b_weight) {
    this.x = x;
    this.y = y;
    this.parent_a = parent_a;
    this.parent_a_weight = parent_a_weight;
    this.parent_b = parent_b;
    this.parent_b_weight = parent_b_weight;
    this.x1 = x;
    this.y1 = y;

    function initalize() {
        if (typeof this.parent_a != 'object') {
            this.parent_a = bns[this.parent_a];
        }
    
        var b = ldist(this.parent_a.ox1,this.parent_a.oy1,
                      this.parent_a.ox2,this.parent_a.oy2,
                      this.x,this.y);
    
        this.offsetp1x = b.x;
        this.offsetp1y = -b.y;
        
        if (this.parent_b != null) {
            var b = ldist(this.parent_b.ox1,this.parent_b.oy1,
                          this.parent_b.ox2,this.parent_b.oy2,
                          this.x,this.y);
        
            this.offsetp2x = b.x;
            this.offsetp2y = -b.y;
        }
    }
    
    function update() {    
        if (this.parent_b != null) {
            var xx1 = (this.offsetp1x*this.parent_a.parx) + (this.offsetp1y*this.parent_a.perx) + this.parent_a.x1;
            var yy1 = (this.offsetp1x*this.parent_a.pary) + (this.offsetp1y*this.parent_a.pery) + this.parent_a.y1; 
        
            var xx2 = (this.offsetp2x*this.parent_b.parx) + (this.offsetp2y*this.parent_b.perx) + this.parent_b.x1;
            var yy2 = (this.offsetp2x*this.parent_b.pary) + (this.offsetp2y*this.parent_b.pery) + this.parent_b.y1; 
            
            this.x1 = (xx1+xx2)/2;
            this.y1 = (yy1+yy2)/2;
        } else {
            this.x1 = (this.offsetp1x*this.parent_a.parx) + (this.offsetp1y*this.parent_a.perx) + this.parent_a.x1;
            this.y1 = (this.offsetp1x*this.parent_a.pary) + (this.offsetp1y*this.parent_a.pery) + this.parent_a.y1;
        }
    }
    
    function draw() {
        if (this!=pts[pointSel]) {
            context.fillStyle = "blue";
        } else {
            context.fillStyle = "green";
        }
        context.beginPath();

        context.moveTo(this.x1+2,this.y1);
        context.lineTo(this.x1,this.y1+2);
        context.lineTo(this.x1-2,this.y1);
        context.lineTo(this.x1,this.y1-2);
        context.lineTo(this.x1+2,this.y1);

        context.closePath();
        context.fill();
    }
    
    function show() {
        if (this!=pts[pointSel]) {
            context.fillStyle = "blue";
        } else {
            context.fillStyle = "green";
        }
        context.beginPath();

        context.moveTo(this.x+2+600,this.y+225);
        context.lineTo(this.x+600,this.y+2+225);
        context.lineTo(this.x-2+600,this.y+225);
        context.lineTo(this.x+600,this.y-2+225);
        context.lineTo(this.x+2+600,this.y+225);

        context.closePath();
        context.fill();
    }
        
    function write() {
        var retStr = '[';

        retStr += this.x;
        retStr += ', ';
        retStr += this.y;
        retStr += ', ';
        retStr += this.parent_a.ID;
        retStr += ', ';
        if (this.parent_b != null) retStr += this.parent_b.ID; else retStr += 'null';
        retStr += ']';
        
        return retStr;
    }
    
    this.initalize = initalize;
    this.update = update;
    this.draw = draw;
    this.show = show;
    this.write = write;
}
