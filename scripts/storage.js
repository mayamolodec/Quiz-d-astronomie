const questions_1 = [{
    img_link: "assets/illustr_0.png",
    question: "Quelle etoile est la plus brillante sur le ciel de nuit?",
    answers:
    ["Altair", "Polaire", "Sirius", "Venus"],
    correct:3
},

{
    img_link: "assets/illustr_1.png",
    question: "Lequel de ces objets est le plus loin de nous?",
    answers:
    ["Lune", "Mars", "Station spatiale internationale","Etoile filante"],
    correct:2
},

{
    img_link: "assets/illustr_2.png",
    question: "Quelle image montre une éclipse lunaire ?",
    answers:
    ["1", "2", "3","4"],
    correct:2
}
,

{
    img_link: "assets/illustr_3.png",
    question: "Qu’est-ce qui n’est pas le nom de constellation ?",
    answers:
    ["Hercules", "Horloge", "Coquelicot","Paon"],
    correct:3
}
];

const questions_2 = [
{
    img_link:"assets/illustr2_0.png",
    question: "Laquelle parmi ces photos en longue exposition a été prise sur l'équateur?",
    answers:["1", "2", "3", "4"],
    correct:1
},
{
    img_link:"assets/illustr2_1.jpg",
    question:"Mais qu’est-ce que c’est q’ça dans le ciel?",
    answers:
    ["Etoile filante", "C’est un problème de caméra", 
    "OVNI", "Comète"],
    correct:4
},
{
    img_link:"assets/illustr2_2.jpg",
    question:"On observe une éclipse lunaire: sur quelle phase de Lune on est?",
    answers:["Nouvelle Lune", "Premiere/Derniere quartier",
        "Pleine Lune","Toutes ces options sont possibles"],
    correct:3
},
{
    img_link:"assets/illustr2_3.jpg",
    question:"C’est vraiment clair, on ne voit que la Lune et un objet lumineux tout près. Qu’est-ce que c’est ?",
    answers:["Etoile Polaire",
        "SSI (Station Spatiale Internationale)",
        "Venus","L’avion"],
    correct:3
}
];

const questions=[questions_1, questions_2];

let state = {
    currentQuestion: [],
    currentScore: [],
    currentQuiz: null,
}

function setState(){
    localStorage.setItem("currentState", JSON.stringify(state));
}

function getState(){
    state = JSON.parse(localStorage.getItem("currentState"));
}

function addPoint(){
    getState();
    state.currentScore[state.currentQuiz] += 1;
    setState();
}

function nextQuestion(){
    getState();
    state.currentQuestion[state.currentQuiz] += 1;
    console.log(state.currentQuestion[state.currentQuiz]);
    setState();
}

function getScore(){
    getState();
    return state.currentScore[state.currentQuiz];
}

function getQuestion(){
    getState();
    return questions[state.currentQuiz][state.currentQuestion[state.currentQuiz]];
}

function getQuestionIndex(){
    getState();
    return state.currentQuestion[state.currentQuiz];
}

function getQuiz(){
    getState();
    console.log(questions[state.currentQuiz].length);
    return (questions[state.currentQuiz]);

}

function clearQuiz(){
    state.currentQuestion[state.currentQuiz] = 0;
    state.currentScore[state.currentQuiz] = 0;
    setState();
}

function clearStorage(){
    localStorage.clear();
}

function setQuiz(num){
    getState();
    state.currentQuiz = num;
    setState();
}

function getQuizIndex(){
    getState();
    return state.currentQuiz;
}

function setZeroState(){
    state = {
        currentQuestion: [0,0],
        currentScore: [0,0],
        currentQuiz: null,
    }
    setState();
}