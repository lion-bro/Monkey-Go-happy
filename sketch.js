//Global Variables
var monkey,monkey_running;
var bg,bgImage,ig;
var stone,stoneImage;
var bannana,bannanaImage;
var bannanaGroup,obstacleGroup;
var gameState,play,end;
var ps;
var gameOver,gameOverIm,restart,resartIm; 


function preload(){
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bgImage = loadImage("jungle.jpg");
  
  bannanaImage = loadImage("Banana.png");
  stoneImage = loadImage("stone.png");
  
  gameOverIm = loadImage("gameOver.png");
  
  restartIm = loadImage("restart.png");
  
}


function setup() {
  
  createCanvas(600,300);
  
  monkey = createSprite(50,250);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  
  bg = createSprite(200,100);
  bg.addImage("bg",bgImage);
  bg.x=bg.width/2;
  bg.velocityX=-2;
  
  ig = createSprite(200,280,400,10);
  ig.visible = false;
  
  monkey.depth = bg.depth;
  monkey.depth+=1;
  
  obstacleGroup =  new Group();
  bannanaGroup = new Group();
  
  play= 0;
  end = 1;
  gameState = play;
  
  
  ps = 0;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverIm);
  gameOver.visible = false;
  
  restart = createSprite(300,180);
  restart.addImage(restartIm);
  restart.visible = false;
  
}


function draw(){
 background(255); 
  
  if(gameState ===play){
    
    if(keyDown("space")&& monkey.y >=220){
      
      monkey.velocityY = -15;
      
    }
  
    monkey.velocityY+=0.8;
  
    if(bg.x < 0){
      
      bg.x = bg.width/2;
      
    }
    
    if(bannanaGroup.isTouching(monkey)){
     
      bannanaGroup.destroyEach();
    
      ps+=10;
    
      monkey.scale+=0.02;
    
    }
  
    if(obstacleGroup.isTouching(monkey) && monkey.scale> 0.1){
    
      monkey.scale = 0.1;
      
      obstacleGroup.destroyEach();
    
    }
  
    if(obstacleGroup.isTouching(monkey) && monkey.scale === 0.1){
    
      gameState = end;
    
    }
    
    obstacles();
    bannanas();
    
  }
  
  
  
  else if(gameState === end){
    
    bg.velocityX=0;
    
    bannanaGroup.setVelocityXEach(0);
    
    obstacleGroup.setVelocityXEach(0);
    
    bannanaGroup.setLifetimeEach(-1);
    
    obstacleGroup.setLifetimeEach(-1);
    
    monkey.velocityX=0;
    
    gameOver.visible = true;
    restart.visible = true;
    
    if(mousePressedOver(restart)){
       
      gameState = play;
      
      obstacleGroup.destroyEach();
      bannanaGroup.destroyEach();
      
      obstacleGroup.setVelocityXEach(-6);
      bannanaGroup.setVelocityXEach(-6);
      
      obstacleGroup.setLifetimeEach(105);
      bannanaGroup.setLifetimeEach(105);
      
      gameOver.visible = false;
      
      ps = 0;
      
      restart.visible = false;
      
      bg.velocityX = -2;
      
    }
    
  }
  
  
  
  monkey.collide(ig);
  
  //console.log(gameState);
  
  drawSprites();
  
  fill("red");
  textSize(20);
  text("Score: " + ps ,200,50);
  
}

function obstacles(){
  
  if(frameCount%130===0){
    
    obstacle = createSprite(600,245);
    obstacle.addImage("rock",stoneImage);
    obstacle.velocityX=-6;
    obstacle.scale=0.2;
    
    obstacle.lifetime = 105;
    
    obstacleGroup.add(obstacle);
    
    monkey.depth = obstacle.depth;
    monkey.depth+=1;
    
    obstacle.debug = false;
    obstacle.setCollider("circle",0,0,150);
    
  }
}

function bannanas(){
  
  if(frameCount%100===0){
    
    bannana = createSprite(600,220);
    bannana.addImage(bannanaImage);
    bannana.scale=0.05;
    bannana.velocityX=-6;
    
    bannana.y=random(120,220);
    
    bannana.lifetime=105;
    
    bannanaGroup.add(bannana);
    
    monkey.depth = bannana.depth;
    monkey.depth+=1;
  }
}