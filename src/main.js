  function Ninja(game,x,y){

     Phaser.Sprite.call(this,game,x,y,'ninja');
     this.anchor.setTo(0.5);
     this.game.physics.arcade.enable(this);
     this.enableBody=true;
     this.body.collideWorldBounds=true;
     this.animations.add('walk',[0,1,2,3,4,5,6,7]);
     this.animations.play('walk',16,true);

   }

   Ninja.prototype = Object.create(Phaser.Sprite.prototype);
   Ninja.prototype.constructor = Ninja;

   Ninja.prototype.move = function(dir){
     const SPEED = 512;
     this.body.velocity.x = SPEED * dir;
   };

   Ninja.prototype.shoot = function(group){
     let y = this.y - 12;
     const HALF = 22;
     Shuriken.spawn(group, this.x + HALF,y);

   };

   function Shuriken(game,x,y){
      Phaser.Sprite.call(this,game,x,y,'shuriken');
      this.anchor.setTo(0.5,0.75);
      this.game.physics.arcade.enable(this);
      this.animations.add('shoot',[0,1,2,3]);
      this.animations.play('shoot',8,true);
      this.reset(x,y);
    }

    Shuriken.prototype = Object.create(Phaser.Sprite.prototype);
    Shuriken.prototype.constructor = Shuriken;

    Shuriken.prototype.reset = function(x,y){
      Phaser.Sprite.prototype.reset.call(this,x,y);
      this.body.velocity.y = -512;
    };

    Shuriken.prototype.update = function(){
       if (this.y < 0){
         this.kill();
       }
     };

    Shuriken.spawn = function(group,x,y){
      let shuriken = group.getFirstExists(false);
      if (shuriken === null){
        shuriken = new Shuriken(group.game,x,y);
        group.add(shuriken);
      }
      else{
        shuriken.reset(x,y);
      }
    };

    function Ghost(game,x,y){

      Phaser.Sprite.call(this,game,x,y,'ghost');
      this.anchor.setTo(0.5);
      this.game.physics.enable(this);
      this.animations.add('fly',[0,1,2,3]);
      this.animations.play('fly',4,true);
      this.reset(x,y);
    }

    Ghost.prototype = Object.create(Phaser.Sprite.prototype);
    Ghost.prototype.constructor = Ghost;

    Ghost.spawn = function(group,x,y){
      let ghost = group.getFirstExists(false);
      if  (ghost === null){
        ghost = new Ghost(group.game,x,y);
        group.add(ghost);
      }
      else{
       ghost.reset(x,y);
      }
      return ghost;
    };

    Ghost.prototype.reset = function(x,y){
    Phaser.Sprite.prototype.reset.call(this,x,y);
     const MIN_SPEEDY = 128;
     const MIN_SPEEDX= 96;
     const MAX_SPEEDX = 128;

     this.body.velocity.y = this.game.rnd.between(MIN_SPEEDY,MAX_SPEEDX);
     this.body.velocity.x = this.game.rnd.between(-MIN_SPEEDX,MAX_SPEEDX);

     this.body.bounce.x = 1;
     this.body.bounce.y = 0.8;
   };

    Ghost.prototype.update = function(){
      if (this.y > this.game.world.height + this.height ){
        this.kill();

      }
    };

let PlayState = {};

PlayState.preload = function(){
  this.game.load.image('background','assets/backgrounds/bg.png');
  this.game.load.spritesheet('ninja','assets/sprites/player-animated.png',64,64);
  this.game.load.spritesheet('shuriken','assets/sprites/shuriken.png',16,16);
  this.game.load.spritesheet('ghost','assets/sprites/ghost.png',128,128);
  this.game.load.audio('music',
  ['assets/music/konen_loop.ogg', 'assets/music/konen_loop.mp3']);
  this.game.load.audio('shurikenthrow','assets/sounds/shuriken-throw.wav');
  this.game.load.audio('shurikenhit','assets/sounds/shuriken-hit.wav');
},
PlayState.create = function(){

  this.audio={
    music:this.game.add.audio('music'),
    shurikenThrow:this.game.add.audio('shurikenthrow'),
    shurikenHit:this.game.add.audio('shurikenhit')
  };

  this.audio.music.loopFull();

  this.game.add.image(0,0,'background');
  this.ninja = new Ninja(this.game,10,436);
  this.game.add.existing(this.ninja);
  this.shurikens = this.game.add.group();
  this.ghosts = this.game.add.group();




this.keys =  this.game.input.keyboard.addKeys({
    left:Phaser.KeyCode.LEFT,
    right:Phaser.KeyCode.RIGHT,
    space:Phaser.KeyCode.SPACEBAR,
  });

this.keys.space.onDown.add(function(){
    this.ninja.shoot(this.shurikens);
    this.audio.shurikenThrow.play();
  },this);
},

PlayState.update = function(){

  if(this.keys.left.isDown){
    this.ninja.move(-2);
  } else if (this.keys.right.isDown){
    this.ninja.move(2);
  }
  else{
    this.ninja.move(0);
  }

  if (this.game.rnd.between(0, 100) < 50) {
    let x = this.game.rnd.between(0, this.game.world.width); // random x
    Ghost.spawn(this.ghosts, x, 10);
  }


this.game.physics.arcade.overlap(
  this.shurikens,
  this.ghosts,
  function(shuriken,ghost){
    shuriken.kill();
    ghost.kill();
    this.audio.shurikenHit.play();
  },null,this);

this.game.physics.arcade.collide(this.ghosts);

this.game.physics.arcade.overlap(
  this.ninja,
  this.ghosts,
  function(shuriken,ghost){
    console.log('hit');
    ghost.kill();
  }
)

};

window.onload=function(){
  new Phaser.Game(512,512,Phaser.AUTO,'game',PlayState);
};
