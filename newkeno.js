const numbersGrid = document.getElementById('numbers-grid');
const playBtn = document.getElementById('play-btn');
const resultsDiv = document.getElementById('results');
const drawnDiv = document.getElementById('drawn-numbers');
const betInput = document.getElementById('bet-amount');

let selectedNumbers = [];

// Create 1–80 number grid
for(let i=1; i<=80; i++){
    const numDiv = document.createElement('div');
    numDiv.textContent = i;
    numDiv.classList.add('number');
    numDiv.addEventListener('click', () => {
        if(selectedNumbers.includes(i)){
            selectedNumbers = selectedNumbers.filter(n => n !== i);
            numDiv.classList.remove('selected');
        } else if(selectedNumbers.length < 20){
            selectedNumbers.push(i);
            numDiv.classList.add('selected');
        }
    });
    numbersGrid.appendChild(numDiv);
}

// Randomly draw 20 numbers
function drawNumbers(){
    let draw = [];
    while(draw.length < 20){
        let n = Math.floor(Math.random() * 80) + 1;
        if(!draw.includes(n)) draw.push(n);
    }
    return draw;
}

// Compare matches
function countMatches(player, drawn){
    return player.filter(n => drawn.includes(n));
}

// Simple payout table
const payouts = {1:1, 2:3, 3:10, 4:50, 5:200};

// Animate drawn numbers
function animateDraw(drawn, matches, bet) {
    drawnDiv.innerHTML = "Drawn Numbers: ";
    let i = 0;

    let interval = setInterval(() => {
        if(i >= drawn.length){
            clearInterval(interval);
            // Show result popup
            let win = (payouts[matches.length] || 0) * bet;
            alert(`🎉 You matched ${matches.length} numbers! You won $${win.toFixed(2)}!`);
            return;
        }
        const n = drawn[i];
        let d = document.createElement('span');
        d.textContent = n;
        d.classList.add('drawn');
        if(selectedNumbers.includes(n)) d.style.backgroundColor = 'green';
        drawnDiv.appendChild(d);
        i++;
    }, 200); // 200ms per number
}

playBtn.addEventListener('click', () => {
    if(selectedNumbers.length === 0){
        alert("Select at least 1 number!");
        return;
    }
    let bet = parseFloat(betInput.value);
    if(bet < 0.2 || bet > 500){
        alert("Bet must be $0.2 – $500");
        return;
    }

    let drawn = drawNumbers();
    let matches = countMatches(selectedNumbers, drawn);

    animateDraw(drawn, matches, bet);
});
