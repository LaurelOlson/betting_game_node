"use strict";

var prompt = require('sync-prompt').prompt;

var INITIAL_BANKROLL = 100;
var MIN_GUESS = 1;
var MAX_GUESS = 10;
var MIN_BET = 5;
var MAX_BET = 10;

var bankroll = INITIAL_BANKROLL;
newGame();

function newGame() {
  bankroll = INITIAL_BANKROLL;
  playRound();
}

function playRound() {
  var bet = prompt('Place a bet between ' + MIN_BET + ' and ' + MAX_BET + ' ');
  validate(bet, MIN_BET, MAX_BET);

  var guess = prompt('Guess a number between ' + MIN_GUESS + ' and ' + MAX_GUESS + ' ');
  validate(guess, MIN_GUESS, MAX_GUESS);

  var number = Math.floor(Math.random() * (MAX_GUESS - MIN_GUESS + 1)) + MIN_GUESS;

  getResults(guess, number, bet);
}

function validate(field, min, max) {
  if (isNaN(+field) || +field < min || +field > max) {
    var prompt_msg = 'Place a ' + field + ' between ' + min + ' and ' + max + ' ';
    var error_msg = field + ' must be a number between ' + min + ' and ' + max + ' ';
    console.log(error_msg);
    field = prompt(prompt_msg);
    validate(field, min, max);
  }
}

function getResults(guess, number, bet) {
  if (guess == number) {
    bankroll += +bet;
    console.log('You got it!\nYour bet: ' + bet + '\nYour guess: ' + guess + '\nResult: ' + number);
  }
  else if (Math.abs(guess - number) === 1 ) {
    console.log('Almost!\nYour bet: ' + bet + '\nYour guess: ' + guess + '\nResult: ' + number);
  }
  else {
    bankroll -= +bet;
    console.log('Not quite..\nYour bet: ' + bet + '\nYour guess: ' + guess + '\nResult: ' + number);
  }
  console.log('Bankroll:', bankroll);

  if (bankroll <= 0)
    gameOver();
  else
    playRound();
}

function gameOver() {
  console.log('Game Over!');
  var play_again = prompt('Play again? (y/n) ');
  if (play_again === 'y')
    newGame();
}