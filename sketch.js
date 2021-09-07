var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");


}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(300, 300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4
  ghost.debug = true
  ghost.setCollider("rectangle", 0, 0, ghost.width-40, ghost.height-50)

  spookySound.loop();
}

function draw() {
  background(200);

  if (gameState == "play"){


    if (keyDown("left_arrow")){
      ghost.x = ghost.x - 3
    }
    if (keyDown("right_arrow")){
      ghost.x = ghost.x + 3
    }
    if (keyDown("space")){
      ghost.velocityY = -5
    }

    ghost.velocityY = ghost.velocityY + 0.8

    if (climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 500){
      gameState = "END"
      
    }
    spawnDoors();
  }

  if (gameState == "END"){
    ghost.destroy();
    tower.velocityY = 0
    
    stroke("red");
    fill ("red");
    textSize(30);
    text("Game Over", 200, 300)
  }
      if(tower.y > 400){
      tower.y = 300
    }
  drawSprites();
}

function spawnDoors() {
  if (frameCount%250 == 0){
    door = createSprite(300, 0);
    door.addImage(doorImg);

    climber = createSprite(300, 50);
    climber.addImage(climberImg);

    invisibleBlock = createSprite(300, 60, climber.width, 3);
    invisibleBlock.x = climber.x;
    

    door.x = Math.round(random(120, 400));
    door.velocityY = 1

    climber.x = door.x;
    climber.velocityY = 1;

    invisibleBlock.velocityY = 1;

    door.lifetime = 600

    climber.lifetime = 600

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
  }

}