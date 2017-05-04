var WKey=false, SKey=false, AKey=false, DKey=false, EKey=false, QKey=false, ZKey=false, XKey=false,
        CKey=false, RKey=false, FKey=false, UKey=false, DoKey=false, LKey=false, RiKey=false, SpKey=false,
        VKey=false, BKey=false, DeKey = false;
var WKeyp, SKeyp, AKeyp, DKeyp, EKeyp, QKeyp, ZKeyp, CKeyp, RiKeyp, FKeyp, UKeyp, DoKeyp, LKeyp, RKryp, SpKeyp, XKeyp,
        VKeyp, BKeyp, DeKeyp,
        LMouse=false, RMouse=false, LMousep=false, RMousep=false;
var mouse_x=0, mouse_y=0, mouse_xp=0, mouse_yp=0;
var scrollx=0, scrolly=0, cursor_x=4000, cursor_y=150;
var scrollx=0, scrolly=0;

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
    DeKeyp = DeKey
}
function MouseMove(event) {
    mouse_x = event.clientX - 8;
    mouse_y = event.clientY - 8;
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
