'use strict';
const goalPoints = 70
const diceImage = document.querySelector('img')
const btnRollDice = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
const btnNewGame = document.querySelector('.btn--new')
const allPlayers = document.querySelectorAll('.player')
const themeChange = document.getElementById('theme')
let turn = 0
let scorePlayer = null
let currentPlayerValue = null
let currentValueBank = 0
let diceNumber = 1
let currentPlayer = allPlayers[turn]
let gameOver = false

const rollDice = async function() {
    const diceFaces = ['dice-1.png', 'dice-2.png', 'dice-3.png', 'dice-4.png', 'dice-5.png', 'dice-6.png']
    let counter = 0
    let diceInterval;

    function animateDice() {
        const randomIndex = Math.floor(Math.random() * diceFaces.length)

        const diceFace = diceFaces[randomIndex]
        diceImage.src = diceFace

        counter++

        if (counter === 20) {
            clearInterval(diceInterval)
            diceImage.src = `dice-${diceNumber}.png`
            return
        }
    }

    scorePlayer = document.getElementById(`score--${turn}`)
    currentPlayerValue = document.getElementById(`current--${turn}`)

    diceNumber = Math.trunc(Math.random() * (6)) + 1
    diceImage.classList.remove('hidden')
    diceInterval = setInterval(animateDice, 40)

    if(diceNumber === 1){
        changeTurn()
    } else {
        currentValueBank += diceNumber
        currentPlayerValue.textContent = currentValueBank

        let goalReached = Number(scorePlayer.textContent) + Number(currentPlayerValue.textContent)
        if(goalReached >= goalPoints){
            scorePlayer.textContent = goalReached
            currentPlayer.classList.toggle('player--winner')
            document.querySelector(`.winner--${turn}`).classList.toggle('hidden')

            btnRollDice.classList.toggle('disable')
            btnHold.classList.toggle('disable')
            gameOver = true
        }
    }
}

const changeTurn = function() {
    if (scorePlayer === null || currentPlayerValue === null) return

    if(diceNumber !== 1) scorePlayer.textContent = Number(scorePlayer.textContent) + currentValueBank
    currentPlayerValue.textContent = currentValueBank = 0

    if(currentPlayer.classList.contains('player--active')) currentPlayer.classList.remove('player--active')
    turn === 0 ? turn = 1 : turn = 0
    currentPlayer = allPlayers[turn]

    if(!currentPlayer.classList.contains('player--active')) currentPlayer.classList.add('player--active')
}

btnRollDice.addEventListener('click', rollDice)
btnHold.addEventListener('click', changeTurn)

btnNewGame.addEventListener('click', function() {
    diceImage.classList.add('hidden')

    for(let i = 0; i < allPlayers.length; i++) {
        document.getElementById(`score--${i}`).textContent = 0
        document.getElementById(`current--${i}`).textContent = 0

        if(gameOver) {
            if(allPlayers[i].classList.contains('player--winner')) {
                allPlayers[i].classList.remove('player--winner')
            }

            if(!document.querySelector(`.winner--${i}`).classList.contains('hidden'))
            document.querySelector(`.winner--${i}`).classList.add('hidden')


            btnRollDice.classList.remove('disable')
            btnHold.classList.remove('disable')
        }
    }

    if(turn !== 0) {
        allPlayers[turn].classList.remove('player--active')
        allPlayers[0].classList.add('player--active')
    }

    scorePlayer = null
    currentPlayerValue = null
    currentValueBank = 0
    turn = 0
    diceNumber = 1
    currentPlayer = allPlayers[turn]
    gameOver = false
})

themeChange.addEventListener('click', function() {
    const body = document.querySelector('body')
    const squareColor = document.querySelectorAll('.score')
    const current = document.querySelectorAll('.current')
    const currentLabel = document.querySelectorAll('.current-label')

    if (themeChange.checked) {
        body.style.backgroundImage = 'linear-gradient(to top left, #753682 0%, #bf2e34 100%)'
        squareColor[0].style.color = '#c7365f'
        squareColor[1].style.color = '#c7365f'
        current[0].style.backgroundColor = '#c7365f'
        current[1].style.backgroundColor = '#c7365f'
    } else {
        body.style.backgroundImage = 'linear-gradient(to top left, #020f4d 0%, #5e84ff 100%)'
        squareColor[0].style.color = '#51c0f3'
        squareColor[1].style.color = '#51c0f3'
        current[0].style.backgroundColor = '#51c0f3'
        current[1].style.backgroundColor = '#51c0f3'
    }
})