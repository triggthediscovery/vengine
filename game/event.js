function DrawPt(x, y, col) {
    context.fillStyle = col;

    context.beginPath();

    context.moveTo(x+5,y);
    context.lineTo(x,y+2);
    context.lineTo(x-5,y);
    context.lineTo(x,y-5);
    context.lineTo(x+5,y);

    context.closePath();
    context.fill();
}

/*
the event system is going to be a little wierd, but stick with me

each event will have a custom update that will return true of false if the event is triggered
each event will also have a name, lik "onAKey" so you don't need to know indexes
an event's update function takes an object parameter, that way you can get a response based on who's asking, so you can have an 'onGround' event
*/

function Events(events) {
    this.events = events;

    function getEvent(name, obj) {
        for (var i=0; i<events.length; i++) {
            if (events[i].name == name) {
                return events[i].update(obj);
            }
        }
    }
    
    function setEvent(name, obj) {
        for (var i=0; i<events.length; i++) {
            if (events[i].name == name) {
                return events[i].set(obj);
            }
        }
    }
    
    this.getEvent = getEvent;
    this.setEvent = setEvent;
}

var eventList = new Events([
new Event(    "onAKeyDown",AKeyDownEvent),
new Event(      "onAKeyUp",AKeyUpEvent),
new Event(    "onDKeyDown",DKeyDownEvent),
new Event(      "onDKeyUp",DKeyUpEvent),
new Event(    "onJKeyDown",JKeyDownEvent),
new Event(      "onJKeyUp",JKeyUpEvent),
new Event(    "onKKeyDown",KKeyDownEvent),
new Event(      "onKKeyUp",KKeyUpEvent),
new Event(    "onLKeyDown",LKeyDownEvent),
new Event(      "onLKeyUp",LKeyUpEvent),
new Event("onSpaceKeyDown",SpaceKeyDownEvent),
new Event(  "onSpaceKeyUp",SpaceKeyUpEvent),
new Event( "onCtrlKeyDown",CtrlKeyDownEvent),
new Event(   "onCtrlKeyUp",CtrlKeyUpEvent),
new Event("onShiftKeyDown",ShiftKeyDownEvent),
new Event(  "onShiftKeyUp",ShiftKeyUpEvent),
new Event(      "onAniEnd",AniEndEvent),
new Event(      "onGround",OnGroundEvent),
new Event(   "aboveGround",AboveGroundEvent),
new Event(     "onHitHigh",HitHighEvent),
new Event(      "onHitMid",HitMidEvent),
new Event(        "onAway",AwayEvent),
new Event(      "onToward",TowardEvent),
new Event(     "onBlocked",BlockedEvent),
]);

/*
Events:
onAKeyDown
onAKeyUp
onDKeyDown
onDKeyUp
onJKeyDown
onJKeyUp
onKKeyDown
onKKeyUp
onLKeyDown
onLKeyUp
onSpaceKeyDown
onSpaceKeyUp
onCtrlKeyDown
onCtrlKeyUp
onShiftKeyDown
onShiftKeyUp
onAniEnd
onGround
aboveGround
onHitHigh
onHitMid
onAway
onToward
onBlocked
*/

function Event(name, func) {
    this.name = name;
    this.update = func;
}

function AKeyDownEvent(obj) {
    if (obj.owner.Keys[65]) return true; else return false;
}

function AKeyUpEvent(obj) {
    if (!obj.owner.Keys[65] && obj.owner.Keysp[65]) return true; else return false;
}

function DKeyDownEvent(obj) {
    if (obj.owner.Keys[68]) return true; else return false;
}

function DKeyUpEvent(obj) {
    if (!obj.owner.Keys[68] && obj.owner.Keysp[68]) return true; else return false;
}

function JKeyDownEvent(obj) {
    if (obj.owner.Keys[74]) return true; else return false;
}

function JKeyUpEvent(obj) {
    if (!obj.owner.Keys[74] && obj.owner.Keysp[74]) return true; else return false;
}

function KKeyDownEvent(obj) {
    if (obj.owner.Keys[75]) return true; else return false;
}

function KKeyUpEvent(obj) {
    if (!obj.owner.Keys[75] && obj.owner.Keysp[75]) return true; else return false;
}

function LKeyDownEvent(obj) {
    if (obj.owner.Keys[76]) return true; else return false;
}

function LKeyUpEvent(obj) {
    if (!obj.owner.Keys[76] && obj.owner.Keysp[76]) return true; else return false;
}

function SpaceKeyDownEvent(obj) {
    //if (obj.owner.Keys[32] && !obj.owner.Keysp[32]) return true; else return false;
    
    if (obj.owner.Keys[32] && !obj.owner.Keysp[32]) {
        if (obj.owner.Keys[65]) 
            obj.owner.skele.scalex =-Math.abs(obj.owner.skele.scalex);
        if (obj.owner.Keys[68]) 
            obj.owner.skele.scalex = Math.abs(obj.owner.skele.scalex);
            
        obj.owner.Keys[32] = true;
            
        obj.owner.turn = false;    
    
        return true; 
    } else {
        return false;
    }
}

