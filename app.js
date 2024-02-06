const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

const words = [
"acido",
"cisto",
"dente",
"edema",
"febre",
"gesso",
"jejum",
"lupus",
"nervo",
"obito",
"pulso",
"sarna",
"tumor",
"virus",
"zinco",
"tenso",
"urina",
"valva",
"ovulo",
"placa",
"teste",
"unhas",
"veias",
"dedos",
"fenda",
"graxo",
"haste",
"ileal",
"labio",
"ossos",
"queda",
"rosto",
"sonda",
"torax",
"toque",
"sinal",
"renal",
"molar",
"linfa",
"humor",
"fator",
"dores",
"colon",
"peito",
"nariz",
"mente",
"leito",
"fibra",
"exame",
"dieta",
"coxas",
"aorta",
"perna",
"femur",
"doses",
"agudo",
"aftas",
"acnes",
"emend",
"ferro",
"cipro",
"xanax",
"tylex",
"zomig",
"lasix",
"pinca",
"gases",
"dorso",
"palma",
"punho",
"penis",
"calos",
"lesao",
"mamas",
"retal",
"vulva",
"ictal",
"derme",
"verme",
"jelco"
  ]
  
let wordle = words[Math.floor(Math.random()*words.length)].toUpperCase()

const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '⬅️',
]

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

let currentRow = 0
let currentTile = 0
let isGameOver = false

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)

    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex +
        'tile-' + guessIndex)
        tileElement.classList.add('tile')

        rowElement.append(tileElement)
    })

    tileDisplay.append(rowElement)
})

keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})

const handleClick = (key) => {
    if (key === '⬅️') {
        deleteLetter()
        return
    }

    if (key === 'ENTER') {
        checkRow()
        return
    }

    addLetter(key)
}

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + 'tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
    }
}

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + 'tile-' + currentTile)
        tile.textContent= ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')


    if (currentTile > 4) {
         
         flipTile()
         if (wordle == guess){
            showMessage('Excelente! 🎉 Te espero para o desafio de amanhã 😉')
            isGameOver = true
            return
         }
         else {
            if (currentRow >= 5) {
                isGameOver = true
                showMessage('Você perdeu! ❌ A palavra era ' + wordle + '. Tente novamente amanhã!')
                return
            }
            if (currentRow < 5) {
                currentRow++
                currentTile = 0
            }
         }
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)

    setTimeout(() => messageDisplay.removeChild(messageElement), 7500)
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle
    let guess = []
    
    rowTiles.forEach(tile => {
        guess.push({letter: tile.getAttribute('data'), 
        color: 'grey-overlay'})
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if(checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout (() =>{
          tile.classList.add('flip')
          tile.classList.add(guess[index].color)
          addColorToKey(guess[index].letter, guess[index].color)
        }, 500 * index)
    })
}
