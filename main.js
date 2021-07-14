/*////////////////////////////////////////////////////////////*/
/*/////////////////// DEFINING VARIABLES /////////////////////*/
/*////////////////////////////////////////////////////////////*/
let startBtn = document.getElementById("start");
let resetBtn = document.getElementById("reset");
let rock = document.getElementById("rock");
let paper = document.getElementById("paper");
let scissors = document.getElementById("scissors");
let score = document.getElementById("score");
let result = document.getElementById("result");
let AIChoice = document.getElementById("AI_choice");
let myChoice = document.getElementById("my_choice");
let AIChoiceSrc, myChoiceSrc;
let winOrLose = document.getElementById("win_or_lose");
let selectedFigureID;
let myScore = 0;
let AIScore = 0;

/*////////////////////////////////////////////////////////////*/
/*/////////////////// DEFINING FUNCTIONS /////////////////////*/
/*////////////////////////////////////////////////////////////*/

function start() {
    if (!checkIfSelected()) return;
    startBtn.style.visibility = "hidden";
    startBtn.style.opacity = 0;
    result.style.display = "flex";
    setTimeout(() => {
        result.style.opacity = 1;
    }, 0);
    action(selectedFigureID);
}

function reset() {
    startBtn.style.opacity = 1;
    startBtn.style.visibility = "visible";
    result.style.opacity = 0;
    setTimeout(() => {
        result.style.display = "none";
    }, 500);
    rock.className = "options";
    paper.className = "options";
    scissors.className = "options";
    winOrLose.innerHTML = "LET'S GO";
    
} 

function checkIfSelected() {
    if (rock.className == "options selected" || paper.className == "options selected" || scissors.className == "options selected") return true;
    return false
}

function action(figureID) {
    let choices = ["rock", "paper", "scissors"];
    let rndChoice = choices[Math.floor(Math.random() * 3)];
    AIChoiceSrc = `./Images/${rndChoice}.png`;
    myChoiceSrc = `./Images/${figureID}.png`;
    let AIfigure = rndChoice;
    let myFigure = figureID;
    AIChoice.setAttribute("src", "./Images/rock.png");
    myChoice.setAttribute("src", "./Images/rock.png");

    setTimeout(() => {
        let up = true;
        let string = ["CHI", "KI", "PUKI"];
        let index = 0;
        let count = 0;
        let shake = setInterval(() => {
            if (up) {
                AIChoice.style.transform = "translate(-50%) rotate(90deg)";
                myChoice.style.transform = "translate(-50%) rotate(90deg)";
                
            } else {
                AIChoice.style.transform = "translate(-50%) rotate(0)";
                myChoice.style.transform = "translate(-50%) rotate(0)";
                winOrLose.innerHTML = `${string[index++]}`;
                winOrLose.style.color = "white";  
            }
            up = !up;
            count++;
            if (count == 6) {
                clearInterval(shake);
                AIChoice.setAttribute("src", AIChoiceSrc);
                myChoice.setAttribute("src", myChoiceSrc);
                setTimeout(() => {
                    winOrLoseFn(AIfigure, myFigure);
                }, 500)
            }
        }, 300);
    }, 500)
}

function select(figure) {
    if (figure.className == "options selected") return;
    selectedFigureID = figure.id;
    reset();
    figure.className = "options selected";   
}

function winOrLoseFn(AI, my) {
    if (AI == my) {
        winOrLose.innerHTML = "TIE";
        winOrLose.style.color = "orange";
        score.innerHTML = `You: ${++myScore} - AI: ${++AIScore}`;
    } else if (AI == "rock" && my == "scissors") {
        winOrLose.innerHTML = "LOSE";
        winOrLose.style.color = "red";
        score.innerHTML = `You: ${myScore} - AI: ${++AIScore}`;
    } else if (AI == "rock" && my == "paper") {
        winOrLose.innerHTML = "WIN";
        winOrLose.style.color = "green";
        score.innerHTML = `You: ${++myScore} - AI: ${AIScore}`;
    } else if (AI == "paper" && my == "scissors") {
        winOrLose.innerHTML = "WIN";
        winOrLose.style.color = "green";
        score.innerHTML = `You: ${++myScore} - AI: ${AIScore}`;
    }else if (AI == "paper" && my == "rock") {
        winOrLose.innerHTML = "LOSE";
        winOrLose.style.color = "red";
        score.innerHTML = `You: ${myScore} - AI: ${++AIScore}`;
    }else if (AI == "scissors" && my == "rock") {
        winOrLose.innerHTML = "WIN";
        winOrLose.style.color = "green";
        score.innerHTML = `You: ${++myScore} - AI: ${AIScore}`;
    }else if (AI == "scissors" && my == "paper") {
        winOrLose.innerHTML = "LOSE";
        winOrLose.style.color = "red";
        score.innerHTML = `You: ${myScore} - AI: ${++AIScore}`;
    }
}

/*////////////////////////////////////////////////////////////*/
/*//////////////////// CALLING VARIABLES /////////////////////*/
/*////////////////////////////////////////////////////////////*/

startBtn.addEventListener("click", start);
resetBtn.addEventListener("click", reset);
rock.addEventListener("click", () => { select(rock) });
paper.addEventListener("click", () => { select(paper); });
scissors.addEventListener("click", () => { select(scissors); });