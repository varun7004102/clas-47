const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1,box2,box3,box4,box5,box6,box7,box8,box9,box10;
var log1,log2,log3,log4,log5,log6,log7,log8;
var thief1,thief2,thief3,thief4;
var backgroundImg;
var platform;
var superghost;
var slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    platform = new Ground(150, 305, 300, 170);
    ground = new Ground(600,height,1200,20)

    box1 = new Box(900,320,90,90);
    box2 = new Box(1120,320,90,90);
    thief1 = new Thief(1010, 350);
    log1 = new Log(1010,260,300, PI/2);

    box3 = new Box(900,240,90,90);
    box4 = new Box(1120,240,90,90);
    thief2 = new Thief(1010, 220);
    log2 =  new Log(1010,180,300, PI/2);

    box5 = new Box(1000,160,90,90);
    log3 = new Log(960,120,150, PI/6);
    log4 = new Log(1070,120,150, -PI/6);


    box6 = new Box(600,320,90,90);
    box7 = new Box(820,320,90,90);
    thief3 = new Thief(710, 350);
    log5 = new Log(710,260,300, PI/2);

    box8 = new Box(600,240,90,90);
    box9 = new Box(820,240,90,90);
    thief4 = new Thief(710, 220);
    log6 =  new Log(710,180,300, PI/2);

    box10 = new Box(710,160,90,90);
    log7 = new Log(660,120,150, PI/6);
    log8 = new Log(770,120,150, -PI/6);

    superghost = new Superghost(100,100);

    slingshot = new SlingShot(superghost.body,{x:200, y:50});
}
function draw(){
    if(backgroundImg)
    background(backgroundImg);

    noStroke();
    textSize(35)
    fill("white")
    text("Score  " + score, width-300, 50)

    Engine.update(engine);
    ground.display();

    box1.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();
    box6.display();
    box7.display();
    box8.display();
    box9.display();
    box10.display();
    
    thief1.display();
    thief2.display();
    thief3.display();
    thief4.display();

    log1.display();
    log2.display();
    log3.display();
    log4.display();
    log5.display();
    log6.display();
    log7.display();
    log8.display();

    superghost.display();
    platform.display();

    slingshot.display();    

}

function mouseDragged(){
        Matter.Body.setPosition(superghost.body, {x: mouseX , y: mouseY});
    
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        superghost.trajectory = []
        Matter.Body.setPosition(superghost.body,{x:200,y:50})
       slingshot.attach(superghost.body);
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}