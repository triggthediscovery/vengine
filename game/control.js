var WKey=false, SKey=false, AKey=false, DKey=false, EKey=false, QKey=false, ZKey=false, XKey=false,
        CKey=false, RKey=false, FKey=false, UKey=false, DoKey=false, LKey=false, RiKey=false, SpKey=false,
        VKey=false, BKey=false, DeKey = false,
        OneKey=false, TwoKey=false, ThreeKey=false, FourKey=false, FiveKey=false, SixKey=false, SevenKey=false, EightKey=false, NineKey=false;
var WKeyp, SKeyp, AKeyp, DKeyp, EKeyp, QKeyp, ZKeyp, CKeyp, RiKeyp, FKeyp, UKeyp, DoKeyp, LKeyp, RKryp, SpKeyp, XKeyp,
        VKeyp, BKeyp, DeKeyp,
        LMouse=false, RMouse=false, LMousep=false, RMousep=false,
        OneKeyp, TwoKeyp, ThreeKeyp, FourKeyp, FiveKeyp, SixKeyp, SevenKeyp, EightKeyp, NineKeyp;
var mouse_x=0, mouse_y=0, mouse_xp=0, mouse_yp=0;
var scrollx=0, scrolly=400, cursor_x=4000, cursor_y=150;

var move = false;
var anim = true;
/*
LMouse - edit
AKey - change edit mode
EKey - add point
RKey - change parent

CKey - copy
VKey - paste
*/

var pointSel = -1;
var boneSel = -1;
var polySel = -1;
var selected = false;
var colBuf = "#000000";
var play = false;

function Input() {
    if (WKey) {
        scrolly-=20;
    }
    if (SKey) {
        scrolly+=20;
    }
    
    move = false;
    
    if (AKey) {
        skele.scalex = -1;
        scrollx+=20;
        move = true;
    }
    if (DKey) {
        skele.scalex = 1;
        scrollx-=20;
        move = true;
    }
}


function point_Config() {
    var tde = 64;

    if (selected && (pointSel != -1)) {
        pts[pointSel].x = mouse_x-600;
        pts[pointSel].y = mouse_y-225;
    } else {
        for (var i=0; i<pts.length; i++) {
            dde=Math.abs(mouse_x-pts[i].x-600)+Math.abs(mouse_y-pts[i].y-225);

	        if (dde<tde) {
		        bd=i;
		        tde=dde;
	        }
	    }

	    if (tde<32) {		
		    pointSel = bd;
	    } else {
	        pointSel=-1;
	    }
    }
}

function bone_Config() {
    var tde = 6400;

    if (selected && (boneSel != -1)) {
        var bdist = dist(mouse_x-600,mouse_y-225,bns[boneSel].ox1,bns[boneSel].oy1);
        var brot = Math.round(Math.atan((mouse_y-bns[boneSel].oy1-225)/(mouse_x-bns[boneSel].ox1-600))*57.29577)-bns[boneSel].parent.rotu+180;
        
        if ((mouse_x-bns[boneSel].ox1-600)>=0) {
	        brot+=180;
        }
        
        bns[boneSel].roto = brot;
        bns[boneSel].length = bdist;
    } else {
        for (var i=0; i<bns.length; i++) {
            dde=Math.abs(mouse_x-bns[i].ox2-600)+Math.abs(mouse_y-bns[i].oy2-225);

            if (dde<tde) {
	            bd=i;
	            tde=dde;
            }
        }

        if (tde<32) {
	        boneSel=bd;
	        
	        anim=false;
        } else {
            boneSel=-1;
        }
    }
}

function animation_Config() {
    var tde = 6400;

    if (selected && (boneSel != -1)) {
        skele.draw();
    
        var rn = bns[boneSel].parent.rot;
        
        bns[boneSel].roti = Math.round(Math.atan((mouse_y-bns[boneSel].y1)/(mouse_x-bns[boneSel].x1))*57.29577)-rn+180;
	
        if ((mouse_x-bns[boneSel].x1)>=0) {
	        bns[boneSel].roti+=180;
        }
        
        skele.frames[skele.frame][boneSel][0] = bns[boneSel].roti;
    } else {
        for (var i=0; i<bns.length; i++) {
            dde=Math.abs(mouse_x-bns[i].x2)+Math.abs(mouse_y-bns[i].y2);

	        if (dde<tde) {
		        bd=i;
		        tde=dde;
	        }
	    }

	    if (tde<32) {
		    boneSel=bd;
	    } else {
	        boneSel=-1;
	    }
    }
}



