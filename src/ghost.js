let PlayState = {};

export function Ghost(game,x,y){

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
