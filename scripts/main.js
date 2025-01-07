"use strict";

const wrapContainer = document.querySelector('#wrap');
let cardImage = document.createElement('img');
cardImage.className="illustration";
cardImage.setAttribute("id", "illustration");

let cardBody = document.createElement('div');
cardBody.className = "quiz-body";

let cardHeader = document.createElement('div');
cardHeader.className = "quiz-header";
cardHeader.setAttribute("id", "header");

let questionText = document.createElement('h2');
questionText.className = "title";

let submitButton = document.createElement('button');
submitButton.className = "submit_answer";
submitButton.setAttribute("id", "submit");
submitButton.textContent = "Valider";

let answersList = document.createElement('ul');
answersList.className = "options";
answersList.setAttribute("id", "list");

let quizCard = document.createElement('form');
quizCard.className="quiz";
quizCard.name = "answer";
quizCard.addEventListener("submit", (e)=>{
    e.preventDefault();
    const checkedRadio = e.target.answer.value;

    if (!checkedRadio){
        submitButton.blur();
        return
    }

    if (checkedRadio == getQuestion()['correct']){
        addPoint();
    }

    if (getQuestionIndex() != getQuiz().length - 1){
        nextQuestion();
        clearPage();
        showQuestion();
    }

    else{
        clearPage();
        showResults();
    }
});

function startPage(){
    let buttonContainer = document.createElement("div");
    buttonContainer.className = "buttonContainer";
    wrapContainer.append(buttonContainer);

    for (let i=0;i<questions.length;i++){
        let button = document.createElement('button');
        button.className = "choice";
        button.textContent = "quiz #"+(i+1);
        setQuiz(i);
        const questionInfo = document.createElement('p');
        questionInfo.textContent = getQuestionIndex()+'/'+getQuiz().length;
        questionInfo.className = 'questionInfo';
        button.appendChild(questionInfo);  
        let buttonImageSrc = "assets/quiz_"+(i+1)+".jpg";
        button.style.backgroundImage = 'url('+buttonImageSrc+')';
        buttonContainer.append(button);
        button.addEventListener("click", ()=> {
            setQuiz(i);
            buttonContainer.innerHTML = '';
            startQuiz();
        });
    }
    let clearButton = document.createElement('button');
    clearButton.className = 'choice';
    clearButton.textContent = 'Annuler les résultats';
    clearButton.style.maxWidth = '220px';
    clearButton.style.fontSize = '20px';
    clearButton.addEventListener("click", ()=> {
        clearStorage();
        buttonContainer.innerHTML = '';
        history.go();
    });
    buttonContainer.append(clearButton);

}

function startQuiz(){
    wrapContainer.append(quizCard);
    quizCard.append(cardBody);
    cardBody.append(cardHeader);
    quizCard.append(submitButton);
    clearPage();
    showQuestion();
}

function clearPage(){
    cardHeader.innerHTML = '';
    answersList.innerHTML = '';
    cardImage.innerHTML = '';
}

function showQuestion(){
    console.log('Show question function: '+ getQuestionIndex());
    let question = getQuestion();
    cardImage.src = question['img_link'];
    quizCard.prepend(cardImage);

    questionText.textContent = question['question'];
    cardHeader.append(questionText);

    let answerNumber = 1;
    
    cardHeader.after(answersList);

    question.answers.forEach((answer)=>{
        let answerOption = document.createElement('li');
        let optionLabel = document.createElement('label');
        let optionInput = document.createElement('input');
        optionInput.className="answer";
        optionInput.setAttribute("name", "answer");
        optionInput.setAttribute("value", answerNumber);
        optionInput.type = "radio";

        let optionText = document.createElement('div');
        optionText.textContent = answer;

        answersList.append(answerOption);
        answerOption.append(optionLabel);
        optionLabel.append(optionInput);
        optionLabel.append(optionText);

        answerNumber++;
    })  
}


function showResults(){
    cardImage.src = "assets/illustration.png";
    quizCard.prepend(cardImage);

    let message;
    let title;
    let score = getScore();
    let maxScore = getQuiz().length;

    if (score === maxScore){
        title = 'Félicitations!🌠';
        message = 'Vous avez répondu correctement à toutes les questions!';
    }
    else if ((score*100)/maxScore >= 50){
        title = 'Bon résultat!😺';
        message = 'Vous avez répondu correctement à plus de 50% des questions!';
    }
    else{
        title = 'Pas mal!🚀';
        message = 'Vous avez répondu correctement à moins de 50% des questions. Cliquez ici pour recommencer!';
    }

    let result = `${score} de ${maxScore}` ;

    questionText.textContent = title;
    cardHeader.append(questionText);

    let messageText = document.createElement("div");
    messageText.className = "summary";
    messageText.textContent = message;
    cardHeader.append(messageText);

    let scoreText = document.createElement("div");
    scoreText.className = "result";
    scoreText.textContent = result;
    cardHeader.append(scoreText);

    submitButton.blur();
    submitButton.innerText = 'Recommencer!';
    submitButton.onclick = function() {
        clearQuiz();
        history.go(); 

    }
}

function checkState(){
    getState();
    if (state==null){
        setZeroState();
        startPage();
        console.log('There is no info');
        console.log(state);
        
    }
    else{
        console.log('There is an old info:');
        console.log(state);
        startPage();
    }
}

checkState();



