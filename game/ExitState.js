function updateNode(exit, onode, states, currStates) {
        var found = -1;
    
        for (var i=0; i<currStates.length; i++) {
            if (currStates[i].id == states[exit.nextAni].id) found = i;
        }
    
        if (found==-1) {
            currStates.push(copy(states[exit.nextAni]));
            currStates[currStates.length-1].init();
                        
            currStates[currStates.length-1].weight = onode.weight;
            currStates[currStates.length-1].owner = onode.owner;
            if (exit.nextMode != -1) 
                onode.wMode = exit.nextMode;
            if (exit.nextAniMode != -1) 
                currStates[currStates.length-1].wMode = exit.nextAniMode;
            else
                currStates[currStates.length-1].wMode = onode.wMode;
            if (exit.enterTime != -1) currStates[currStates.length-1].time = exit.enterTime;
        } else {
            currStates[found].weight = onode.weight;
            currStates[found].owner = onode.owner;
            if (exit.nextMode != -1) 
                onode.wMode = exit.nextMode;
            if (exit.nextAniMode != -1) 
                currStates[found].wMode = exit.nextAniMode;
            else
                currStates[found].wMode = onode.wMode;
            if (exit.enterTime != -1) currStates[found].time = exit.enterTime;
        }
    }

function ExitState(id, nextAni, nextMode, nextAniMode, enterTime) {
    this.id = id;
    this.nextAni = nextAni;
    this.nextMode = nextMode;
    this.nextAniMode = nextAniMode;
    this.enterTime = enterTime;
    this.parent = undefined;
    
    function trigger() {
        var aEn = this.parent.owner.aniEn;
    
        updateNode(this, this.parent, aEn.states, aEn.currStates);
    }
    
    this.trigger = trigger;
}
