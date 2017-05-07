function Bone(parent, ID, length, scale_front, scale_back, scale_length, roti) {
    this.parent = parent;
    this.ID = ID;
    this.length = length;
    this.scale_front = scale_front;
    this.scale_back = scale_back;
    this.scale_length = scale_length;
    this.roti = roti; 
    this.roto = roti;
    this.help = -1;
    this.rot = 0;
    this.rotu = 0;

    function initalize() {
        if (typeof this.parent != 'object') {
            this.parent = bns[this.parent];
        }
    
        if (this.parent.help==-1) {
            this.ox1 = this.parent.ox2; 
            this.oy1 = this.parent.oy2;
            this.rotu = this.roto + this.parent.rotu;
        } else {
            this.ox1 = 0; 
            this.oy1 = 0;
            this.rotu = this.roto;
        }
        this.ox2 = (Math.cos(this.rotu/57.29577)*this.length*this.scale_length)+this.ox1; 
        this.oy2 = (Math.sin(this.rotu/57.29577)*this.length*this.scale_length)+this.oy1;
    }

    function update() {
        if (this.parent==null) {
            this.x1 = 400;
            this.y1 = 225;
            this.rot = this.roti;
        } else {
            this.x1 = this.parent.x2;
            this.y1 = this.parent.y2;
            this.rot = this.roti+this.parent.rot;
        }

        this.parx = Math.cos(this.rot/57.29577);
        this.pary = Math.sin(this.rot/57.29577); 
        this.perx = Math.sin(this.rot/57.29577); 
        this.pery = -Math.cos(this.rot/57.29577);
        
        this.x2 = (Math.cos(this.rot/57.29577)*this.length*this.scale_length)+this.x1; 
        this.y2 = (Math.sin(this.rot/57.29577)*this.length*this.scale_length)+this.y1;
    }
    
    function draw() {
        if (this!=bns[boneSel]) {
            context.strokeStyle = "grey";
        } else {
            context.strokeStyle = "green";
        }
        context.beginPath();
        
        context.moveTo(this.x1,this.y1);
        context.lineTo(this.x2,this.y2);
        
        context.closePath();
        context.stroke();
    }
    
    function show() {
        if (this!=bns[boneSel]) {
            context.strokeStyle = "grey";
        } else {
            context.strokeStyle = "green";
        }
        context.beginPath();
        
        context.moveTo(this.ox1+600,this.oy1+225);
        context.lineTo(this.ox2+600,this.oy2+225);
        
        context.closePath();
        context.stroke();
    }
    
    function write() {
        var retStr = '[';

        retStr += this.parent.ID;
        retStr += ', ';
        retStr += this.length;
        retStr += ', ';
        retStr += this.roto;
        retStr += ']';
        
        return retStr;
    }
    
    this.initalize = initalize;
    this.update = update;
    this.draw = draw;
    this.show = show;
    this.write = write;
}
