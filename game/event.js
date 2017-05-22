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
    
    function update() {
        if (Keys[65]) return true; else return false;
    }
    
    this.update = update;
}

function AKeyUpEvent() {
    this.name = "onAKeyUp";
    
    function update() {
        if (!Keys[65] && Keysp[65]) return true; else return false;
    }
    
    this.update = update;
}

function DKeyDownEvent() {
    this.name = "onDKeyDown";
    
    function update() {
        if (Keys[68]) return true; else return false;
    }
    
    this.update = update;
}

function DKeyUpEvent() {
    this.name = "onDKeyUp";
    
    function update() {
        if (!Keys[68] && Keysp[68]) return true; else return false;
    }
    
    this.update = update;
}

function SpaceKeyDownEvent() {
    this.name = "onSpaceKeyDown";
    
    function update() {
        if (Keys[32] && !Keysp[32]) return true; else return false;
    }
    
    this.update = update;
}

function SpaceKeyUpEvent() {
    this.name = "onSpaceKeyUp";
    
    function update() {
        if (!Keys[32]) return true; else return false;
    }
    
    this.update = update;
}

function CtrlKeyDownEvent() {
    this.name = "onCtrlKeyDown";
    
    function update() {
        if (Keys[17] && !Keysp[17]) return true; else return false;
    }
    
    this.update = update;
}

function CtrlKeyUpEvent() {
    this.name = "onCtrlKeyUp";
    
    function update() {
        if (!Keys[17]) return true; else return false;
    }
    
    this.update = update;
}

function ShiftKeyDownEvent() {
    this.name = "onShiftKeyDown";
    
    function update() {
        if (Keys[16] && !Keysp[16]) return true; else return false;
    }
    
    this.update = update;
}

function ShiftKeyUpEvent() {
    this.name = "onShiftKeyUp";
    
    function update() {
        if (!Keys[16]) return true; else return false;
    }
    
    this.update = update;
}

function AniEndEvent() {
    this.name = "onAniEnd";
    
    function update(obj) {
        if (obj.time>1) return true; else return false;
    }
    
    this.update = update;
}
