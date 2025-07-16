const btnsEl = document.querySelectorAll("button")
const resultEl = document.getElementById("result");

let playerScore = 0;
let computerScore = 0;
let tie = 0;

btnsEl.forEach((button) => {
    button.addEventListener("click", () => {
        const result = playRound(button.id, computerPlay());
        resultEl.textContent = result;
        document.getElementById("user-score").textContent = playerScore;
        document.getElementById("computer-score").textContent = computerScore;
        document.getElementById("tie").textContent = tie;

    })
})

function computerPlay() {
    const choices = ["rock", "paper", "scissor"];
    const randomChoice = Math.floor(Math.random() * choices.length);
    return choices[randomChoice];
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        tie++;
        return "It's a tie!";
    }

    else if (
        (playerSelection === "rock" && computerSelection === "scissor") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissor" && computerSelection === "paper")
    ) {
        +playerScore++;
        return `You Win! ${playerSelection} beats ${computerSelection}`;
    }

    else {
        +computerScore++;
        return `You Lose! ${computerSelection} beats ${playerSelection}`;
    }
}
