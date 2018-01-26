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

		//scaling options
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		//create a sprite for the background
		this.background = this.game.add.sprite(0, 0, 'background');

		//group for animals
		var animalData = [
			{key: 'chicken', text: 'CHICKEN'},
			{key: 'horse', text: 'HORSE'},
			{key: 'pig', text: 'PIG'},
			{key: 'sheep', text: 'SHEEP'}
		];

		this.animals = this.game.add.group();

		var self = this;

		animalData.forEach(function(element) {
			self.animals.create(200, self.game.world.centerY, element.key);
		});


		//left arrow
		this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
		this.leftArrow.anchor.setTo(0.5);
		this.leftArrow.scale.x = -1;
		this.leftArrow.customParams = {direction: -1};

		this.leftArrow.inputEnabled = true;
		this.leftArrow.input.pixelPerfectClick = true;
		this.leftArrow.events.onInputDown.add(this.switchAnimal, this);

		//right arrow
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
