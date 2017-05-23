function findBlend(arr, curr, len, bns) {
    var retArr = [];

    while (arr[Math.ceil(curr)].length<len) arr[Math.ceil(curr)].push(undefined);
    
    for (var i=0; i<arr[Math.ceil(curr)].length; i++) {
        var s=Math.floor(curr), e=Math.ceil(curr);
        
        while (s>=0 && arr[s][i] == undefined) s--;
        while (e<arr.length && arr[e][i] == undefined) e++;
        
        if (s==-1 || e==arr.length) {
            if (s!=-1) retArr.push(arr[s][i]);
            else if (e!=arr.length) retArr.push(arr[e][i]);
            else retArr.push(bns[i].roto);
        } else {
            var d = arr[s][i]-arr[e][i];
            
            while (d>180) d-=360;
            while (d<-180) d+=360;
            
            var m = d/(s-e);
            
            if (isNaN(m)) m=0;
            
            retArr.push(arr[s][i]+(m*(curr-s)));
        }
    }
    
    return retArr;
}

function findBlend2(arr, curr, len, len2, bns) {
    var retArr = [];

    while (arr[Math.ceil(curr)].length<len) arr[Math.ceil(curr)].push(undefined);
    
    for (var i=0; i<arr[Math.ceil(curr)].length; i++) {
        var pArr = [];
    
        for (var j=0; j<len2; j++) {
            var s=Math.floor(curr), e=Math.ceil(curr);
            
            while (s>=0 && arr[s][i][j] == undefined) s--;
            while (e<arr.length && arr[e][i][j] == undefined) e++;
            
            if (s==-1 || e==arr.length) {
                if (s!=-1) pArr.push(arr[s][i][j]);
                else if (e!=arr.length) pArr.push(arr[e][i][j]);
                else if (j==0) pArr.push(bns[i].roto); 
                else pArr.push(1);
            } else {
                var d = arr[s][i][j]-arr[e][i][j];
                
                while (d>180) d-=360;
                while (d<-180) d+=360;
                
                var m = d/(s-e);
                
                if (isNaN(m)) m=0;
                
                pArr.push(arr[s][i][j]+(m*(curr-s)));
            }
        }
        
        retArr.push(pArr);
    }
    
    return retArr;
}

/*
Exit state ids:
0 = finish
1 = AKey
2 = DKey
*/

function AniNode(mAni, time, speed, end, exit, wMode, owner, id, startTime, endTime) {
    this.frames = mAni[1];
    this.poss = mAni[0];
    this.time = time;
    this.speed = speed;
    this.length = mAni[0].length;
    this.end = end;
    this.exit = exit;
    this.owner = owner;
    this.wMode = wMode;
    this.weight = 0;
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
    
    function init() {
        for (var i=0; i<exit.length; i++) {
            this.exit[i].parent = this;
        }
    }

    function getAni() {
        var posArr = findBlend(this.poss, this.time*(this.length-1), 3, this.owner.bns);
        var rotArr = findBlend2(this.frames, this.time*(this.length-1), this.owner.bns.length, 2, this.owner.bns);
        
        return [posArr,rotArr];
    }
    
    function update(move) {
        if (move) this.time += this.speed;
        
        if (this.wMode==0) {
            this.weight = 1;
        } else if (this.wMode==1) {
            this.weight = 1-(Math.abs(this.time-0.5)*2);
            
            if (this.weight<0) this.weight = 0;
        } else if (this.wMode==2) {
            this.weight = this.weight - 0.1;
            
            if (this.weight<0) this.weight = 0;
        }
    }
    
    this.getAni = getAni;
    this.update = update;
    this.init = init;
}
