const question = document.getElementById("question");
const options = document.querySelector(".options");
const otherBtn = document.getElementById("other-btn");


const questionData = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text: "Vatican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Shri Lanka", correct: false},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctica", correct: true},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]
    }
]

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    showQuestion();
    otherBtn.style.display = "none";
}

function showQuestion () {
    let currentQuestionNo = currentQuestionIndex + 1;
    let currentQuestionData = questionData[currentQuestionIndex]
    question.innerHTML = currentQuestionNo + ". " + currentQuestionData.question;

   let answers = currentQuestionData.answers;
    answers.forEach(answer => {
        let button = document.createElement("button");
        button.classList.add("option");
        button.innerHTML = answer.text
        button.dataset.correct = answer.correct
        options.appendChild(button)
    })

    let buttons = Array.from(options.children);
    buttons.forEach(button => {
        button.addEventListener("click", e=> {
            if(button.dataset.correct == "true") {
                button.classList.add("correct");
                score++;
            } else {
                button.classList.add("incorrect");
                buttons.forEach(button=> {
                    if(button.dataset.correct == "true") {
                        button.classList.add("correct");
                    }
                })
            }
            otherBtn.innerHTML = "Next";
            otherBtn.style.display = "block";
            button.disabled = true;
        })
    })
}

showQuestion();

function reset() {
    while(options.firstChild) {
            options.removeChild(options.firstChild)
    }

}

otherBtn.addEventListener("click", e=> {
    reset();
    currentQuestionIndex++;
    if(currentQuestionIndex < questionData.length) {
        showQuestion();
    } else if(currentQuestionIndex == questionData.length) {
        question.innerHTML = `You scored ${score} of ${questionData.length}`
        otherBtn.innerHTML = "Play Again";
    } else {
        startQuiz();
    }
})
