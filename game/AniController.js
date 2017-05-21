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
    this.currStates = [states[start]];
    this.currStates[0].owner = owner;
    this.exit = exit;
    this.owner = owner;
    this.weight = 1;
    
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
        
        return retArr;
    }
    
    function updateNode(exit, onode, states, currStates) {
        var found = -1;
    
        for (var i=0; i<currStates.length; i++) {
            if (currStates[i].id == states[exit.nextAni].id) found = i;
        }
    
        if (found==-1) {
            currStates.push(copy(states[exit.nextAni]));
                        
            currStates[currStates.length-1].weight = onode.weight;
            currStates[currStates.length-1].owner = onode.owner;
            if (exit.nextMode != -1) 
                onode.wMode = exit.nextMode;
            if (exit.nextAniMode != -1) 
                currStates[currStates.length-1].wMode = exit.nextAniMode;
            else
                currStates[currStates.length-1].wMode = onode.wMode;
            //currStates[currStates.length-1].update(false);
        } else {
            currStates[found].weight = onode.weight;
            currStates[found].owner = onode.owner;
            if (exit.nextMode != -1) 
                onode.wMode = exit.nextMode;
            if (exit.nextAniMode != -1) 
                currStates[found].wMode = exit.nextAniMode;
            else
                currStates[found].wMode = onode.wMode;
            currStates[found].time = 0;
            //currStates[found].update(false);
        }
    }
    
    function update() {
        for (var i=0; i<this.currStates.length; i++) {
            var cState = this.currStates[i]; 
        
            cState.update(true);
            
            for (var j=0; j<cState.exit.length; j++) {
                if (cState.exit[j].id==0) {
                    if (cState.time>1) {
                        updateNode(cState.exit[j], cState, this.states, this.currStates);
                    }
                } else if (cState.exit[j].id==1) {
                    if (AKey && !AKeyp) {
                        updateNode(cState.exit[j], cState, this.states, this.currStates);
                    }
                } else if (cState.exit[j].id==2) {
                    if (DKey && !DKeyp) {
                        updateNode(cState.exit[j], cState, this.states, this.currStates);
                    }
                } else if (cState.exit[j].id==3) {
                    if (!AKey && AKeyp) {
                        updateNode(cState.exit[j], cState, this.states, this.currStates);
                    }
                } else if (cState.exit[j].id==4) {
                    if (!DKey && DKeyp) {
                        updateNode(cState.exit[j], cState, this.states, this.currStates);
                    }
                }
            }
            
            if (cState.time>1 || cState.weight==0) {
                this.currStates.splice(i,1);
                
                j--;
            }
        }
    } 
    
    this.getAni = getAni;
    this.update = update;
}
