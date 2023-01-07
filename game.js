const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion ={}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question:
        "What is highest score for Virat Kohli in ODI cricket?",
        choice1:"150",
        choice2:"183",
        choice3:"101",
        choice4:"None of the above",
        answer: 2,
    },
    {
        question:
        "Who Wins the Mens ODI World Cup in 2011?",
        choice1:"Australia",
        choice2:"England",
        choice3:"SriLanka",
        choice4:"India",
        answer: 4,
    },
    {
        question:
        "Which batsman has most double hundred in ODIs?",
        choice1:"Virat Kohli",
        choice2:"Virender Sehwag",
        choice3:"Rohit Sharma",
        choice4:"Sachin Tendulkar",
        answer: 3,
    },
    {
        question:
        "Which bowler has highest bowling speed record?",
        choice1:"Shoaib Akhtar",
        choice2:"Brett Lee",
        choice3:"Umran Malik",
        choice4:"Haris Rauf",
        answer: 1,
    }
]
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () =>{
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
getNewQuestion = () =>{
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    availableQuestions.splice(questionsIndex, 1)
    acceptingAnswers = true
}
choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct':
        'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})
incrementScore = num => {
    score +=num
    scoreText.innerText = score
}
startGame()