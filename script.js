const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();
}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if(questionCount < questions.length - 1){
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
    }
    else{
        showResultBox();
    }
}

const optionList = document.querySelector('.option-list');

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    if (questions[index].options.length === 0) {
        // Special case for the name question
        const inputTag = `<input type="text" id="name-input" placeholder="Enter your name" />`;
        optionList.innerHTML = inputTag;

        const inputField = document.querySelector('#name-input');
        inputField.focus();

        inputField.addEventListener('blur', () => {
            const name = inputField.value;
            if (name) {
                username = name;  // Store the user's name
                nextBtn.classList.add('active');
            }
        });
    } else {
        // Regular case for multiple choice questions
        let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
                         <div class="option"><span>${questions[index].options[1]}</span></div>`;

        optionList.innerHTML = optionTag;

        const option = document.querySelectorAll('.option');
        for (let i = 0; i < option.length; i++) {
            option[i].setAttribute('onclick', 'optionSelected(this)')
        }
    }
}

function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if(userAnswer == correctAnswer){
        console.log("correct");
        answer.classList.add('correct');
        userScore++;
        headerScore();
    }else{
        answer.classList.add('incorrect');

        //if answer is incorrect, auto select correct option
        for(let i = 0; i < allOptions; i++){
            if(optionList.children[i].textContent == correctAnswer){
                optionList.children[i].setAttribute('class', 'option correct')
            }
        }
    }
    //After user has selected, disable all option
    for(let i = 0; i < allOptions; i++){
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}

function questionCounter(index){
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / 5`;
}

function showResultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = 0;  // Start from 0, not -1
    let progressEndValue = (userScore / questions.length) * 100;  // Ensure percentage is calculated correctly
    let speed = 20;  // Adjust this speed to control how fast the progress bar updates

    // Ensure the percentage doesn't go beyond 100%
    if (progressEndValue > 100) {
        progressEndValue = 100;
    }

    let progress = setInterval(() => {
        if (progressStartValue < progressEndValue) {
            progressStartValue++;  // Increment progress
        }

        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#AA2C86 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

        if (progressStartValue >= progressEndValue) {
            clearInterval(progress);  // Stop once the progress reaches the correct percentage
        }
    }, speed);
}
