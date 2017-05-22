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
new AKeyDownEvent(),
new AKeyUpEvent(),
new DKeyDownEvent(),
new DKeyUpEvent(),
new JKeyDownEvent(),
new JKeyUpEvent(),
new KKeyDownEvent(),
new KKeyUpEvent(),
new LKeyDownEvent(),
new LKeyUpEvent(),
new SpaceKeyDownEvent(),
new SpaceKeyUpEvent(),
new CtrlKeyDownEvent(),
new CtrlKeyUpEvent(),
new ShiftKeyDownEvent(),
new ShiftKeyUpEvent(),
new AniEndEvent()
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
*/

function AKeyDownEvent() {
    this.name = "onAKeyDown";
    
    function update(obj) {
        if (obj.owner.Keys[65]) return true; else return false;
    }
    
    this.update = update;
}

function AKeyUpEvent() {
    this.name = "onAKeyUp";
    
    function update(obj) {
        if (!obj.owner.Keys[65] && obj.owner.Keysp[65]) return true; else return false;
    }
    
    this.update = update;
}

function DKeyDownEvent() {
    this.name = "onDKeyDown";
    
    function update(obj) {
        if (obj.owner.Keys[68]) return true; else return false;
    }
    
    this.update = update;
}

function DKeyUpEvent() {
    this.name = "onDKeyUp";
    
    function update(obj) {
        if (!obj.owner.Keys[68] && obj.owner.Keysp[68]) return true; else return false;
    }
    
    this.update = update;
}

///////

function JKeyDownEvent() {
    this.name = "onJKeyDown";
    
    function update(obj) {
        if (obj.owner.Keys[74]) return true; else return false;
    }
    
    this.update = update;
}

function JKeyUpEvent() {
    this.name = "onJKeyUp";
    
    function update(obj) {
        if (!obj.owner.Keys[74] && obj.owner.Keysp[74]) return true; else return false;
    }
    
    this.update = update;
}

function KKeyDownEvent() {
    this.name = "onKKeyDown";
    
    function update(obj) {
        if (obj.owner.Keys[75]) return true; else return false;
    }
    
    this.update = update;
}

function KKeyUpEvent() {
    this.name = "onKKeyUp";
    
    function update(obj) {
        if (!obj.owner.Keys[75] && obj.owner.Keysp[75]) return true; else return false;
    }
    
    this.update = update;
}

function LKeyDownEvent() {
    this.name = "onLKeyDown";
    
    function update(obj) {
        if (obj.owner.Keys[76]) return true; else return false;
    }
    
    this.update = update;
}

function LKeyUpEvent() {
    this.name = "onLKeyUp";
    
    function update(obj) {
        if (!obj.owner.Keys[76] && obj.owner.Keysp[76]) return true; else return false;
    }
    
    this.update = update;
}

function SpaceKeyDownEvent() {
    this.name = "onSpaceKeyDown";
    
    function update(obj) {
        if (obj.owner.Keys[32] && !obj.owner.Keysp[32]) return true; else return false;
    }
    
    this.update = update;
}

function SpaceKeyUpEvent() {
    this.name = "onSpaceKeyUp";
    
    function update(obj) {
        if (!obj.owner.Keys[32]) return true; else return false;
    }
    
    this.update = update;
}

function CtrlKeyDownEvent() {
    this.name = "onCtrlKeyDown";
    
    function update(obj) {
        if (obj.owner.Keys[17] && !obj.owner.Keysp[17]) return true; else return false;
    }
    
    this.update = update;
}

function CtrlKeyUpEvent() {
    this.name = "onCtrlKeyUp";
    
    function update(obj) {
        if (!obj.owner.Keys[17]) return true; else return false;
    }
    
    this.update = update;
}

function ShiftKeyDownEvent() {
    this.name = "onShiftKeyDown";
    
    function update(obj) {
        if (obj.owner.Keys[16] && !obj.owner.Keysp[16]) return true; else return false;
    }
    
    this.update = update;
}

function ShiftKeyUpEvent() {
    this.name = "onShiftKeyUp";
    
    function update(obj) {
        if (!obj.owner.Keys[16]) return true; else return false;
    }
    
    this.update = update;
}

function AniEndEvent() {
    this.name = "onAniEnd";
    
    function update(obj) {
        if (obj.time>obj.endTime) return true; else return false;
    }
    
    this.update = update;
}