function SpaceKeyUpEvent(obj) {
    if (!obj.owner.Keys[32]) return true; else return false;
}

function CtrlKeyDownEvent(obj) {
    if (obj.owner.Keys[17] && !obj.owner.Keysp[17]) return true; else return false;
}

function CtrlKeyUpEvent(obj) {
    if (!obj.owner.Keys[17]) return true; else return false;
}

function ShiftKeyDownEvent(obj) {
    if (obj.owner.Keys[16] && !obj.owner.Keysp[16]) {
        if (obj.owner.Keys[65]) 
            obj.owner.skele.scalex =-Math.abs(obj.owner.skele.scalex);
        if (obj.owner.Keys[68]) 
            obj.owner.skele.scalex = Math.abs(obj.owner.skele.scalex);
            
        obj.owner.Keys[16] = true;
            
        obj.owner.turn = false;    
    
        return true; 
    } else {
        return false;
    }
}

function ShiftKeyUpEvent(obj) {
    if (!obj.owner.Keys[16]) return true; else return false;
}

function AniEndEvent(obj) {
    if (obj.time>obj.endTime || obj.time<obj.startTime) return true; else return false;
}

function OnGroundEvent(obj) {
    if (obj.owner.y>-0.35) return true; else return false;
}

function AboveGroundEvent(obj) {
    if (obj.owner.y>-0.7 && obj.owner.py>0) return true; else return false;
}

function HitHighEvent(obj) {
    var hitx1 = obj.owner.enemy.pts[99].x1 + obj.owner.enemy.sx;
    var hity1 = obj.owner.enemy.pts[99].y1 + obj.owner.enemy.sy; 
    var hitx2 = obj.owner.enemy.pts[106].x1 + obj.owner.enemy.sx;
    var hity2 = obj.owner.enemy.pts[106].y1 + obj.owner.enemy.sy; 
    var sx = obj.owner.sx;
    var sy = obj.owner.sy+60; 

    var aEn = obj.owner.enemy.aniEn;
    var found = false;
    
    for (var i=0; i<aEn.currStates.length; i++) {
        if (aEn.currStates[i].id == 2 && aEn.currStates[i].time > 0.2 && aEn.currStates[i].time < 0.6) {
            found = true;
        }
    }
    
    var aEnb = obj.owner.aniEn;
    var foundb = false;
    
    for (var i=0; i<aEnb.currStates.length; i++) {
        if (aEnb.currStates[i].id == 5) {
            foundb = true;
        }
    }
    
    //DrawPt(hitx1,hity1, "green");
    //DrawPt(hitx2,hity2, "green");
    //DrawPt(sx,sy, "red");
    
    var sword_dist = ldist(hitx1,hity1,hitx2,hity2,sx,sy);

    if (sword_dist.x>0 && sword_dist.x<200 && Math.abs(sword_dist.y)<40 && found && obj.owner.iframes<0) {

        if (foundb) {
            obj.owner.enemy.blocked = true;
            return false;
        } else {
            obj.owner.hit(10);
            return true; 
        }
    } else {
        return false;
    }
}

function HitMidEvent(obj) {
    var hitx1 = obj.owner.enemy.pts[99].x1 + obj.owner.enemy.sx;
    var hity1 = obj.owner.enemy.pts[99].y1 + obj.owner.enemy.sy; 
    var hitx2 = obj.owner.enemy.pts[106].x1 + obj.owner.enemy.sx;
    var hity2 = obj.owner.enemy.pts[106].y1 + obj.owner.enemy.sy; 
    var sx = obj.owner.sx;
    var sy = obj.owner.sy+60; 

    var aEn = obj.owner.enemy.aniEn;
    var found = false;
    
    for (var i=0; i<aEn.currStates.length; i++) {
        if (aEn.currStates[i].id == 3) {
            found = true;
        }
    }
    
    //DrawPt(hitx1,hity1, "green");
    //DrawPt(hitx2,hity2, "green");
    //DrawPt(sx,sy, "red");
    
    var sword_dist = ldist(hitx1,hity1,hitx2,hity2,sx,sy);
    
    

    if (sword_dist.x>0 && sword_dist.x<50 && Math.abs(sword_dist.y)<40 && found && obj.owner.iframes<0) {
        obj.owner.hit(5);

        return true; 
    } else {
        return false;
    }
}

function AwayEvent(obj) {
    if ((obj.owner.Keys[65] && (obj.owner.x > obj.owner.enemy.x)) || (obj.owner.Keys[68] && (obj.owner.x < obj.owner.enemy.x))) return true; else return false;
}

function TowardEvent(obj) {
    if ((obj.owner.Keys[65] && (obj.owner.x < obj.owner.enemy.x)) || (obj.owner.Keys[68] && (obj.owner.x > obj.owner.enemy.x))) return true; else return false;
}

function BlockedEvent(obj) {
    if (obj.owner.blocked) {
        obj.owner.blocked = false;
        return true;
    } else {
        return false;
    }
}
