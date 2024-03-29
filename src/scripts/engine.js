const state = {
    view:{
        squares:document.querySelectorAll(".square"),
        enemy:document.querySelector(".enemy"),
        timeLeft:document.querySelector("#time-left"),
        score:document.querySelector("#score"),
        lives:document.querySelector("#lives")
    },
    values:{
        timerId : null,
        countDownTimerId: setInterval(countDown,1000),
        gameVelocity : 1000,
        hitPosition:0,
        result:0,
        currentTime: 10,
        resetTime:10,
        resetScore:0,
        live:3
    },
};


function countDown(){
    state.values.currentTime --;
    state.view.timeLeft.textContent = state.values.currentTime;
    if(state.values.currentTime <= 0){
        alert("Game Over a sua pontuação foi: " + state.values.result);
        state.values.live--;
        state.view.lives.textContent = state.values.live;
        state.values.currentTime = state.values.resetTime;
        state.view.score.textContent = state.values.resetScore;
        state.values.result = state.values.resetScore;
        gameOver();
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        
        
        
    }
}



function playSound(audioName){
    let audio = new Audio(`/src/audios/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });
    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare= state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare,state.values.gameVelocity);
}

function addListenerHitBox (){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown",()=>{
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
           
        });
    });

}
function gameOver(){
    if(state.values.live===0){
        alert("Fim de Jogo");
        playSound("gameover");
        state.values.currentTime = state.values.resetTime;
        state.view.score.textContent = state.values.resetScore;
        state.values.result = state.values.resetScore;
        state.values.live = 3;
        state.view.lives.textContent = state.values.live;
        
    }
}


function init(){
    moveEnemy();
    addListenerHitBox();
    countDown();
    
    
    
}

init();