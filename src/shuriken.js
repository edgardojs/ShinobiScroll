let PlayState = {};

export function Shuriken(game,x,y){
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
