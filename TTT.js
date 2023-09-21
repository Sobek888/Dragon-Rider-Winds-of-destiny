export function TTT() {
  
  const squares = document.querySelectorAll('.square')
  const mole = document.querySelector('.mole')
  const timeLeft = document.querySelector('#time-left')
  const score = document.querySelector('#score')
  const text = document.querySelector("#text")
  const scoreBoard = document.querySelector("#scoreBoard")

  text.style.display = "none";
  game.style.display = "none";
  monsterStats.style.display = "none";
  stats.style.display = "none";
  grid.style.display = "flex";
  scoreBoard.style.display = "flex";

  let miniResult = 0
  let hitPosition
  let currentTime = 60
  let timerId = null

  function randomSquare() {
    squares.forEach(square => {
      square.classList.remove('mole')
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)]
    randomSquare.classList.add('mole')

    hitPosition = randomSquare.id
  }

  squares.forEach(square => {
    square.addEventListener('mousedown', () => {
      if (square.id == hitPosition) {
        miniResult++
        score.textContent = miniResult
        hitPosition = null
      }
    })
  })

  function moveMole() {
    timerId = setInterval(randomSquare, 500)
  }

  moveMole()

  function result() {
    field.style.display = "none";
    text.innerText = "the game is over" + miniResult;
  }

  function countDown() {
    currentTime--
    timeLeft.textContent = currentTime

    

    if (currentTime == 0) {
      clearInterval(countDownTimerId)
      clearInterval(timerId)
      result();
    }

  }

  let countDownTimerId = setInterval(countDown, 1000)
}
