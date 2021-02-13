const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;
let phrases = [
    'The rain in Spain falls mainly on the plain',
    'All good things must come to an end',
    'Good things come to those who wait',
    'Necessity is the mother of invention',
    'A stitch in time saves nine'
];
let letterFound;
let charElements = document.getElementsByClassName('letter');

document.getElementsByClassName('btn__reset')[0].addEventListener('click', (event) =>  {
    if(event.target.textContent === 'Start Game'){
    event.target.parentNode.style.display = 'none';
    addPhraseToDisplay(getRandomPhraseAsArray(phrases));
    } else if (event.target.textContent === 'Play Again') {
        document.getElementById('phrase').firstElementChild.remove();
        let ul = document.createElement('UL');
        document.getElementById('phrase').appendChild(ul);
        addPhraseToDisplay(getRandomPhraseAsArray(phrases));
        let disabledButtons = document.getElementsByClassName('chosen');
        for(i = disabledButtons.length - 1; i >= 0; i--) {
            disabledButtons[i].disabled = false;    
            disabledButtons[i].className = '';
        }
        for(i = missed; i > 0; i--){
            let heartLi = document.createElement('LI');
            heartLi.className = 'tries';
            heartLi.innerHTML = `<img src="images/liveHeart.png" height="35px" width="30px"></img>`;
            document.getElementById('scoreboard').firstElementChild.append(heartLi);
        }
        missed = 0;
        event.target.parentNode.style.display = 'none';
    }
});

function getRandomPhraseAsArray(arr) {
    let randNum = Math.floor(Math.random()*(arr.length));
    return arr[randNum].split('');
    }

function addPhraseToDisplay(arr) {
    for(let i = 0; i < arr.length; i++) {
        let li = document.createElement('LI');
        li.innerHTML = arr[i];
        if(li.innerHTML === ' '){
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
        li = phrase.firstElementChild.appendChild(li);
    }
}

    function checkLetter(selectedButton) {
        charElements = document.getElementsByClassName('letter');
        let flag = false;
        for(i = charElements.length - 1; i >= 0; i--) {
            if(charElements[i].textContent.toUpperCase() === selectedButton.textContent.toUpperCase()) {
                charElements[i].classList.add('show');
                flag = true;
            } else {
                
            }
            }
            if(flag) {
                return selectedButton.textContent;
            } else {
                return null;
            }
        }
    

    qwerty.addEventListener('click', (event) => {
        if(event.target.tagName === 'BUTTON') {
            buttonPressed = event.target;
            buttonPressed.className = 'chosen';
            buttonPressed.disabled = true;
            letterFound = checkLetter(buttonPressed);
            if(letterFound === null && missed < 5) {
                missed++;
                document.getElementById('scoreboard').firstElementChild.firstElementChild.remove();
            }
        }
        checkWin();
    });

    function checkWin() {
        let overlay = document.getElementById('overlay');
        if(document.getElementsByClassName('show').length === document.getElementsByClassName('letter').length) {
            overlay.className = 'win';
            overlay.firstElementChild.textContent = 'Congratulations! You won!';
            overlay.style.display = 'flex';
            overlay.lastElementChild.textContent = 'Play Again';
        } else if (missed === 5){
            overlay.className = 'lose';
            overlay.firstElementChild.textContent = 'Sorry, please try again!';
            overlay.style.display = 'flex';
            overlay.lastElementChild.textContent = 'Play Again';
            overlay.lastElementChild.style.backgroundColor = 'yellow';
        }
    }
