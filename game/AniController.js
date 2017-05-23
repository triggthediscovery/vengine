function MixFrames(arra, arrb, amt) {
    var retArr = [];
    
    for (var i=0; i<arra.length; i++) {
        if (Array.isArray(arra[i])) {
            var pushArr = [];
        
            for (var j=0; j<arra[i].length; j++) {
                while ((arra[i][j]-arrb[i][j])>180) arra[i][j] -= 360;
                while ((arrb[i][j]-arra[i][j])>180) arrb[i][j] -= 360;
            
                pushArr.push((arra[i][j]*amt) + (arrb[i][j]*(1-amt)));
            }
            
            retArr.push(pushArr);
        } else {
            retArr.push((arra[i]*amt) + (arrb[i]*(1-amt)));
        }
    }
    
    return retArr
}

/*
Exit state ids:
0 = finish
1 = AKey press
2 = DKey press
3 = AKey release
4 = DKey release

Weight modes:
-1 = no change
0 = overwrite
1 = fade in/out
2 = fade out
*/

function copy(o) {
   var output, v, key;
   output = Array.isArray(o) ? [] : {};
   for (key in o) {
       v = o[key];
       output[key] = (typeof v === "object") ? copy(v) : v;
   }
   return output;
}

function AniController(states, start, exit, owner) {
    this.states = copy(states);
    this.currStates = [copy(states[start])];
    this.currStates[0].owner = owner;
    this.currStates[0].init();
    this.exit = exit;
    this.owner = owner;
    this.weight = 1;
    this.lastc = [];
    
    function getAni() {
        var retArr = [];

        this.currStates = this.currStates.sort(function compare(a, b) {
            return b.weight - a.weight;
        });
        
        retArr = this.currStates[0].getAni();
        
        for (var i=0; i<this.currStates.length; i++) {
            var cState = this.currStates[i]; 
        
            if (cState.weight > 0) {
                var ret = cState.getAni();
                
                if (cState.weight == 1) {
                    retArr = ret;
                } else {
                    var posArr = MixFrames(retArr[0],ret[0],1-cState.weight);
                    var rotArr = MixFrames(retArr[1],ret[1],1-cState.weight);
                    
                    retArr = [posArr,rotArr];
                }
            }
        }
        
        this.lastc = retArr;
        
        return retArr;
    }
    
    
    
    function update() {
        var len = this.currStates.length;
    
        for (var i=0; i<len; i++) {
            var cState = this.currStates[i]; 
        
            cState.update(true);
            
            for (var j=0; j<cState.exit.length; j++) {
                if (eventList.getEvent(cState.exit[j].id, cState) && (cState.weight!=0)) {
                    cState.exit[j].trigger();
                    cState.update(false);
                }
            }
            
            if (this.currStates.length == 3) {
                var why = 0;
            }
            
            if (eventList.getEvent("onAniEnd", cState) || cState.weight==0) {
                if (eventList.getEvent("onAniEnd", cState)) {
                    
                    cState.time=cState.endTime;
                    var reta = cState.getAni();
                    
                    cState.time=cState.startTime;
                    var retb = cState.getAni();
                    
                    var cx = (reta[0][0]/580)*cState.weight * (this.owner.skele.scalex/Math.abs(this.owner.skele.scalex));
                    this.owner.x += cx;

                    var cy = (reta[0][1]/580)*cState.weight * (this.owner.skele.scaley/Math.abs(this.owner.skele.scaley));
                    this.owner.y += cy;
                    
                }
                
                this.currStates.splice(i,1);
                
                len--;
                i--;
            }
        }
    } 
    
    this.getAni = getAni;
    this.update = update;
}
