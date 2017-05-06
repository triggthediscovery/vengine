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
    }
    
    function update() {    
        this.x1 = (this.offsetp1x*this.parent_a.parx) + (this.offsetp1y*this.parent_a.perx) + this.parent_a.x1;
        this.y1 = (this.offsetp1x*this.parent_a.pary) + (this.offsetp1y*this.parent_a.pery) + this.parent_a.y1; 
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
        retStr += this.parent_a_weight;
        retStr += ']';
        
        return retStr;
    }
    
    this.initalize = initalize;
    this.update = update;
    this.draw = draw;
    this.show = show;
    this.write = write;
    
    this.initalize();
}
