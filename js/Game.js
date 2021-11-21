class Game {
  constructor() {
   this.leftKeyActive = false;
   this.playerMoving = false;
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {

    form = new Form();
    form.display();

    player = new Player();
    playerCount = player.getCount();

    myplayer=createSprite(width/2,height/2);
    mynation=createSprite(width/2,height/2);
    
    
  }

  playOne(){
    background(trackImage);
    form.hide();

    Player.getPlayersInfo();

    if(allPlayers != undefined ){
      //imageMode(CENTER);
      //image(trackImage,width/2,height/2,width-10,height-20);

      for(var plr in allPlayers){

        if(player.name==="1"){
          myplayer.addImage("soldier",soldier2Img);
          myplayer.scale = 0.4;
        }

        if(player.name==="2"){
          myplayer.addAnimation("woodcutter",woodcutter2Img);
          myplayer.scale = 0.6;
        }

        if(player.name==="3"){
          myplayer.addAnimation('fisherman',fisherman2Img);
          myplayer.scale = 0.6;
        }

        //displaY nation
        if(player.nation==="INDIA"){
          mynation.addImage("mynation",indiaImg);
          mynation.scale = 0.03;
        }
        console.log(player.name);
        //console.log(allPlayers[plr].positionX);
        console.log(myplayer);

        var x = allPlayers[plr].positionX;
        var y = allPlayers[plr].positionY;

        myplayer.position.x = x;
        myplayer.position.y = y;

        mynation.position.x = x-50;
        mynation.position.y = y;

       //image(myname,x,y,10,10);

        this.handlePlayerControls();

        var rand = Math.round(Math.random(1,4));
        console.log(rand)

        if(frameCount%80===0){
          if(rand===1){
            this.spawnZombies(zombie1Image,0.3);
          }
          else if(rand===2){
            this.spawnZombies(zombie2Image,0.3);
          }
          else if(rand===3){
            this.spawnZombies(zombie3Image,0.3);
          }
          else{
            this.spawnZombies(zombie4Image,0.3);
          }
          
        }       
      }
      drawSprites();
    }
   
  }

  spawnZombies(spriteImage,scale){
    zombie1 = createSprite(Math.round(random(width/3-200,width-100)),height/3-200,50,50);
    zombie1.y = Math.round(random(height/3-100,height-100))
    zombie1.addImage(spriteImage);
    zombie1.scale = scale;

    if(zombie1.x>width/2){
      zombie1.velocityX = -5;
    }

    if(zombie1.x<width/2){
      zombie1.velocityX = 5;
    }

  }

  handlePlayerControls() {
    if (keyDown(UP_ARROW)) {
      player.positionY -= 10;
      player.update();
    }

    if (keyDown(LEFT_ARROW)) {
      player.positionX -= 5;
      player.update();
    }

    if (keyDown(DOWN_ARROW)) {
      player.positionY += 5;
      player.update();
    }

    if (keyIsDown(RIGHT_ARROW)) {
      player.positionX += 5;
      player.update();
    }
  }


}
