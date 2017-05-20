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
var play = false;

function Input() {
    if (ZKey && !ZKeyp) {
	    mode++;
	    
	    if (mode>3) mode = 0;
	}
	
	if (UKey) skele.y-=10;
	if (DoKey) skele.y+=10;
	if (LKey) skele.x-=10;
	if (RiKey) skele.x+=10;
	
	if (BKey) {
	    skele.scalex *= 1.1;
	    skele.scaley *= 1.1;
	}
	
	if (VKey) {
	    skele.scalex *= 0.9;
	    skele.scaley *= 0.9;
	}
	
	if (EKey && !EKeyp) {
	    if (mode==0) {
	        var bdist = dist(mouse_x-600,mouse_y-225,bns[boneSel].ox2,bns[boneSel].oy2);
	        var brot = Math.round(Math.atan((mouse_y-bns[boneSel].oy2-225)/(mouse_x-bns[boneSel].ox2-600))*57.29577)-bns[boneSel].rotu+180;
	        
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
	    } else if (mode==3) {
	        skele.frame = skele.frames.length;
	    
        	var addArr = [];
            
            for (var i=0; i<skele.frames[0].length; i++) {
                addArr.push(undefined);
            }
            
            skele.frames.push(addArr);
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
	
	if (mode == 1) {
	    if (RKey && !RKeyp) {
	        pts[pointSel].parent_a = bns[boneSel];
	    }
	    
	    if (FKey && !FKeyp) {
	        if (pts[pointSel].parent_b != bns[boneSel]) {
	            pts[pointSel].parent_b = bns[boneSel];
	        } else {
	            pts[pointSel].parent_b = null;
	        }
	    }
	}
	
	if (mode == 3) {
	    if (RKey && !RKeyp) {
	        skele.frame = Math.round(skele.frame+1);
	        
	        if (skele.frame==skele.frames.length) {
	            skele.frame=0;
	        }
	    }

	    var posArr = findBlend(skele.poss,skele.frame,3);
	    
	    if (FKey && !FKeyp) {
	        skele.frame = Math.round(skele.frame-1);
	        
	        if (skele.frame<0) {
	            skele.frame = skele.frames.length-1;
	        }
	    }
	    
	    if (QKey && !QKeyp) {
	        play = !play;
	    }
	    
	    if (WKey && !WKeyp) {
	        if (skele.poss[skele.frame][1]==undefined) {
	            skele.poss[skele.frame][1] = posArr[1];
	        }
	    
	        skele.poss[skele.frame][1]--;
	    }
	    if (SKey && !SKeyp) {
	        if (skele.poss[skele.frame][1]==undefined) {
	            skele.poss[skele.frame][1] = posArr[1];
	        }
	    
	        skele.poss[skele.frame][1]++;
	    }
	    if (AKey && !AKeyp) {
	        if (skele.poss[skele.frame][0]==undefined) {
	            skele.poss[skele.frame][0] = posArr[0];
	        }
	    
	        skele.poss[skele.frame][0]++;
	    }
	    if (DKey && !DKeyp) {
	        if (skele.poss[skele.frame][0]==undefined) {
	            skele.poss[skele.frame][0] = posArr[0];
	        }
	    
	        skele.poss[skele.frame][0]--;
	    }
	    
	    var rotArr = findBlend2(skele.frames,skele.frame,bns.length,2);
	    
	    if (OneKey && !OneKeyp) {
	        if (skele.frames[skele.frame][boneSel][1] == undefined) {
	            skele.frames[skele.frame][boneSel][1] = rotArr[boneSel][1];
	        }
	    
	        skele.frames[skele.frame][boneSel][1] -= 0.1;
	    }
	    if (TwoKey && !TwoKeyp) {
	        skele.frames[skele.frame][boneSel][1] = 1;
	    }
	    if (ThreeKey && !ThreeKeyp) {
	        if (skele.frames[skele.frame][boneSel][1] == undefined) {
	            skele.frames[skele.frame][boneSel][1] = rotArr[boneSel][1];
	        }
	    
	        skele.frames[skele.frame][boneSel][1] += 0.1;
	    }
	    
	    if (FourKey && !FourKeyp) {
	        skele.speed *= 0.8;
	    }
	    
	    if (FiveKey && !FiveKeyp) {
	        skele.speed *= 1.2;
	    }
	}
	
	var scx = skele.scalex;
	var scy = skele.scaley;
	
	var tde = 100;
	var psel = -1;
	
	for (var i=0; i<pts.length; i++) {
        dde=Math.abs(mouse_x-(pts[i].x*scx)-skele.x-400)+Math.abs(mouse_y-(pts[i].y*scx)-skele.y);

        if (dde<tde) {
	        bd=i;
	        tde=dde;
        }
    }

    if (tde<32) {		
	    psel = bd;
    }
    
    tde = 100;
	var bsel = -1;
	
	for (var i=0; i<bns.length; i++) {
        dde=Math.abs(mouse_x-(bns[i].ox2*scx)-skele.x-400)+Math.abs(mouse_y-(bns[i].oy2*scy)-skele.y);

        if (dde<tde) {
	        bd=i;
	        tde=dde;
        }
    }

    if (tde<32) {		
	    bsel = bd;
    }
    
    if (SKey && !SKeyp) {
        if (mode == 1) {
            pointSel = psel;
        } else if (mode == 0) {
            boneSel = bsel;
        }
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
	    
	    if (QKey && !QKeyp) {
	        var hold = pls[polySel]
	    
	        pls.splice(polySel,1);
	        
	        pls.push(hold);
	    }
    }

	if (LMouse) {
	    if (mode == 0) {
	        bone_Config();
	    } else if (mode == 1) {
	        point_Config();
	    } else if (mode == 2) {
	        polySel = -1;
	    
	        for (var i = 0; i < pls.length; i++) {
                if (pls[i].selected()) polySel=i;
            }
	    } else if (mode == 3) {
	        animation_Config();
	    }
	    
	    selected = true;
	} else {
	    selected = false;
	}
	
	
}


function point_Config() {
    var tde = 64;
    var scx = skele.scalex;
	var scy = skele.scaley;

    if (selected && (pointSel != -1)) {
        pts[pointSel].x = (mouse_x-skele.x-400)/scx;
        pts[pointSel].y = (mouse_y-skele.y)/scy;
    } else {
        for (var i=0; i<pts.length; i++) {
            dde=Math.abs(mouse_x-(pts[i].x*scx)-skele.x-400)+Math.abs(mouse_y-(pts[i].y*scx)-skele.y);

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
    var scx = skele.scalex;
	var scy = skele.scaley;

    if (selected && (boneSel != -1)) {
        var mx = (mouse_x-skele.x-400)/scx;
        var my = (mouse_y-skele.y)/scy;
    
        var bdist = dist(mx,my,bns[boneSel].ox1,bns[boneSel].oy1);
        var brot = Math.round(Math.atan((my-bns[boneSel].oy1)/(mx-bns[boneSel].ox1))*57.29577)-bns[boneSel].parent.rotu+180;
        
        if ((mx-bns[boneSel].ox1)>=0) {
	        brot+=180;
        }
        
        bns[boneSel].roto = brot;
        bns[boneSel].length = bdist;
    } else {
        for (var i=0; i<bns.length; i++) {
            dde=Math.abs(mouse_x-(bns[i].ox2*scx)-skele.x-400)+Math.abs(mouse_y-(bns[i].oy2*scy)-skele.y);
            
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
    var scx = skele.scalex;
	var scy = skele.scaley;

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
