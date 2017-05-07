var WKey=false, SKey=false, AKey=false, DKey=false, EKey=false, QKey=false, ZKey=false, XKey=false,
        CKey=false, RKey=false, FKey=false, UKey=false, DoKey=false, LKey=false, RiKey=false, SpKey=false,
        VKey=false, BKey=false, DeKey = false,
        OneKey=false, TwoKey=false, ThreeKey=false, FourKey=false, FiveKey=false, SixKey=false, SevenKey=false, EightKey=false, NineKey=false;
var WKeyp, SKeyp, AKeyp, DKeyp, EKeyp, QKeyp, ZKeyp, CKeyp, RiKeyp, FKeyp, UKeyp, DoKeyp, LKeyp, RKryp, SpKeyp, XKeyp,
        VKeyp, BKeyp, DeKeyp,
        LMouse=false, RMouse=false, LMousep=false, RMousep=false,
        OneKeyp, TwoKeyp, ThreeKeyp, FourKeyp, FiveKeyp, SixKeyp, SevenKeyp, EightKeyp, NineKeyp;
var mouse_x=0, mouse_y=0, mouse_xp=0, mouse_yp=0;
var scrollx=0, scrolly=0, cursor_x=4000, cursor_y=150;
var scrollx=0, scrolly=0;

var mode = 0;
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

function Input() {
    if (AKey && !AKeyp) {
	    mode++;
	    
	    if (mode>2) mode = 0;
	}
	
	if (EKey && !EKeyp) {
	    if (mode==0) {
	        var bdist = dist(mouse_x-600,mouse_y-225,bns[boneSel].ox2,bns[boneSel].oy2);
	        var brot = Math.round(Math.atan((mouse_y-bns[boneSel].oy2-225)/(mouse_x-bns[boneSel].ox2-600))*57.29577)-bns[boneSel].rot+180;
	        
	        if ((mouse_x-bns[boneSel].ox2-600)>0) {
		        brot+=180;
	        }

	        bns.push(new Bone(bns[boneSel], bns.length, bdist, 1, 1, 1, brot));
	    } else if (mode==1) {
	        pts.push(new Point(mouse_x-600, mouse_y-225,bns[boneSel],1,null,0));
	    } else if (mode==2) {
	        var found=false;
	        
	        for (var i=0; i<pls.length; i++) {
	            if (pls[i].p1 == null || pls[i].p2 == null || pls[i].p3 == null) {
	                polySel = i;
	                i = pls.length;
	                found = true;
	            }
	        }
	    
	        if (!found) {
	            pls.push(new Poly(null,null,null,"#FFFFFF"));
	            polySel = pls.length-1;
	        }
	    }
	}
	
	if (DeKey && !DeKeyp) {
	    if (mode == 0) {
	        bns.splice(boneSel,1);
	    } else if (mode == 1) {
	        pts.splice(pointSel,1);
	    } else if (mode == 2) {
	        pls.splice(polySel,1);
	    }
	}
	
	if (RKey && !RKeyp) {
	    pts[pointSel].parent_a = bns[boneSel];
	}
	
	var tde = 100;
	var psel = -1;
	
	for (var i=0; i<pts.length; i++) {
        dde=Math.abs(mouse_x-pts[i].x-600)+Math.abs(mouse_y-pts[i].y-225);

        if (dde<tde) {
	        bd=i;
	        tde=dde;
        }
    }

    if (tde<32) {		
	    psel = bd;
    }
    
    if (psel!=-1 && mode==2) {
        if (OneKey && !OneKeyp) {
            pls[polySel].p1 = pts[psel];
        }
        if (TwoKey && !TwoKeyp) {
            pls[polySel].p2 = pts[psel];
        }
        if (ThreeKey && !ThreeKeyp) {
            pls[polySel].p3 = pts[psel];
        }
    }
    
    if (mode==2) {
        if (FourKey && !FourKeyp) {
            pls[polySel].color = changeCol(pls[polySel].color,-8,0,0);
        }
        if (SevenKey && !SevenKeyp) {
            pls[polySel].color = changeCol(pls[polySel].color,8,0,0);
        }
        if (FiveKey && !FiveKeyp) {
            pls[polySel].color = changeCol(pls[polySel].color,0,-8,0);
        }
        if (EightKey && !EightKeyp) {
            pls[polySel].color = changeCol(pls[polySel].color,0,8,0);
        }
        if (SixKey && !SixKeyp) {
            pls[polySel].color = changeCol(pls[polySel].color,0,0,-8);
        }
        if (NineKey && !NineKeyp) {
            pls[polySel].color = changeCol(pls[polySel].color,0,0,8);
        }
        
        if (VKey && !VKeyp) {
	        pls[polySel].color = colBuf;
	    }
	
	    if (CKey && !CKeyp) {
	        colBuf = pls[polySel].color;
	    }
	    
	    if (SKey && !SKeyp) {
	        polySel++;
	        
	        if (polySel>(pls.length-1)) polySel = 0;
	    }
    }
    
    for (var i=0; i<bns.length; i++) {
	    bns[i].initalize();
	}

    skele.show();
	
	if (LMouse) {
	    if (mode == 0) {
	        animation_Config();
	    } else if (mode == 1) {
	        point_Config();
	    } else if (mode == 2) {
	        polySel = -1;
	    
	        for (var i = 0; i < pls.length; i++) {
                if (pls[i].selected()) polySel=i;
            }
	    }
	    
	    selected = true;
	} else {
	    selected = false;
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
