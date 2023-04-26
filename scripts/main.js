const questions = [{
    question: "Quelle etoile est la plus frappant sur le ciel de nuit?",
    answers:
    ["Altair", "Sirius", "Polaire","Venus"],
    correct:2
},

{
    question: "Quel de ces objets est le plus loin de nous?",
    answers:
    ["Mars", "Etoile filante", "Station spatiale internationale","Lune"],
    correct:1
},

{
    question: "Who discowered Neptune?",
    answers:
    ["Me", "You", "Scientist","Nature"],
    correct:3
}
,

{
    question: "C'est quoi PAS le nom de constellation?",
    answers:
    ["Hercules", "Horloge", "Pavot","Paon"],
    correct:3
}
];

let score = 0;
let question_index = 0;

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitButton = document.querySelector('#submit');
const picContainer = document.querySelector('#illustration');

function clearPage(){
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
    console.log(picContainer.innerHTML);
    picContainer.innerHTML = '';
}


function showQuestion(){

    // Picture
    const pictureTemplate = `<img class ="illustration" id ="illustration" src = "style/%illustration%.png">`
    const pictureHTML = pictureTemplate.replace('%illustration%', 'illustr_'+ question_index);
    console.log(pictureHTML);
    picContainer.innerHTML = pictureHTML;

    // Question
    const headerTemplate =`<h2 class = "title">%title%</h2>`;
    const title = headerTemplate.replace('%title%', questions[question_index]['question']);
    headerContainer.innerHTML = title;

    let answerNumber = 1;

    // Answers
    for (answerOption of questions[question_index]['answers']){

        const questionTemplate = 
            `<li>
                <label>
                    <input value="%value%" type="radio" class="answer" name="answer">
                    <span>%answer%</span>
                </label>
            </li>`;

        const answerHTML = questionTemplate.replace('%answer%', answerOption).replace('%value%', answerNumber);
        

        listContainer.innerHTML += answerHTML;

        answerNumber++;
    }

    
}

function showResults(){
    listContainer.style.display = "none"; 
    const resultsTemplate = 
        `<h2 class = "title">%title%</h2>
        <h3 class = "summary">%message%</h2>
        <p class = "result">%result%</p>`;

    let message;
    let title;

    if (score === questions.length){
        title = 'Congragulations!🌠';
        message = 'You answered correctly all of the questions!';
    }
    else if ((score*100)/questions.length >= 50){
        title = 'Good result!😺';
        message = 'You answered correctly more than 50% of the questions!';
    }
    else{
        title = 'Not bad!🚀';
        message = 'You answered correctly less than 50% of the questions. Click here to read the theory and come back again!';
    }

    let result = `${score} of ${questions.length}` ;

    const finalMessage = resultsTemplate
                                .replace('%title%', title)
                                .replace('%message%', message)
                                .replace('%result%', result);

    headerContainer.innerHTML = finalMessage;
    
    submitButton.blur();
    submitButton.innerText = 'Start again!';
    submitButton.onclick = function() {
        history.go(); 
    }
}

function checkAnswer(){

    // Finds checked radio
    const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

    // Stops if there is no answer
    if (!checkedRadio){
        submitButton.blur();
        return
    }

    // Make a numser of user's answer
    const userAnswer = parseInt(checkedRadio.value);

    if (userAnswer === questions[question_index]['correct']){
        score++;

    }
    console.log(score);

    if (question_index !== questions.length -1){
        question_index++;
        clearPage();
        showQuestion();

    }
    else{
        clearPage();
        showResults();

    }

}



clearPage();
showQuestion();
submitButton.onclick = checkAnswer;


// console.log(listContainer);


// let answers = document.getElementsByClassName('option');


// var buttons = document.querySelectorAll('button');

// buttons.forEach(function(button) {
//     button.addEventListener('click', function() {
//         var answer = this.getAttribute('value');
//         localStorage.setItem('answer', answer);
//         return(answer);
//         // if (answer == 1){
//         //     alert("Bon reponse" + answer);
//         // }
//         // else{
//         //     alert("Mal reponse" + answer);
//         // }
//     })
    
// })

// function Correcr_Answer(){
//     var x = document.getElementById("resultats");
//     x.style.display = "block";

// }

// function Incorrecr_Answer(){
//     var x = document.getElementById("resultats2");
//     x.style.display = "block";
// }


