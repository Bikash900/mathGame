// this is a simple math quiz game
// it will ask a random question and the user will have to answer it
// it will check if the answer is correct or not
const div1 = document.querySelector('.container');
const inputForUserNumber = document.querySelector('.inputForUserNumber');
const form = document.querySelector('.form');
const question = document.querySelector('.question');
const comment = document.querySelector('.comment');
const container = document.querySelector('.container')

//this will make globle scope
let num1,num2,operatorSign,result; 

// get random number from 0 to 1000
function randomNumGenerator(){
    const randomNumber =  Math.floor(Math.random() * 1001);
    return randomNumber;// return a random number

}


///choose a operator sign randomly
function randomSignGenerator(){
    //generates random sign
    const signArr = ['-', '+', '*', '/']
    const randomSignArrIndex = Math.floor(Math.random() * signArr.length);
    const randomSign = signArr[randomSignArrIndex];
    return randomSign;// it returns string so now we have un string it
}


//this to make a question
function generateNewQuestion(){
    num1 = randomNumGenerator();
    num2 = randomNumGenerator();
    operatorSign = randomSignGenerator();
    
    // Avoid division by 0
    if (operatorSign === '/' && num2 === 0) {
        num2 = 1;
    }
    
        // unstringing the operator
        //// i am switching the sign from string to itself. so that i can use it equation
        switch(operatorSign){
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                result = parseFloat((num1 / num2).toFixed(2)); 
                break;
            default:
                console.error("Invalid operator.");
                return;
        }

    question.textContent = `What is ${num1} ${operatorSign} ${num2}?`;
}


//keep tracks of score
let score = 0;
let totalRound = 10;
let round = 0;

function scoreKeeper(){
    const scoreDisplay = document.querySelector('.score');
    scoreDisplay.textContent =`Score: ${score} out of ${totalRound}`;
    return
}

///for to get a user answer
form.addEventListener("submit", function(e){
    e.preventDefault();
    const userAnswer = parseFloat(inputForUserNumber.value);
    inputForUserNumber.value = "";
    // this will stop the game after full round
    if (round >= totalRound) return;

    //letting know the user to enter number
    if (isNaN(userAnswer)) {
        comment.textContent = "Plase Enter Number!";
        return
    }

    let isCorrect;

    //checking the answer in decimal digit
    if (operatorSign === '/') {
        isCorrect = Math.abs(userAnswer - result) < 0.01;
    } else {
        isCorrect = userAnswer === result;
    }

    //cheaking answer and if it correct going top next question
    if (isCorrect) {
        score++;
        generateNewQuestion();
        comment.textContent = ``;
    } else if (!isCorrect){
        score--;
        comment.textContent = `The correct answer was ${result}.`;
        generateNewQuestion();
    }

    //keeking recode of round and score every round
    round++;
    scoreKeeper();


    const endDisplay = document.createElement('div');
    endDisplay.textContent = `${score} Out of ${totalRound}`;
    endDisplay.className = "endDisplay"
    // /thi will end the game
   if(round >= totalRound){
 
        if (score === totalRound) {
            container.innerHTML = "";
            // container.append(endDisplay)
        }else {
            container.innerHTML = "";
            container.innerHTML = "GAME OVER!";
            container.append(endDisplay);
        }
  };

});


scoreKeeper()
generateNewQuestion(); 
