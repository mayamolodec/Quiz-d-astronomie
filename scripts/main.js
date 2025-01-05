"use strict";

const wrapContainer = document.querySelector('#wrap');

let quizCard = document.createElement('form');
quizCard.className="quiz";
quizCard.nam = "answer";
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

    if (getQuestionIndex() != questions.length - 1){
        nextQuestion();
        clearPage();
        showQuestion();
    }

    else{
        clearPage();
        showResults();
    }
});

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

wrapContainer.append(quizCard);
quizCard.append(cardBody);
cardBody.append(cardHeader);
quizCard.append(submitButton);


function clearPage(){
    cardHeader.innerHTML = '';
    answersList.innerHTML = '';
    cardImage.innerHTML = '';
}


function showQuestion(){

    const question = getQuestion();
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

    if (score === questions.length){
        title = 'Félicitations!🌠';
        message = 'Vous avez répondu correctement à toutes les questions!';
    }
    else if ((score*100)/questions.length >= 50){
        title = 'Bon résultat!😺';
        message = 'Vous avez répondu correctement à plus de 50% des questions!';
    }
    else{
        title = 'Pas mal!🚀';
        message = 'Vous avez répondu correctement à moins de 50% des questions. Cliquez ici pour recommencer!';
    }

    let result = `${score} de ${questions.length}` ;

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
        history.go(); 
        clearStorage();
    }

}

setState();
clearPage();
showQuestion();



