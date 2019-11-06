// 有兩個玩家，遊戲有數個回合
// 玩家可在每一輪丟擲數次，該輪丟擲的所有加總分數會顯示在該輪的 round score
// 但玩家只要擲出一個 1，那一輪就不會顯示分數，並且換下一個人
// 玩家可以選擇保留分數，並加進總分。然後換下一個人
// 先達到 100 點的人勝利

var scores, roundScore, activePlayer, gamePlaying;

// 初始化的函數
init();

// 儲存前一個骰子
var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        // 1.產生隨機數字
        var dice = Math.floor(Math.random() * 6) + 1;
        // 2. 顯示搖出的結果
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 連續搖出2個6

        if (dice === 6 && lastDice === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();

        } else if (dice !== 1) {

            // 如果搖出的不是1，將分數累加
            roundScore += dice; // 等於 roundScore  = roundScore + dice
            document.querySelector('#current-' + activePlayer).textContent = roundScore; // 放置分數值
        } else {
            // next player
            nextPlayer();
        }

        lastDice = dice;
    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {
    // 把此輪累加的分數加進總分
    if (gamePlaying) {
        scores[activePlayer] += roundScore; //scores[activePlayer] + roundScore 現在這一輪的分數加上已經累積的分數

        // upadte the ui
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        var input = document.querySelector('.final-score').value;
        var winningScore;

        if (input) {
            winningScore = input;
        } else {
            winningScore = 20;
        }
        // check if the player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }

    }


});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}