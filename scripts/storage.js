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

function getScore(){
    getState();
    return state.currentScore;
}

function getQuestion(){
    getState();
    return state.currentQuestion;
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
