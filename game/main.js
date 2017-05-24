var canvas = document.getElementById("Screen");
var context = canvas.getContext("2d");

function compare(a, b) {
    return (b.depth) - (a.depth);
}

var player = new Player(0,-0.35,0.5,bones,points,ppolys,anima,undefined);
var enemy  = new Player(0.5,-0.35,0.5,bones,points,epolys,anima,undefined);
player.enemy = enemy;
enemy.enemy = player;
var background = new Model(0,0,0,Verts,Polys,1);
var sun = new Model(0,-0.5,1,sunVerts,sunPolys,0.2);
/*
var cloud1 = new Model(1,-3.1,1,cloudVerts,cloudPolys,0.5);
var cloud2 = new Model(-0.8,-3.3,1,cloudVerts,cloudPolys,0.7);
var cloud3 = new Model(-1.6,-3.2,1,cloudVerts,cloudPolys,0.6);
var cloud4 = new Model(0.4,-3.6,1,cloudVerts,cloudPolys,0.7);
*/
var drawArr = background.pls.concat([player]);

drawArr = drawArr.concat([enemy]);
drawArr = drawArr.concat(sun.pls);
/*
drawArr = drawArr.concat(cloud1.pls);
drawArr = drawArr.concat(cloud2.pls);
drawArr = drawArr.concat(cloud3.pls);
drawArr = drawArr.concat(cloud4.pls);
*/
context.lineWidth = 1;
context.lineCap="none";

var lights = [new Light(0.35, -0.75, -0.5, 1, 0.2, 0, 3), new Light(-0.35, -0.75, -0.5, 1, 0.2, 0, 3), new Light(0,-1, -16, 0.4, 0.4, 1, 0.5), new Light(0,-1, -16, 0, 0, 0.3, 0.5), new Light(0,-7, -16, 1, 1, 1, 0.05), new Light(0.35, -0.75, -3.4, 1, 0.2, 0, 3), new Light(-0.35, -0.75, -3.4, 1, 0.2, 0, 3)];
var scene = new Scene(lights);

var aniNodes = [
new AniNode(anima[0], 0, 0.06, anima[0][0].length, [ /*walk*/
    new ExitState("onShiftKeyDown", 4, 3, 0, 0),
    new ExitState(      "onAniEnd", 0,-1,-1, 0), 
    new ExitState(      "onToward",11, 3, 0, 0),
    new ExitState(      "onAKeyUp", 1, 2, 0, 0), 
    new ExitState(      "onDKeyUp", 1, 2, 0, 0),
    new ExitState(    "onJKeyDown", 2, 3, 0, 0),
    new ExitState(    "onLKeyDown", 3, 3, 0, 0),
    new ExitState(    "onKKeyDown", 5, 2, 0, 0),
    new ExitState("onSpaceKeyDown", 6, 2, 0, 0)
    ], 0, undefined, 0, 0, 1),

new AniNode(anima[1], 0, 0.01, anima[1][0].length, [ /*stand*/
    new ExitState("onShiftKeyDown", 4, 3, 0, 0),
    new ExitState(      "onAniEnd", 1,-1,-1, 0), 
    new ExitState(        "onAway", 0, 2, 0,-1), 
    new ExitState(      "onToward",11, 2, 0,-1),
    new ExitState(    "onJKeyDown", 2, 3, 0, 0),
    new ExitState(    "onLKeyDown", 3, 3, 0, 0),
    new ExitState(    "onKKeyDown", 5, 2, 0, 0),
    new ExitState("onSpaceKeyDown", 6, 2, 0, 0),
    new ExitState(     "onHitHigh", 9,-1, 1, 0),
    new ExitState(      "onHitMid",10,-1, 1, 0)
    ], 0, undefined, 1, 0, 1),
    
new AniNode(anima[2], 0, 0.05, anima[2][0].length, [ /*swing*/
    new ExitState("onAniEnd",1,-1, 0, 0)
    ], 0, undefined, 2, 0, 1),
    
new AniNode(anima[3], 0,0.025, anima[3][0].length, [ /*jab*/
    new ExitState("onAniEnd",1,-1, 0, 0)
    ], 0, undefined, 3, 0, 1),
    
new AniNode(anima[4], 0,0.025, anima[4][0].length, [ /*roll*/
    new ExitState("onAniEnd",1,-1, 0, 0)
    ], 0, undefined, 4, 0, 1),
    
new AniNode(anima[5], 0, 0.03, anima[5][0].length, [ /*block*/
    new ExitState("onAniEnd",5,-1,-1, 0),
    new ExitState("onKKeyUp",1,-1, 0, 0)
    ], 0, undefined, 5, 0, 0.2),  
    
new AniNode(anima[6], 0, 0.08, anima[6][0].length, [ /*jump a*/
    new ExitState("onAniEnd",7,-1, 0, 0)
    ], 0, undefined, 6, 0, 1),    
    
new AniNode(anima[7], 0, 0.05, anima[7][0].length, [ /*jump b*/
    new ExitState("onAniEnd",7,-1,-1, 0),
    new ExitState("aboveGround",8, 2, 0, 0)
    ], 0, undefined, 7, 0, 1),  
    
new AniNode(anima[8], 0, 0.05, anima[8][0].length, [ /*jump c*/
    new ExitState("onAniEnd",1,-1, 0, 0),
    ], 0, undefined, 8, 0, 1),  
    
new AniNode(anima[9], 0, 0.05, anima[9][0].length, [ /*high hit*/
    ], 0, undefined, 9, 0, 1),
    
new AniNode(anima[10], 0, 0.05, anima[10][0].length, [ /*mid hit*/
    ], 0, undefined,10, 0, 1),
    
new AniNode(anima[0], 0,-0.06, anima[0][0].length, [ /*walkb*/
    new ExitState("onShiftKeyDown", 4, 3, 0, 0),
    new ExitState(      "onAniEnd",11,-1,-1, 1), 
    new ExitState(        "onAway", 0, 3, 0, 0),
    new ExitState(      "onAKeyUp", 1, 2, 0, 0), 
    new ExitState(      "onDKeyUp", 1, 2, 0, 0),
    new ExitState(    "onJKeyDown", 2, 3, 0, 0),
    new ExitState(    "onLKeyDown", 3, 3, 0, 0),
    new ExitState(    "onKKeyDown", 5, 2, 0, 0),
    new ExitState("onSpaceKeyDown", 6, 2, 0, 0)
    ], 0, undefined,11, 0, 1),
];

