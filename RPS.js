export function RPS() {

  const computerChoiceDisplay = document.getElementById('computer-choice')
  const userChoiceDisplay = document.getElementById('user-choice')
  const resultDisplay = document.getElementById('result')
  const possibleChoices = document.querySelectorAll('button')
  const countdownDisplay = document.getElementById('countdown') 
  const gameStart = document.getElementById('gameRPS')
  let userChoice
  let computerChoice
  let result

  possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id
    userChoiceDisplay.innerHTML = `<img src="${userChoice}.png" alt="${userChoice}">`
    startCountdown()
  }))


  function startCountdown() {
    gameStart.style.display = "none";
    let countdown = 3;
    countdownDisplay.innerHTML = countdown;
    countdownDisplay.style.display = "flex"; // show countdown
    document.getElementById('rps-stats').style.display = "none"; // hide stats

    const countdownInterval = setInterval(() => {
      countdown--;
      countdownDisplay.innerHTML = countdown;
      if (countdown === 0) {
        clearInterval(countdownInterval);
        countdownDisplay.style.display = "none"; // hide countdown
        document.getElementById('rps-stats').style.display = "flex"; // show stats
        generateComputerChoice();
        getResult();
      }
    }, 500); // 1000ms = 1s
  }

  function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3) + 1 // or you can use possibleChoices.length

    if (randomNumber === 1) {
      computerChoice = 'rock'
    }
    if (randomNumber === 2) {
      computerChoice = 'scissors'
    }
    if (randomNumber === 3) {
      computerChoice = 'paper'
    }
    computerChoiceDisplay.innerHTML = `<img src="${computerChoice}.png" alt="${computerChoice}">`
  }

  function getResult() {
    if (computerChoice === userChoice) {
      result = 'its a draw!'
    }
    if (computerChoice === 'rock' && userChoice === "paper") {
      result = 'you win!'
    }
    if (computerChoice === 'rock' && userChoice === "scissors") {
      result = 'you lost!'
    }
    if (computerChoice === 'paper' && userChoice === "scissors") {
      result = 'you win!'
    }
    if (computerChoice === 'paper' && userChoice === "rock") {
      result = 'you lose!'
    }
    if (computerChoice === 'scissors' && userChoice === "rock") {
      result = 'you win!'
    }
    if (computerChoice === 'scissors' && userChoice === "paper") {
      result = 'you lose!'
    }
    resultDisplay.innerHTML = result
  }
}
