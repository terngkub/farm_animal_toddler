var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
	preload: function() {
		this.load.image('background', 'assets/images/background.png');
		this.load.image('arrow', 'assets/images/arrow.png')
		this.load.image('chicken', 'assets/images/chicken.png');
		this.load.image('horse', 'assets/images/horse.png');
		this.load.image('pig', 'assets/images/pig.png');
		this.load.image('sheep', 'assets/images/sheep3.png');
	},
	create: function() {

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		this.background = this.game.add.sprite(0, 0, 'background');

		this.pig = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'pig');
		this.pig.anchor.setTo(0.5);

		this.pig.inputEnabled = true;
		this.pig.input.pixelPerfectClick = true;
		this.pig.events.onInputDown.add(this.animateAnimal, this);

		this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
		this.leftArrow.anchor.setTo(0.5);
		this.leftArrow.scale.x = -1;
		this.leftArrow.customParams = {direction: -1};

		this.leftArrow.inputEnabled = true;
		this.leftArrow.input.pixelPerfectClick = true;
		this.leftArrow.events.onInputDown.add(this.switchAnimal, this);

		this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
		this.rightArrow.anchor.setTo(0.5);
		this.rightArrow.customParams = {direction: 1};

		this.rightArrow.inputEnabled = true;
		this.rightArrow.input.pixelPerfectClick = true;
		this.rightArrow.events.onInputDown.add(this.switchAnimal, this);

	},
	update: function() {
	},
	switchAnimal: function(sprite, event) {
		console.log('move animal');
	},
	animateAnimal: function(sprite, event) {
		console.log('animate animal')
	}
};

game.state.add('GameState', GameState);
game.state.start('GameState');