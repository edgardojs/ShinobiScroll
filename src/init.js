let PlayState = {};
PlayState.preload=function(){};
PlayState.create=function(){};
window.onload = function (){
  new.Phaser.Game(512,512,Phaser.AUTO,'game',PlayState);
};
