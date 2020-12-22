//designing all the characters
//give the characters behavior
//make a function to spawn the obstacles
//work on gamestates, 0 is start, 1 is play, 2 is win, 3 is lose
//get fish image and possibly different backgrounds and obstacles
//make an end to the game

var fish, ground;
var fishImg, backImg;
var obsGroup;
var gameState = 0;
var button, retryButton, restartButton;
var obs1Img, obs2Img, obs3Img, obs3Img;
var score =0;


function preload(){
    backImg = loadImage("background.png");
    obs1Img = loadImage("obs1.png");
    obs2Img = loadImage("obs2.png");
    obs3Img = loadImage("obs3.png");
    fishImg = loadImage("fish.png");
}

function setup(){
    createCanvas(800,800);
    ground = createSprite(400,350,20,0);
    fish = createSprite(400,700,20,20);
    ground.addImage(backImg);
    ground.scale = 2.6;
    obsGroup = new Group();
    button = createButton('PLAY');
    button.position(400,400);
    retryButton = createButton('RETRY');
    retryButton.position(390,430);
    fish.addImage(fishImg);
    fish.scale = 0.25;
    restartButton = createButton('RESTART');
    restartButton.position(390,430);
}

function draw(){
    if(gameState === 0){
        button.show();
        score = 0;
        restartButton.hide();
        retryButton.hide();
        fish.x = 400
        fish.y = 700
        button.mousePressed(()=>{
            gameState = 1;
        })
    }
    background("images/background.png");

    if(gameState === 1){
        restartButton.hide();
        retryButton.hide();
        button.hide();
        ground.velocityY = 10;
        if(keyIsDown(LEFT_ARROW)){
            fish.x = fish.x - 10;
        }

        if(keyIsDown(RIGHT_ARROW)){
            fish.x = fish.x + 10;
        }

        if(keyIsDown(UP_ARROW)){
            fish.y = fish.y - 10;
        }

        if(keyIsDown(DOWN_ARROW)){
            fish.y = fish.y + 10;
        }
        
        if(ground.y > 600){
            ground.y = ground.y/2
        }
        score = score + 1;

        if(obsGroup.isTouching(fish)){
            gameState = 3;
        }

        if(score === 1000){
            gameState = 2;
        }
        spawnObstacles();
    }

    if(gameState === 2){
        retryButton.hide();
        ground.velocityY = 0;
        restartButton.show();
        restartButton.mousePressed(()=>{
            gameState = 1;
        })
    }


    if(gameState === 3){
        restartButton.hide();
        ground.velocityY = 0;
        score = 0;
        retryButton.show();
        retryButton.mousePressed(()=>{
            fish.x = 400;
            fish.y = 700;
            gameState = 1;
        })
    }
    drawSprites();

        textSize(40);
        fill("white");
        text("Score: " + score, 10, 100);

    if(gameState === 2){
        textSize(40);
        fill("red");
        text("You Win!", 300, 400);
    }

    if(gameState === 3){
        textSize(40);
        fill("red");
        text("Game Over!", 300, 400);
    }

}

function spawnObstacles(){
    if(World.frameCount % 60 === 0){
        var rand = Math.floor(random(0,1)*3);
        var randX = random(100,700)
        var obstacles = createSprite(randX, 75, 20, 20)
        obsGroup.add(obstacles);
        obstacles.shapeColor = "red"
        obstacles.velocityY = 15;
        obstacles.debug = true;
        
        switch(rand){
            case 0: obstacles.addImage(obs1Img);
                    obstacles.scale = 0.25;
                    obstacles.setCollider("rectangle", 0, 0, 150, 415);
                break;
            case 1: obstacles.addImage(obs2Img);
                    obstacles.scale = 0.1;
                    obstacles.setCollider("rectangle", 0, 0, 1050, 1275);
                break;
            case 2: obstacles.addImage(obs3Img);
                    obstacles.scale = 0.2;
                    obstacles.setCollider("rectangle", 0, 0, 650, 475);
            default: break; 

        }
    }
}