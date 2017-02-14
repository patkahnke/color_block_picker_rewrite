$(document).ready(function() {

var colorArray = ['red', 'blue', 'green', 'yellow'];
var randomColorAsked = '';
var score = 0;
var attempts = 0;

  //Three main sequences in the game (set-up, play, reset)
  initialSetup();//set up page
  $('#game-field').on('click', '.clickable', testAnswerReportScore);//check answer and report
  $('body').on('click', ':button', resetEverything);//reset for another game

  //All the functions are declared below
  function initialSetup() {
    appendNewDivsWithClass(colorArray);//put each new color box on the DOM and assign it color data
    randomColorGenerator(colorArray);//display the random color to the player
    setTextToGoodLuck();//set the initial text in the response field
    setScoreToZero();
  }

  function resetEverything() {
    removeColorBoxes();
    resetTextToGoAgain();
    appendNewDivsWithClass(colorArray);//Resetting this in hopes of randomizing later
    randomColorGenerator(colorArray);
    resetButtonNoHighlight();
    responseGreen();
  }

  function testAnswerReportScore(event) {
    var colorChosen = $(this).data('color');
    var goodResponseArray = ['You are correct, sir! (Or madam)', 'WOW! Impressive!',
      'You got GAME!', 'SUCH a GREAT answer!', 'I wish we were related', 'You ROCK!', 'How do you DO it?!', 'Brilliant!', 'You could make a living at this!',
      'You EXCEED my EXPECTATIONS!'];
    var badResponseArray = ['Seriously? This is not that hard...', 'Should I help you find your glasses?',
      'I believe you are trying as hard as you can...but geez...', 'I hope you got someone else to drive you here...', 'uhm...how do I say this non-violently?',
      'Do NOT quit your day job...', 'Have you considered running for congress?', 'NEEDS REINFORCEMENT...', 'Are you doing this on purpose?', 'Now you are just ticking me off...', 'FOCUS, dude...'];
    var y = randomNumber(0, goodResponseArray.length - 1);
    var z = randomNumber(0, badResponseArray.length - 1);
    if (colorChosen == randomColorAsked) {
      $('.response-to-player').css("color", "green").text(goodResponseArray[y]);
      score++;
      attempts++;
    } else {
      $('.response-to-player').css("color", "red").text(badResponseArray[z]);
      attempts++;
    }
    $('.score').text('Score: ' + score + ' out of ' + attempts);
    $('#game-field').find('.colored-square').removeClass('clickable');
    $('body').find(':button').addClass('highlight');
  }

  function appendNewDivsWithClass(array) {
    for (var i = 0; i < array.length; i++) {
      var tempArray = colorArray;
      //The code below is a start on randomizing the squares, themselves
      //var a = randomNumber(0, tempArray.length - 1);
      //var randomColor = tempArray.slice[a];
      var $colorClass = array[i];
      $('#game-field').append('<div class="colored-square"></div>');
      var $el = $('#game-field').children().last();
      $el.addClass($colorClass);
      $el.addClass('clickable');
      $el.data('color', array[i]);
    }
  }

  function askForColor() {
  $('.color-asked-for').text(randomColorAsked);//Puts the random color on the DOM
  }

  function randomNumber(min, max){
      return Math.floor(Math.random() * (1 + max - min) + min);
  }

  function randomColorGenerator(array) {
    var x = randomNumber(0, array.length - 1);
    randomColorAsked = array[x];
    askForColor();
  }

  function removeColorBoxes() {
    $('#game-field').find('.colored-square').remove();
  }

  function resetButtonNoHighlight() {
    $('body').find(':button').removeClass('highlight');
  }

  function resetTextToGoAgain() {
    $('.response-to-player').text('Go again!');
  }

  function setTextToGoodLuck() {
    $('.response-to-player').text('Good Luck!');
  }

  function setScoreToZero() {
    $('.score').text('Score: 0 out of 0 attempts');
  }

  function responseGreen() {
    $('.response-to-player').css('color', 'green');
  }
    });
