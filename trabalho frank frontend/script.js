// Dados iniciais
let currentQuestion = 0;
let correctAnswers = 0;

// Referências dos elementos do HTML
const progressBar = document.querySelector(".progress--bar");
const questionArea = document.querySelector(".questionArea");
const questionText = document.querySelector(".question");
const optionsArea = document.querySelector(".options");
const scoreArea = document.querySelector(".scoreArea");
const scoreText1 = document.querySelector(".scoreText1");
const scorePct = document.querySelector(".scorePct");
const scoreText2 = document.querySelector(".scoreText2");

// Evento Reset
document.querySelector(".scoreArea button").addEventListener("click", resetEvent);

// Funções
function showQuestion() {
  if (questions[currentQuestion]) {
    const q = questions[currentQuestion];

    // Atualiza a barra de progresso
    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

    // Oculta a área de pontuação e exibe a área de perguntas
    scoreArea.style.display = "none";
    questionArea.style.display = "block";

    // Define o texto da pergunta
    questionText.textContent = q.question;

    // Limpa as opções
    optionsArea.innerHTML = "";

    // Loop para criar as opções
    for (let i = 0; i < q.options.length; i++) {
      const option = document.createElement("div");
      option.setAttribute("data-op", i);
      option.classList.add("option");
      option.innerHTML = `<span>${i + 1}</span>${q.options[i]}`;
      option.addEventListener("click", optionClickEvent);
      optionsArea.appendChild(option);
    }
  } else {
    finishQuiz();
  }
}

function optionClickEvent(e) {
  const selectedOption = parseInt(e.target.getAttribute("data-op"));

  if (selectedOption === questions[currentQuestion].answer) {
    correctAnswers++;
  }

  currentQuestion++;

  showQuestion();
}

function finishQuiz() {
  const score = (correctAnswers / questions.length) * 100;

  questionArea.style.display = "none";
  scoreArea.style.display = "block";

  scoreText1.textContent = "Parabéns!";
  scorePct.textContent = `Acertou ${score.toFixed(0)}%`;
  scoreText2.textContent = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;
}

function resetEvent() {
  currentQuestion = 0;
  correctAnswers = 0;
  showQuestion();
}

showQuestion();
