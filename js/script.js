//CONSTANTS
const AUDIO = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3');
const RPS_LOOKUP = {
    r: { img: 'css/images/rock.jpeg', beats: 's'},
    p: { img: 'css/images/lined_paper.jpg', beats: 'r'},
    s: { img: 'css/images/scissors.jpeg', beats: 'p'},
}

//STATE VARS
let scores; //object: p: player, t: turn, c: computer, t:tie
let results; //object: p: paper, r: rock, s: scissors
let winner; //string p if player wins, t for tie, c for computer

//CACHED ELS
const pResultEl = document.getElementById('p-result');
const cResultEl = document.getElementById('c-result');

//EVENTLISTENERS
//event delegation: a single event listener can listen for any 
//number of events from any of its descendents bc of event bubbling
document.querySelector('main')
    .addEventListener('click', handleChoice);

//FUNCTIONS
initialize();
//initialize all state and then call render
function initialize() {
    scores = {
        p: 0, 
        t: 0,
        c: 0
    };
    results = {
        p: 'r',
        c: 'r',
    };
    winner = 't';
}
// in response to user interaction (player makes a move),
// we update all impacted state that needs to change, finally, call render
function handleChoice(event) {
    //guards: 
    if(event.target.tagName !== 'BUTTON') return;
    results.p = event.target.innerText.toLowerCase();
    results.c = getRandomRPS();
    winner = getWinner();
    scores[winner] += 1;
    console.log(scores)

    render();
}

function getWinner() {
    // when thinking of multiple if/else statements always ask yourself:
    // could I be using data structures to write more concise and elegant code?
    if(results.p === results.c) return 't';
    return RPS_LOOKUP[results.p].beats === results.c ? 'p' : 'c'
}

// creating the computers random selection
function getRandomRPS() {
    const rps = Object.keys(RPS_LOOKUP);
    //Object.keys returns an array of indicies from an object
    const randomIdx = Math.floor(Math.random() * rps.length);
    // using Math methods to randomize the array indicies, returning below
    return rps[randomIdx];
}

function renderScores() {
    //for every key in the scores object, get each element by their id
    //we do this dynamically with template literals
    for (let key in scores) {
        const scoreEl = document.getElementById(`${key}-score`);
        scoreEl.innerText = scores[key]
    }
}

function renderResults() {
    pResultEl.src = RPS_LOOKUP[results.p].img
    cResultEl.src = RPS_LOOKUP[results.c].img
    pResultEl.style.borderColor = winner === 'p' ? 'green' : 'white'
    cResultEl.style.borderColor = winner === 'c' ? 'green' : 'white'
}

// render function should transfer or visualize all state
function render() {
    renderScores();
    renderResults();
}

