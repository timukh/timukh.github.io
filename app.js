/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/




var scores, roundScore, activePlayer, gamePlay, prevDiceValue;

reset();


document.querySelector('.btn-roll').addEventListener('click',function(){

    if(gamePlay){
        playSound();
        var dice = Math.floor(Math.random() * 6) +1 ;
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-'+dice+'.png';
    if(prevDiceValue !== 0 && prevDiceValue === 6 && prevDiceValue === dice){
        scores[activePlayer] = 0;
        nextPlayer();
    }else {
        prevDiceValue = dice;
    }
    if(dice !== 1){
        // add the score
        roundScore += dice;
        document.querySelector('#current-'+activePlayer).textContent = roundScore;
    }else {
        nextPlayer();
    }

    }

});

document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gamePlay){
        scores[activePlayer] += roundScore;
    document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];

    if(scores[activePlayer] >= 100){
        document.querySelector('#name-'+activePlayer).textContent = "Winner!";
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.dice').style.display = 'none';
        winner();
        gamePlay = false;

    } else {
        nextPlayer();
    }
    }    

    
});


function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click',reset);

function reset(){
    scores = [0,0];
roundScore = 0;
activePlayer = 0;

gamePlay = true;

document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0').textContent = "Player 1";
document.getElementById('name-1').textContent = "Player 2";
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
}

function playSound(){
    new Audio('diceRoll.m4a').play();
}

function winner(){
    new Audio('winner.wav').play();
}