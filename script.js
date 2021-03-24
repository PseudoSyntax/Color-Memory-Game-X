// global constants
const clueHoldTime = 500 //how long to hold each clue's light/sound
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 500; //how long to wait before starting playback of the clue sequence

// global constants
const clueHoldTime2 = 50 //how long to hold each clue's light/sound
const cluePauseTime2 =90; //how long to pause in between clues
const nextClueWaitTime2 = 60; //how long to wait before starting playback of the clue sequence

let lives=6;//three strikes

//Global Variables
var pattern = [1, 2,RandomInt(20),4,RandomInt(20),RandomInt(20)];
var melody1 = [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,  0, 0,14, 0,15, 0, 0,16,0,17,0,18,0,13,18,17];
var melody2 = [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,  1, 1, 0, 0,19,0 ,0 ,20,0 ,22,0 ,23,0 ,1 ,23,22];//18rest G5
var melody3 = [1 ,0 ,2 ,0 ,0 ,3 ,0 ,4 ,0 ,5 ,0 ,6 ,5 ,4 ,21,21,1 ,0 ,2 ,0 ,0 ,3 ,0 ,4 ,0 ,5 ,0 ,6 ,5 ,4 ,    
               1, 1, 0, 0,19,0 ,0 ,20,0 ,22,0 ,23,0 ,1 ,23,22,0, 0,14, 0,15, 0, 0,16,0,17,0,18,0,13,18,17,
              1, 1, 0, 0,19,0 ,0 ,20,0 ,22,0 ,23,0 ,1 ,23,22,0, 0,14, 0,15, 0, 0,16,0,17,0,18,0,13,18,17,
              4,0,4,2,10,9,8,7,1,1,12,23,23,23,23,23,23,23,23];

//6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6
//var BassClef =[1, 2, 3, 4, 5, 6, 5, 4,3,2,1,2,3];
var solution = 97;//46+32+19
var progress = 0; 
var gamePlaying = false;// 
var tonePlaying = false;
var volume = 0.5;  //must be between 0.0 and 1.0
var guessCounter = 0;
console.log("The Game has Started!");
console.log("Play single clue: 2 in 1000ms");

function RandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function startGame(){
    //initialize game variables
    progress = 0;
    gamePlaying = true;
    lives=6
// swap the Start and Stop buttons
document.getElementById("startBtn").classList.add("hidden");
document.getElementById("stopBtn").classList.remove("hidden");
playClueSequence()
}

function stopGame(){
    //initialize game variables
    gamePlaying = false;
// swap the Start and Stop buttons
document.getElementById("startBtn").classList.remove("hidden");
document.getElementById("stopBtn").classList.add("hidden");
}
function resumeGame(){
    //initialize game variables
    gamePlaying = false;
// swap the Start and Stop buttons
document.getElementById("startBtn").classList.remove("hidden");
document.getElementById("stopBtn").classList.add("hidden");
  
playMega()
}

// Sound Synthesis Functions
const freqMap = {
  0: 0.0000, //Rest
  1: 587.33, //D5
  2: 440.00, //A4
  3: 415.30, //G#4
  4: 392.00, //G4
  5: 349.23, //f4
  6: 293.66, //D4
  7: 554.37, //C#5
  8: 523.25, //C5
  9: 493.88, //B4
  10:466.16, //A#4
  11:207.65, //G#3
  12:659.25, //E5
  13:1174.66,//D6
  14:2349.32,//D7
  15:1760.00,//A6
  16:1661.22,//G#6
  17:1567.98,//G6
  18:1396.91,//F6
  19:880.00, //A5
  20:830.61, //G#5
  21:233.08, //A#3
  22:783.99, //G5
  23:698.46, //F5
}


function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  //o.frequency.setTimeout(stopTone(), 9000) 
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function playTone1(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function playTone2(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function playTone3(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
 if(!tonePlaying){ 
    o.frequency.value = freqMap[btn]
   g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
} 

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)

function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}

function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}
function playSingleClue1(btn){

    lightButton(btn);
    playTone1(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }

function playSingleClue2(btn){

    lightButton(btn);
    playTone2(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }

function playSingleClue3(btn){

    lightButton(btn);
    playTone3(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }

//====================================================================================
function playMega(){
  
  playMelody1();
  playMelody2();
  playMelody3();

}


function playSolution(btn){   
      //guessCounter = 0;
  let delay = nextClueWaitTime2; //set delay to initial wait time
  for(let i=0;i<=solution;i++){ // for each clue that is revealed so far
    setTimeout(playSingleClue,delay,melody1[i]) // set a timeout to play that clue
    delay += clueHoldTime2 
    delay += cluePauseTime2;
  }
}
function playMelody1(btn){   
      //guessCounter = 0;
  let delay = nextClueWaitTime2; //set delay to initial wait time
  for(let i=0;i<=solution;i++){ // for each clue that is revealed so far
    setTimeout(playSingleClue1,delay,melody1[i]) // set a timeout to play that clue
    delay += clueHoldTime2 
    delay += cluePauseTime2;
  }
}
function playMelody2(btn){   
      //guessCounter = 0;
  let delay = nextClueWaitTime2; //set delay to initial wait time
  for(let i=0;i<=solution;i++){ // for each clue that is revealed so far
    setTimeout(playSingleClue2,delay,melody2[i]) // set a timeout to play that clue
    delay += clueHoldTime2 
    delay += cluePauseTime2;
  }
}
function playMelody3(btn){   
      //guessCounter = 0;
  let delay = nextClueWaitTime2; //set delay to initial wait time
  for(let i=0;i<=solution;i++){ // for each clue that is revealed so far
    setTimeout(playSingleClue3,delay,melody3[i]) // set a timeout to play that clue
    delay += clueHoldTime2 
    delay += cluePauseTime2;
  }
}

//====================================================================================


function playClueSequence(){
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
  }
}
function guess(btn){//function "guess" manages main game logic componets
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }
if (pattern[guessCounter] == btn) {
  
    if(guessCounter == progress){
        if(progress == pattern.length - 1){
                winGame();
        }else{
          progress++;//keeps track of level
          playClueSequence();
        }
    }else{
      guessCounter++;//increment guessCounter
    }

}else{
  lives--
  if (lives > 0){
  lives--;
  }
  else{
  loseGame();//upon incorrect guess loseGame()
  }
    playClueSequence()
}

}//end of function guess  

function loseGame(){
  stopGame();
  alert("Game Over. You lost. CLICK OK TO HEAR SOLUTION!");
    resumeGame();
}
function winGame(){
  stopGame();
  alert("Game Over. You won!");
  resumeGame();
}
