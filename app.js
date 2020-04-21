// DOM Elements
const gameboard = document.querySelector('#gameboard');
const btnStart = document.querySelector('#btnStart');
const lightBlue = document.querySelector('#lightblue');
const violet = document.querySelector('#violet');
const orange = document.querySelector('#orange');
const green = document.querySelector('#green');
const LAST_LEVEL = 3;

class Game {
  constructor() {
    // When you call winGame or loseGame
    this.initialize = this.initialize.bind(this);
    this.initialize();
    this.generateSequence();
    this.nextLevel();
  }

  initialize() {
    // bind(this) creates a new function has its "this" keyword set to provided value
    this.chooseColor = this.chooseColor.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    this.level = 1;
    this.colors = {
      // If the names of values and keys are the same, it's not necessary to puth both. For instance: {lightBlue: "lightBlue"}
      lightBlue,
      violet,
      orange,
      green
    };
    this.toogleBtn();
  }

  toogleBtn() {
    if(btnStart.classList.contains('hide')){
      btnStart.classList.add('disappear');
      console.log(btnStart.classList);
      setTimeout(()=> {
        btnStart.classList.remove('hide');
        btnStart.classList.remove('disappear');
      }, 250)
    } else {
      // When button doesn't have the hide class
      btnStart.classList.add('appear');
      setTimeout(() => {
        btnStart.classList.add('hide');
        btnStart.classList.remove('appear');
        console.log(btnStart.classList);
      }, 500);
    }
  }

  generateSequence() {
    // fill(0) fills all array elements to 0 and map() transforms the array in random elements
    this.sequence = new Array(LAST_LEVEL).fill(0).map( item => Math.floor(Math.random()*4));
  }

  nextLevel() {
    this.subLevel = 0;
    if(this.level === 1){
      setTimeout(() => {
        this.iluminateSequence();
      }, 500)
    } else {
      this.iluminateSequence();
    }
    this.addEventsClick();
  }

  iluminateSequence() {
    for(let i = 0; i < this.level; i++) {
      const color = this.transformNumberToColor(this.sequence[i]);
      setTimeout(() => {
        this.iluminateColor(color)
      }, 850*i);
    }
  }

  transformNumberToColor(number) {
    switch(number) {
      case 0:
        return 'lightBlue';
      case 1:
        return 'violet';
      case 2:
        return 'orange';
      case 3:
        return 'green';
      default:
        console.log('color not founded');
    }
  }

  transformColorToNumber(color) {
    switch(color) {
      case 'lightBlue':
        return 0;
      case 'violet':
        return 1;
      case 'orange':
        return 2;
      case 'green':
        return 3;
      default:
        console.log('number not founded');
    }
  }

  iluminateColor(color) {
    this.colors[color].classList.add('light');
    // Check if the iluminated option is the same option that you choose
    // console.log(this.colors[color]);
    setTimeout(() => {
      this.turnOffColor(color)
    }, 500)
  }

  turnOffColor(color) {
    this.colors[color].classList.remove('light');
  }

  addEventsClick() {
    // When you click on one of thoses elements call chooseColor function
    this.colors.lightBlue.addEventListener('click', this.chooseColor);
    this.colors.violet.addEventListener('click', this.chooseColor);
    this.colors.orange.addEventListener('click', this.chooseColor);
    this.colors.green.addEventListener('click', this.chooseColor);
  }

  deleteEventsClick() {
    // Change the value of this in chooseColor
    this.colors.lightBlue.removeEventListener('click', this.chooseColor);
    this.colors.violet.removeEventListener('click', this.chooseColor);
    this.colors.orange.removeEventListener('click', this.chooseColor);
    this.colors.green.removeEventListener('click', this.chooseColor);
  }

  // This function inspects the option that you choose is correct
  chooseColor(event) {
    const nameColor = event.target.dataset["color"];
    // Convert the color value to a number to compare with the sequence
    const numberColor = this.transformColorToNumber(nameColor);
    this.iluminateColor(nameColor);
    // When you pick the correct option
    if(numberColor === this.sequence[this.subLevel] ) {
      this.subLevel++;
      if(this.subLevel === this.level) {
        this.level++;
        this.deleteEventsClick();
        if(this.level === (LAST_LEVEL + 1)) {
          // When you finish the game
          this.winGame = this.winGame.bind(this);
          setTimeout(() => this.winGame(), 500);
          console.log('Game completed');
        } else {
          // When you pass the next level
          let show = document.createElement("div");
          show.classList.add('show');
          show.innerHTML = `Level ${this.level}!`;
          gameboard.appendChild(show);
          // Wait 2s to finish the animation of show element
          setTimeout(() => {
            gameboard.removeChild(show);
            // Change the value of this in nextLevel()
            this.nextLevel();
          }, 2000)
        }
      }
    } else {
      // When you pick the wrong option
      this.loseGame = this.loseGame.bind(this);
      setTimeout(() => this.loseGame(), 500);
      console.log('You failed!');
    }
  }

  winGame() {
    swal({
      title: "Congratulations 🥳",
      text: "You win!",
      icon: "success",
    })
    .then(this.initialize)
  }

  loseGame() {
    swal({
      title: "Sorry 😔",
      text: "You lose!",
      icon: "error",
      button: "Try again"
    })
    .then(() => {
      this.deleteEventsClick();
      this.initialize();
    })
  }
}

// This function starts the game
function startGame() {
  var game = new Game();
  console.log(game)
}