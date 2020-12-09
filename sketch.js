var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score,gameOver,restart,gameoverimg,restartimg;


function preload(){
  trex_running = loadAnimation("m1.png","m2.png","m3.png","m4.png","m5.png","m6.png","m7.png","m8.png","m9.png","m10.png","m11.png","m12.png","m13.png","m14.png","m15.png","m16.png","m17.png","m18.png","m19.png","m20.png","m21.png","m22.png","m23.png","m24.png");
 //trex_running = loadAnimation("trex.gif");
  trex_collided = loadImage("ripCrate.png");

//stand = loadImage("trex1.png");
//playS = loadImage("play.png");

  shoot = loadImage("megoFiring.png");
  jump = loadImage("megaJump.png");

  //ai mode image
  ai = loadImage("ai.png");

  bgImage = loadImage("bg.jpg")

  groundImage = loadImage("groundSprite.png");
  
  cloudImage = loadImage("z1.png");
  
  obstacle1 = loadImage("pillar.png");
  obstacle2 = loadImage("p2.png");
  obstacle3 = loadImage("pillar.png");
  obstacle4 = loadImage("pillar.png");
  obstacle5 = loadImage("pillar.png");
  obstacle6 = loadImage("pillar.png");
  gameoverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
}

function setup() {
 canvas = createCanvas(displayWidth - 500, displayHeight-110);
 //createCanvas(displayWidth - 15,displayHeight - 145);

  trex = createSprite(100,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trex_collided",trex_collided);
  trex.addAnimation("megoShooting",shoot);
  trex.addAnimation("megaJump",jump);
  trex.scale = 0.4;
 //trex.debug = true;
 // trex.setCollider("rectangle",0,0,trex.width,trex.height);
console.log("Program is Correct");

aiMode = createSprite(700,120);
aiMode.addImage("aiIcon",ai);

  ground = createSprite(200,570);
  ground.addImage("ground",groundImage);
  ground.scale=2;
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,415,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  bulletGroup = new Group();
  
  score = 0;
  
 

 //  gameOver = createSprite(300,170);
 restart = createSprite(450,250);
//gameOver.addImage(gameoverimg);
//gameOver.scale = 0.5;
restart.addImage(restartimg);
restart.scale = 0.5;

//gameOver.visible = false;
restart.visible = false;


}

function draw() {
  background(bgImage);


  if(keyDown(ai)){
    aiModeOn();
  }
  
 
 if(gameState === PLAY){  



  textSize(30);
 // textFont();
  fill("red");
  text("Score: "+ score, 50,50);
  fill("green");
  text("Note[Press Mego to Jump over the obstacles]", 200,50);

   
  score = score + Math.round(getFrameRate()/60);
  
  if(obstaclesGroup.isTouching(trex)){
        trex.changeAnimation(obstacle1);
  }
  
 /* if(mousePressedOver(trex)) {
    trex.velocityY = -18;
  }*/
  if(mousePressedOver(trex)) {
    trex.velocityY = -18;
   // trex.changeAnimation("megaJump");
    //trex.velocityY = -250;
  }
 // if(keyWentUp("space")) {
  //  trex.changeAnimation("running");
   // trex.velocityY = -18;
 // }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (trex.x < 200 && ground.x < 0){
    ground.x = ground.width/2;
  }
 
  
  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
    if(obstaclesGroup.isTouching(trex)){
     
      gameState = END;
      
    }
  
  }
 
 else if(gameState === END) {
   
aiMode.visible = false;
  //  gameOver.visible = true;
    restart.visible = true;

 /**trex.visible=false;
 *obstaclesGroup.destroyEach();
 *cloudsGroup.destroyEach();
 *ground.visible=false;
 **/
cloudsGroup.destroyEach();
obstaclesGroup.destroyEach();
bulletGroup.destroyEach();
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
   obstaclesGroup.setVelocityXEach(0);
   cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trex_collided");
    
    //set lifetime of the game objects so that they are never destroyed
   obstaclesGroup.setLifetimeEach(-1);
   cloudsGroup.setLifetimeEach(-1);
    
    
  }
  
 /* if(keyDown("space")) {
    reset();
  }*/
    if(mousePressedOver(restart)) {
    reset();
  }
  if(keyWentDown("f")){
    createBullet();
    trex.changeAnimation("megoShooting");
  }
  if(keyWentUp("f")){
    //createBullet();
    trex.changeAnimation("running");
  }
  
  
  drawSprites();
}
function reset(){
  gameState = PLAY;
  
 // gameOver.visible = false;
  restart.visible = false;

  trex.visible=true;
  ground.visible=true;
 
//bullet.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running");
  
  count = 0;
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var cloud = createSprite(600,160,50,50);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.6;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,390,10,40);
    obstacle.velocityX = -4;
    obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
   // obstacle.debug = true;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function createBullet() {
  var bullet = createSprite(100,200,20,5);
  //bullet.lifetime = -100;
    bullet.velocityX = 20;
  bullet.y = trex.y;
  bulletGroup.add(bullet);
}
function aiModeOn() {
  if(trex.y >= 359){
    trex.velocityY = -12 ;
 //playSound("jump.mp3");
       
  }
}