var aniEn = new AniController(aniNodes, 1, [], player);
var enemyAniEn = new AniController(aniNodes, 1, [], enemy);
player.aniEn = aniEn;
enemy.aniEn = enemyAniEn;

var auto = new AI(enemy, player);

var ani=0;

function draw() {
    context.clearRect(0, 0, 1280, 720);
    
    context.fillStyle = '#E0E0E0';
    
    context.fillRect(0,0,848,480);
    
    //if (WKey) player.z+=0.05;
    //if (SKey) player.z-=0.05;
    
    //if (player.Keys[87]) scale += 0.01;
    //if (player.Keys[83]) scale -= 0.01;
    
    ani+=0.5;
    
    //lights[0].x = (Math.sin(ani/5)/10)+0.35;
    //lights[1].x = (Math.cos(ani/5)/10)-0.35;

    lights[2].z =-(Math.sin(ani/500)*4) - 35;
    lights[3].z =-(Math.sin(ani/500)*4) - 35;
    
    sun.y = Math.sin(ani/-500)*20;
    sun.z = Math.cos(ani/-500)*20;
    
    lights[4].x = sun.x*10;
    lights[4].y = sun.y*10;
    lights[4].z = sun.z*10;
    
    var uy = sun.y - 15;
    
    if (uy<0) {
        if (sun.z>0 || uy<-50) {
            lights[4].ramt = 1;
            lights[4].gamt = 1;
            lights[4].bamt = 1;
        } else {
            lights[4].ramt = 1;
            lights[4].gamt = 0.6+(0.008*-uy);
            lights[4].bamt = 0.4+(0.01*-uy);
        }
        
        lights[4].dist = -0.001/uy;
    } else {
        lights[4].dist = 1000;
    }
    /*
    cloud1.z = -(((ani/100))%40)-10;
    cloud2.z = -(((ani/100)+10)%40)-10;
    cloud3.z = -(((ani/100)+20)%40)-10;
    cloud4.z = -(((ani/100)+30)%40)-10;
    */
    
    player.Keys = Keys;
    player.Keysp = Keysp;
    
    auto.update();
    
    var fr = this.aniEn.getAni();
    
    var cx = fr[0][0]*player.skele.scalex/2;

    scrollx = (player.playerPt.x + enemy.playerPt.x) / -2;
    scrolly = ((player.playerPt.y + enemy.playerPt.y) / -2) + (0.05);
    
    scale = 0.8;
    
    player.playerPt.update();
    enemy.playerPt.update();
    
    while (Math.abs(player.playerPt.sx-enemy.playerPt.sx)>600) {
        scale+=0.01;

        player.playerPt.update();
        enemy.playerPt.update();
    }
    
    player.update();
    enemy.update();
    
    background.update();
    sun.update();

    drawArr.sort(compare);

    for (var i=0; i<drawArr.length; i++) {
        drawArr[i].draw();
    }
    
    //eventList.getEvent("onHitHigh",enemy.aniEn);

    context.fillStyle = 'black';

    KeyPrev();
    MousePrev();
}

function changeCol(col, rc, gc, bc) {
    var r = col.substr(1,2);
    var g = col.substr(3,2);
    var b = col.substr(5,2);
    
    r = parseInt(r,16);
    g = parseInt(g,16);
    b = parseInt(b,16);
    
    r *= rc;
    g *= gc;
    b *= bc;
    
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    
    if (r>255) r = 255;
    if (r<0) r = 0; 
    if (g>255) g = 255;
    if (g<0) g = 0; 
    if (b>255) b = 255;
    if (b<0) b = 0; 
    
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    
    if (r.length==1) r = '0' + r;
    if (g.length==1) g = '0' + g;
    if (b.length==1) b = '0' + b;
    
    return '#' + r + g + b;
}
	
var fps = 60;
setInterval(function () {
    draw();
}, 1000 / fps);

document.addEventListener("keydown", KeyDown, false);
document.addEventListener("keyup", KeyUp, false);
document.addEventListener("mousedown", MouseDown, false);
document.addEventListener("mouseup", MouseUp, false);
document.addEventListener("mousemove", MouseMove, false);
		
