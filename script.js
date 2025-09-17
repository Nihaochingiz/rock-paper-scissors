class RockPaperScissors {
  constructor() {
    this.userScore = 0;
    this.computerScore = 0;
    this.choices = ["rock", "paper", "scissors"];
    this.choiceEmojis = {
      rock: "✊",
      paper: "✋",
      scissors: "✌️",
    };

    this.initializeGame();
  }

  initializeGame() {
    this.userScoreElement = document.getElementById("user-score");
    this.computerScoreElement = document.getElementById("computer-score");
    this.resultTextElement = document.getElementById("result-text");
    this.choicesTextElement = document.getElementById("choices-text");
    this.resetButton = document.getElementById("reset-btn");

    this.setupEventListeners();
    this.updateScores();
  }

  setupEventListeners() {
    // Слушатели для кнопок выбора
    document.querySelectorAll(".choice").forEach((button) => {
      button.addEventListener("click", (e) => {
        const userChoice = e.target.dataset.choice;
        this.playRound(userChoice);
      });
    });

    // Слушатель для кнопки сброса
    this.resetButton.addEventListener("click", () => {
      this.resetGame();
    });
  }

  playRound(userChoice) {
    const computerChoice = this.getComputerChoice();
    const result = this.determineWinner(userChoice, computerChoice);

    this.displayChoices(userChoice, computerChoice);
    this.displayResult(result, userChoice, computerChoice);
    this.updateScores();
  }

  getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * this.choices.length);
    return this.choices[randomIndex];
  }

  determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
      return "draw";
    }

    const winConditions = {
      rock: "scissors",
      paper: "rock",
      scissors: "paper",
    };

    return winConditions[userChoice] === computerChoice ? "win" : "lose";
  }

  displayChoices(userChoice, computerChoice) {
    this.choicesTextElement.textContent = `Вы: ${this.choiceEmojis[userChoice]} vs Компьютер: ${this.choiceEmojis[computerChoice]}`;
  }

  displayResult(result, userChoice, computerChoice) {
    let message = "";
    let resultClass = "";

    switch (result) {
      case "win":
        this.userScore++;
        message = "Вы выиграли! 🎉";
        resultClass = "win";
        break;
      case "lose":
        this.computerScore++;
        message = "Компьютер выиграл! 😢";
        resultClass = "lose";
        break;
      case "draw":
        message = "Ничья! 🤝";
        resultClass = "draw";
        break;
    }

    this.resultTextElement.textContent = message;
    this.resultTextElement.className = resultClass;
  }

  updateScores() {
    this.userScoreElement.textContent = this.userScore;
    this.computerScoreElement.textContent = this.computerScore;
  }

  resetGame() {
    this.userScore = 0;
    this.computerScore = 0;
    this.updateScores();
    this.resultTextElement.textContent = "Сделайте свой выбор!";
    this.resultTextElement.className = "";
    this.choicesTextElement.textContent = "";
  }
}

// Инициализация игры при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  new RockPaperScissors();
});
