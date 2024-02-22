 const resetScoreButton = document.querySelector('.reset-score-button');

 resetScoreButton.addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
      localStorage.removeItem('score');
        updateScoreElement();
 })
 
 //uložene score ziskava ven pokud je vnem nějaká hodnota a pokud undefined tak pomoci defaultniho vyrazu pridava body do objektu score.
 let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
/* same as above but we used default value ||
if(!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}
*/ 
updateScoreElement();
let isAutoPlaying = false;
let intervalId;

// EventListener na tlacitko Auto Play zahrnujici i změnu
//na Stop Playing pro vetší přehlednost,táké funkce vytvarejici
//samotný Auto Play ve kterém používáme setInterval() metodu
//kterou zastavujeme pomoci IntervalId
const autoPlayButton = document.querySelector('.auto-play-button');

autoPlayButton.addEventListener('click',() => {
  autoPlay();
  autoPlayUpdate();
});

autoPlayButton.addEventListener('keydown', (event) => {
  if(event.key === 'a') {
    autoPlay();
    autoPlayUpdate();
  }
})

function autoPlayUpdate() {
  if(autoPlayButton.innerHTML === 'Auto Play') {
    autoPlayButton.innerHTML= 'Stop Playing' 
  } else {autoPlayButton.innerHTML = 'Auto Play'};
}

//const autoPlay = () => {
//}; 
function autoPlay() {
  if(!isAutoPlaying) {
      intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click',() => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click',() => {
    playGame('paper')
  });

document.querySelector('.js-scissors-button')
.addEventListener('click',() => {
  playGame('scissors')
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r') {
    playGame('rock')
  } else if(event.key === 'p') {
    playGame('paper');
  } else if(event.key === 's') {
    playGame('scissors');
  }
});

//funkce přebírajicí výběr live hráče a následně porovnáva PC move s Live hračem move a uklada výsledek do result.
function playGame (playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

if(playerMove ==='scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.'
    } else if (computerMove === 'paper') {
      result = 'You Win!'
    } else if (computerMove === 'scissors') {
      result = 'Tie.'
    }

  }  else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You Win!';
    } else if  (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  }  else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if  (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You Win!';
    }
  }
  
  //Přidává skore do objektu "score" +1 jak hra dopadla.
  if(result === 'You Win!') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if(result === 'Tie.') {
    score.ties += 1;
  }
  //uklada objekt score pomoci local storage a nasledne převadí value score do stringu 
  localStorage.setItem('score', JSON.stringify(score));
  
  updateScoreElement();
  

  document.querySelector('.js-result')
  .innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You 
<img src="images/${playerMove}-emoji.png" 
class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;

}

function updateScoreElement() {
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, 
    Losses: ${score.losses}, Ties: ${score.ties}`;
}



//Funkce která vytvoří náhodný tah počítače a uloží ho do funkce.
function pickComputerMove() {
const randomNumber = Math.random();

  let computerMove = '';
  if(randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'scissors';
  }
    return computerMove;
  
  } 