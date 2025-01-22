const questions = [{
    img_link: "assets/illustr_0.png",
    text: "Quelle etoile est la plus brillante sur le ciel de nuit?",
    answers:
    ["Altair", "Polaire", "Sirius", "Venus"],
    correct:3,
    index: 0
},

{
    img_link: "assets/illustr_1.png",
    text: "Lequel de ces objets est le plus loin de nous?",
    answers:
    ["Lune", "Mars", "Station spatiale internationale","Etoile filante"],
    correct:2,
    index: 1
},

{
    img_link: "assets/illustr_2.png",
    text: "Quelle image montre une éclipse lunaire ?",
    answers:
    ["1", "2", "3","4"],
    correct:2,
    index: 2
}
,

{
    img_link: "assets/illustr_3.png",
    text: "Qu’est-ce qui n’est pas le nom de constellation ?",
    answers:
    ["Hercules", "Horloge", "Coquelicot","Paon"],
    correct:3,
    index: 3
}
];


let state = {
    currentQuestion: 0,
    currentScore: 0,
    currentQuiz: 0,

}

function setState(){
    localStorage.setItem("currentState", JSON.stringify(state));
}

function getState(){
    state = JSON.parse(localStorage.getItem("currentState"));
}

function addPoint(){
    getState();
    state.currentScore += 1;
    setState();
}

function nextQuestion(){
    getState();
    state.currentQuestion += 1;
    setState();
}

function getCorrectAnswer(){
    return getQuestion()['correct'];
}

function getNextQuestion(){
    nextQuestion();
    if (state.currentQuestion != questions.slice(-1).index){
        return questions[state.currentQuestion];
    }
    else{
        return undefined;
    }
}

function getAnswers(question){
    return question.answers;
}

function getScore(){
    getState();
    return state.currentScore;
}

function getQuestion(){
    getState();
    return questions[state.currentQuestion];
}

function getQuiz(){
    getState();
    return state.currentQuiz;
}

function clearState(){
    state.currentQuestion = 0;
    state.currentScore = 0;
    state.currentQuiz = 0;
}

function clearStorage(){
    localStorage.clear();
}
