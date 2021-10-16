const options = Array.from(document.getElementsByClassName("option"));
const question = document.getElementById("rgb-question");
const score = document.getElementById("score");
const time = document.getElementById("time");

//Adding Listener to all the options.
options.forEach((option,index)=>{
    option.addEventListener('click',checkAnswer);
});

//Min/Max values for RGB random.
const max = 255;
const min = 0;

//Initial Score and Time.
var timeValue=localStorage["time"];
var scoreValue = 0;

// Initial question, generated before click.
var rightAnswer = generateQuestion();

//Countdown Timer
setInterval(()=>{
    if(timeValue>0){
        timeValue=timeValue-1;
        time.innerText = timeValue;
    }
    else{
        gameOver();
    }
        
},1000)


function generateQuestion(){
    //Generating an random array of rgb values, (Array[4] of Array[3])
    let randomRGBs = [[(Math.floor(Math.random() * (max - min + 1) + min)), (Math.floor(Math.random() * (max - min + 1) + min)), (Math.floor(Math.random() * (max - min + 1) + min))],[(Math.floor(Math.random() * (max - min + 1) + min)), (Math.floor(Math.random() * (max - min + 1) + min)), (Math.floor(Math.random() * (max - min + 1) + min))],[(Math.floor(Math.random() * (max - min + 1) + min)), (Math.floor(Math.random() * (max - min + 1) + min)), (Math.floor(Math.random() * (max - min + 1) + min))],[(Math.floor(Math.random() * (max - min + 1) + min)), (Math.floor(Math.random() * (max - min + 1) + min)), (Math.floor(Math.random() * (max - min + 1) + min))]];

    //Saving generated rgb's in the form of string - "rgb(_,_,_)"
    let allColors = [];
    for(let i=0; i<4; i++){
        allColors[i]=`rgb(${randomRGBs[i][0]},${randomRGBs[i][1]},${randomRGBs[i][2]})`;
    }

    //Generating a random number to pick the question from the generated array of rgb's
    let questionPicker = (Math.floor(Math.random() * (3 - 0 + 1) + 0));

    //Setting the display properties of the element
    setDisplayProperties(allColors, questionPicker);
    console.log(questionPicker);
    return questionPicker;
}

//Listener function to check if the answer is correct or wrong.
function checkAnswer(event){
    const id = event.target.id;
    if(id==rightAnswer){
        showCorrect();
        scoreValue=scoreValue+4;
    }
    else{
        showWrong();
        scoreValue=scoreValue-1;
    }
    addGlow(rightAnswer);
    score.innerText = scoreValue;
    //Calling generateQuestion after every click to move to the next question.
    setTimeout(function(){
        removeGlow(rightAnswer);
        rightAnswer = generateQuestion();
    },500);   
}

function showCorrect(){
    question.style.animation = "correct 400ms linear";
        question.addEventListener("animationend",function(){
            question.style.animation = "";
    });
}

function showWrong(){
    question.style.animation = "wrong 400ms linear";
        question.addEventListener("animationend",function(){
            question.style.animation = "";
    });
}


//Adding glow to the Correct Answer
function addGlow(id){
    const optionID = document.getElementById(id);
    optionID.classList.add('box-glow');
}

function removeGlow(id){
    const optionID = document.getElementById(id);
    optionID.classList.remove('box-glow');
}

//Ending Game.
function gameOver(){
    question.innerText = "Game Over !";
    options.forEach((option,index)=>{
        option.classList.add('blocked-input');
    });
}


//Setting Document Display Properties.
function setDisplayProperties(colors, questionRGB){
    question.innerText = `${colors[questionRGB]}`;
    for(let i=0; i<4; i++){
        document.getElementById(i).setAttribute("style",`background: ${colors[i]};`);
    }
}

//Replay function, reloading the page
function replay(){
    location.reload();
}