function KeyDown(event) {
    if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }
    
    var Pressedkey = String.fromCharCode(event.keyCode);

    if (Pressedkey == "W") {
        WKey = true;
    }
    if (Pressedkey == "S") {
        SKey = true;
    }
    if (Pressedkey == "A") {
        AKey = true;
        dir = true;
    }
    if (Pressedkey == "D") {
        DKey = true;
        dir = false;
    }
    if (Pressedkey == "E") {
        EKey = true;
    }
    if (Pressedkey == "Q") {
        QKey = true;
    }
    if (Pressedkey == "Z") {
        ZKey = true;
    }
    if (Pressedkey == "X") {
        XKey = true;
    }
    if (Pressedkey == "C") {
        CKey = true;
    }
    if (Pressedkey == "R") {
        RKey = true;
    }
    if (Pressedkey == "F") {
        FKey = true;
    }
    if (Pressedkey == "V") {
        VKey = true;
    }
    if (Pressedkey == "B") {
        BKey = true;
    }
    if (event.keyCode == "38") {
        UKey = true;
    }
    if (event.keyCode == "40") {
        DoKey = true;
    }
    if (event.keyCode == "37") {
        LKey = true;
    }
    if (event.keyCode == "39") {
        RiKey = true;
    }
    if (event.keyCode == "17") {
        SpKey = true;
    }
    if (event.keyCode == "46") {
        DeKey = true;
    }
    if (event.keyCode == "49") {
        OneKey = true;
    }
    if (event.keyCode == "50") {
        TwoKey = true;
    }
    if (event.keyCode == "51") {
        ThreeKey = true;
    }
    if (event.keyCode == "52") {
        FourKey = true;
    }
    if (event.keyCode == "53") {
        FiveKey = true;
    }
    if (event.keyCode == "54") {
        SixKey = true;
    }
    if (event.keyCode == "55") {
        SevenKey = true;
    }
    if (event.keyCode == "56") {
        EightKey = true;
    }
    if (event.keyCode == "57") {
        NineKey = true;
    }
}
function KeyUp(event) {
    var Pressedkey = String.fromCharCode(event.keyCode);

    if (Pressedkey == "W") {
        WKey = false;
    }
    if (Pressedkey == "S") {
        SKey = false;
    }
    if (Pressedkey == "A") {
        AKey = false;
    }
    if (Pressedkey == "D") {
        DKey = false;
    }
    if (Pressedkey == "E") {
        EKey = false;
    }
    if (Pressedkey == "Q") {
        QKey = false;
    }
    if (Pressedkey == "Z") {
        ZKey = false;
    }
    if (Pressedkey == "X") {
        XKey = false;
    }
    if (Pressedkey == "C") {
        CKey = false;
    }
    if (Pressedkey == "R") {
        RKey = false;
    }
    if (Pressedkey == "F") {
        FKey = false;
    }
    if (Pressedkey == "V") {
        VKey = false;
    }
    if (Pressedkey == "B") {
        BKey = false;
    }
    if (event.keyCode == "38") {
        UKey = false;
    }
    if (event.keyCode == "40") {
        DoKey = false;
    }
    if (event.keyCode == "37") {
        LKey = false;
    }
    if (event.keyCode == "39") {
        RiKey = false;
    }
    if (event.keyCode == "17") {
        SpKey = false;
    }
    if (event.keyCode == "46") {
        DeKey = false;
    }
    if (event.keyCode == "49") {
        OneKey = false;
    }
    if (event.keyCode == "50") {
        TwoKey = false;
    }
    if (event.keyCode == "51") {
        ThreeKey = false;
    }
    if (event.keyCode == "52") {
        FourKey = false;
    }
    if (event.keyCode == "53") {
        FiveKey = false;
    }
    if (event.keyCode == "54") {
        SixKey = false;
    }
    if (event.keyCode == "55") {
        SevenKey = false;
    }
    if (event.keyCode == "56") {
        EightKey = false;
    }
    if (event.keyCode == "57") {
        NineKey = false;
    }
}
function KeyPrev() {
    WKeyp = WKey;
    AKeyp = AKey;
    SKeyp = SKey;
    DKeyp = DKey;
    QKeyp = QKey;
    EKeyp = EKey;
    ZKeyp = ZKey;
    XKeyp = XKey;
    CKeyp = CKey;
    RKeyp = RKey;
    FKeyp = FKey;
    UKeyp = UKey;
    VKeyp = VKey;
    BKeyp = BKey;
    SpKeyp = SpKey;
    DeKeyp = DeKey;
    OneKeyp = OneKey;
    TwoKeyp = TwoKey;
    ThreeKeyp = ThreeKey;
    FourKeyp = FourKey;
    FiveKeyp = FiveKey;
    SixKeyp = SixKey;
    SevenKeyp = SevenKey;
    EightKeyp = EightKey;
    NineKeyp = NineKey;
}
function MouseMove(event) {
    mouse_x = event.clientX - 10;
    mouse_y = event.clientY - 10;
}
function MouseDown(event) {
    if (event.button == 0) {
        LMouse = true;
    }
    if (event.button == 2) {
        RMouse = true;
    }
}
function MouseUp(event) {
    if (event.button == 0) {
        LMouse = false;
    }
    if (event.button == 2) {
        RMouse = false;
    }
}
function MousePrev() {
    RMousep = RMouse;
    LMousep = LMouse;
    mouse_xp = mouse_x;
    mouse_yp = mouse_y;
}
function MouseWheelHandler(event) {
    
    if (pause==true) {return;}
    
    var olzoom = zoom;
    
    var dats=event.wheelDelta;
    
    dats=dats*zoom*2;

    zoom += (dats) / 2000;

    var fixx, fixy, ch;

    fixx = ((mouse_x + scrollx) / olzoom);
    fixy = ((mouse_y + scrolly) / olzoom);
    ch = Math.abs((dats) / 2000);

    if (event.wheelDelta > 0) {
        scrollx += fixx * ch;
    } else {
        scrollx -= fixx * ch;
    }
    if (event.wheelDelta > 0) {
        scrolly += fixy * ch;
    } else {
        scrolly -= fixy * ch;
    }

    return false;
}
