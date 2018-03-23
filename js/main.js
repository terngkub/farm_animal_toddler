var GameState = {

	preload: function() {

		// load background
		this.load.image('background', 'assets/images/background.png');
		
		// load arrow
		this.load.image('arrow', 'assets/images/arrow.png');

		// load animal spritesheet
		this.load.spritesheet('chicken', 'assets/images/chicken_spritesheet.png', 131, 200, 3);
		this.load.spritesheet('horse', 'assets/images/horse_spritesheet.png', 212, 200, 3);
		this.load.spritesheet('pig', 'assets/images/pig_spritesheet.png', 297, 200, 3);
		this.load.spritesheet('sheep', 'assets/images/sheep_spritesheet.png', 244, 200, 3);

		// load audio
		this.load.audio('chickenSound', ['assets/audio/chicken.ogg', 'assets/audio/chicken.mp3']);
		this.load.audio('horseSound', ['assets/audio/horse.ogg', 'assets/audio/horse.mp3']);
		this.load.audio('pigSound', ['assets/audio/pig.ogg', 'assets/audio/pig.mp3']);
		this.load.audio('sheepSound', ['assets/audio/sheep.ogg', 'assets/audio/sheep.mp3']);
	},

	create: function() {

		// set screen size
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		// add background
		this.background = this.game.add.sprite(0, 0, 'background');

		// create animal data
		animalData = [
			{key: 'chicken', text: 'CHICKEN', audio:'chickenSound'},
			{key: 'horse', text: 'HORSE', audio:'horseSound'},
			{key: 'pig', text: 'PIG', audio:'pigSound'},
			{key: 'sheep', text: 'SHEEP', audio:'sheepSound'},
		];

		// create animal group
		this.animals = game.add.group();
		animalData.forEach(function(element) {

			// add each animal to the group
			var animal = this.animals.create(-1000, this.game.world.centerY, element.key, 0);
			animal.anchor.setTo(0.5);

			// play sound and animation when click at animal
			animal.customParams = {text: element.text, sound: this.game.add.audio(element.audio)};
			animal.animations.add('animate', [0, 1, 2, 1, 0, 1], 3, false);
			animal.inputEnabled = true;
			animal.input.pixelPerfectClick = true;
			animal.events.onInputDown.add(this.animateAnimal, this);
			
		}, this);

		// add first animal to the screen
		this.currentAnimal = this.animals.next();
		this.currentAnimal.position = {'x': this.game.world.centerX, 'y': this.game.world.centerY};
			
		// show animal text
		this.showText(this.currentAnimal);

		// add leftArrow
		this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
		this.leftArrow.anchor.setTo(0.5);
		this.leftArrow.scale.x = -1;
		this.leftArrow.inputEnabled = true;
		this.leftArrow.input.pixelPerfectClick = true;
		this.leftArrow.events.onInputDown.add(this.switchAnimal, this);
		this.leftArrow.customParams = {direction: -1};

		// add rightArrow
		this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
		this.rightArrow.anchor.setTo(0.5);
		this.rightArrow.inputEnabled = true;
		this.rightArrow.input.pixelPerfectClick = true;
		this.rightArrow.events.onInputDown.add(this.switchAnimal, this);
		this.rightArrow.customParams = {direction: 1};
	},

	update: function() {
	},

	switchAnimal: function(sprite) {

		if (this.isMoving)
			return false;

		this.isMoving = true;

		// hide old animal text
		this.animalText.visible = false;

		// get new animal and set the place of new/old animal
		if (sprite.customParams.direction == -1) {
			var newAnimal = this.animals.previous();
			newAnimal.x = 640 + newAnimal.width / 2;
			var endX = -this.currentAnimal.width / 2;
		} else {
			var newAnimal = this.animals.next();
			newAnimal.x = -newAnimal.width / 2;
			var endX = this.game.world.width + this.currentAnimal.width / 2;
		}

		// move new animal
		var newAnimalMovement = this.game.add.tween(newAnimal);
		newAnimalMovement.to({x: this.game.world.centerX}, 1000);
		newAnimalMovement.onComplete.add(function() {
			this.isMoving = false;
		}, this);
		newAnimalMovement.start();

		// move old animal
		var currentAnimalMovement = this.game.add.tween(this.currentAnimal);
		currentAnimalMovement.to({x: endX}, 1000);
		currentAnimalMovement.onComplete.add(function() {
			this.isMoving = false;
			this.showText(newAnimal);
		}, this);
		currentAnimalMovement.start();

		// set current animal to be new animal
		this.currentAnimal = newAnimal;
	},

	animateAnimal: function(sprite) {
		sprite.play('animate');
		sprite.customParams.sound.play();
	},

	showText: function(animal) {
		var style = {
			font: 'bold 30pt Arial',
			fill: '#D0171B',
			align: 'center'
		}
		this.animalText = this.game.add.text(this.game.world.centerX, this.game.world.height * 0.85, '', style);
		this.animalText.anchor.setTo(0.5);
		this.animalText.setText(animal.customParams.text);
		this.animalText.visible = true;
	}
}

var game = new Phaser.Game(640, 360, Phaser.AUTO);
game.state.add('GameState', GameState);
game.state.start('GameState');
