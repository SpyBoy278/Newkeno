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
    return player.filter(n => drawn.includes(n)).length;
}

// Simple payout table
const payouts = {1:1, 2:3, 3:10, 4:50, 5:200};

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
    let win = (payouts[matches] || 0) * bet;

    // Display drawn numbers
    drawnDiv.innerHTML = "Drawn Numbers: ";
    drawn.forEach(n => {
        let d = document.createElement('span');
        d.textContent = n;
        d.classList.add('drawn');
        drawnDiv.appendChild(d);
    });

    // Display results
    resultsDiv.innerHTML = `You matched ${matches} numbers. You won $${win.toFixed(2)}!`;
});
