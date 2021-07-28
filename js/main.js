const GAME_TIME = 10
const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time')
const gameButton = document.querySelector('.button');
let score = 0;
let words = [];

let time = 3;
let isPlaying = false
let timeInterval = false
let checkInterval = false
init();

function init() {
    buttonChange('loading')
    getWords();
    wordInput.addEventListener('input', checkMatch);
}

function getWords() {
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
        .then(function (response) {
            response.data.forEach((word) => {
                word.length < 8 ? words.push(word) : ''
            });
            buttonChange('start');

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}

function run() {
    if(isPlaying){
        return false;
    }
    time = GAME_TIME;
    wordInput.focus()
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 100)
    buttonChange('playing')
    isPlaying=true;
}

function checkStatus() {
    if (!isPlaying && time === 0) {
        buttonChange('end')
        clearInterval(checkInterval);
    }
}

function checkMatch() {
    if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        wordInput.value = '';
        if (!isPlaying) {
            return;
        }
        score++;
        scoreDisplay.innerText = score;
        const randomIndex = Math.floor(Math.random() * words.length);
        console.log(randomIndex);
        wordDisplay.innerText = words[randomIndex];
    }
}

function countDown() {
    time > 0 ? time-- : isPlaying = false;
    if (!isPlaying) {
        clearInterval(timeInterval);
    }
    timeDisplay.innerText = time;
}

function buttonChange(text) {
    gameButton.innerText = text;
    text == 'start' ? gameButton.classList.remove('loading') : gameButton.classList.add('loading');
}