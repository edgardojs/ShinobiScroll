let PlayState = {};

export function Ninja(game,x,y){

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
