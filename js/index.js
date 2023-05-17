//Game Constants & variables 
let inputDir = {x: 0, y: 0};
let foodSound = new Audio('food.mp3');
let gameOverSound = new Audio('gameover.mp3');
let moveSound = new Audio('move.mp3');
let musicSound = new Audio('music.mp3');

let speed = 4;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
let flag = 0;

food = {x: 6, y: 7};

// Game functions
function main(ctime){
    window.requestAnimationFrame(main);
 //   console.log(ctime)
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return ;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
   // if you bump into yourself
   for (let index = 1; index < snakeArr.length; index++) {
    if(snake[index].x === snake[0].x && snake[index].y === snake[0].y ){
        return true;
    }
 
}

// if you bump into the wall
    if(snake[0].x >= 18 || snake[0].x<=0 ||  snake[0].y >= 18 || snake[0].y<=0){
        return true;
    }
    
   


    return false;
}



function gameEngine(){
    //part 1 : update the snake array
    
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y:0};
        alert("Game Over! Press any key to play again!");
        snakeArr = [{x:13, y:15}];
       // musicSound.play();
        score = 0;

    }

    // setting the speed = 4 if the game has just stared
    if(score===0){
        speed = 4;
    }
    

    let hiscoreval;
    



    // if you have eaten the food , increment the score and regenrate the food
   
    

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        score+=1;
        // increasing the speed of the snake after vertain score interval
        if(score%6===1 ){
             speed+=1;
        }
    

        if(score>hiscore){
            console.log("updated");
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore : " + hiscoreval;
        }
        scoreBox.innerHTML = "Score : "+ score;
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y })
      let a = 4;
      let b = 14;
        food = {x: 2 + Math.round(a + (b-a)*Math.random()) , y: 2 + Math.round(a + (b-a)*Math.random()) }    
    }
    
    
    // moving the snake

    for (let i = snakeArr.length - 2; i >=0 ; i--) {
     //   const element = snakeArr[i];
       snakeArr[i+1] = {...snakeArr[i]};   
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    
    // part 2 : display the snake and food
    // display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
           snakeElement = document.createElement('div');
           snakeElement.style.gridRowStart = e.y;
           snakeElement.style.gridColumnStart = e.x;
          // snakeElement.classList.add('snake');
           if(index === 0){
            snakeElement.classList.add('head');
           }
           else{
            snakeElement.classList.add('snake');
           }
           board.appendChild(snakeElement);
    });

    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


}








//main logic

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = " HiScore: " + hiscoreval;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown' , e =>{
    inputDir = {x: 0, y: 1} // start the game
     moveSound.play();
     switch (e.key){
        case "ArrowUp":
            console.log("");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

            default:
                break;
     } 


});





