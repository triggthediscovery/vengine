function AI(self, target) {
    this.self = self;
    this.target = target;
    
    function update() {
        var mstates = [];
        var tstates = [];
        
        var aEn = this.self.aniEn;
        
        for (var i=0; i<aEn.states.length; i++) {
            mstates.push(false);
        }
        
        for (var i=0; i<aEn.currStates.length; i++) {
            mstates[aEn.currStates.id] = true;
        }
        
        aEn = this.target.aniEn;
        
        for (var i=0; i<aEn.states.length; i++) {
            tstates.push(false);
        }
        
        for (var i=0; i<aEn.currStates.length; i++) {
            tstates[aEn.currStates.id] = true;
        }
        
        var c = Math.abs(this.self.x - this.target.x);
        
        if (c>1) {
            if (this.self.x > this.target.x) {
                this.self.Keys[65] = true;
                this.self.Keys[68] = false;
                this.self.Keysp[68] = false;
                this.self.Keysp[65] = false;
            } else {
                this.self.Keys[68] = true;
                this.self.Keys[65] = false;
                this.self.Keysp[68] = false;
                this.self.Keysp[65] = false;
            }
        }
        
        
        if (c<0.8) {
            this.self.Keys[68] = false;
            this.self.Keys[65] = false;
            this.self.Keysp[68] = true;
            this.self.Keysp[65] = true;
            
            if (c<0.6) {
                if (c<0.4) {
                    this.self.Keys[16] = true;
                    this.self.Keysp[16] = false;
                } else {
                    this.self.Keys[16] = false;
                    this.self.Keysp[16] = true;
                
                    this.self.Keys[74] = true;
                    this.self.Keysp[74] = false;
                }
            } else {
                this.self.Keys[74] = false;
                this.self.Keysp[74] = true;
                
                if (c<0.7) {
                    this.self.Keys[76] = true;
                    this.self.Keysp[76] = false;
                } else {
                    this.self.Keys[76] = false;
                    this.self.Keysp[76] = true;
                }
            }
        }
        
    }
    
    this.update = update;
}
