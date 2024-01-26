var buttonColors=['red','yellow' , 'blue','green'];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var i=0;
$(document).keypress(function()
{
    if(!started){
        $("h1").text("Level "+i);
        nextSequence();
        started=true;
    }
    
});

$("button").click(function()
{
    var userChosenColor=this.classList[0];
    userClickedPattern.push(userChosenColor);
    addAnimation(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});
function nextSequence(){
    i++;
    userClickedPattern=[];
    $("h1").text("Level " + i);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("."+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    

}

function playSound(ke){
    var audio= new Audio("sounds/"+ke+".mp3");
    audio.play();
}
function addAnimation(k){
    $("."+k).addClass("pressed");
    setTimeout(function(){
        $("."+k).removeClass("pressed");
    },100);
}
function checkAnswer(currLevel){
    if(gamePattern[currLevel]===userClickedPattern[currLevel])
    {
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("gameOver");
        $("h1").text("Game Over!Press any key to start");
        setTimeout(function()
        {
             $("body").removeClass("gameOver");
        },200);
        
        startOver();
    }
}
function startOver(){
    started=false;
    gamePattern=[];
    i=0;
}