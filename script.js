let character =document.getElementById('character');
let characterBottom=parseInt(window.getComputedStyle(character).getPropertyValue ('bottom'));
let characterRight=parseInt(window.getComputedStyle(character).getPropertyValue ('right'));
let characterWidth=parseInt(window.getComputedStyle(character).getPropertyValue ('width'));
let characterHeight=parseInt(window.getComputedStyle(character).getPropertyValue ('height'));

let ground=document.getElementById('ground');
let groundBottom=parseInt(window.getComputedStyle(ground).getPropertyValue ('bottom'));
let groundHight=parseInt(window.getComputedStyle(ground).getPropertyValue ('height'));

let isjumping= false;
let uptime;
let downtime; 
let displayscore = document.getElementById('score');
let score = 0;

function jump(){

if(isjumping) return;
 uptime =setInterval(() => { 
    if(characterBottom >= groundHight + 250){
        clearInterval(uptime);
        downtime = setInterval(() =>{
            if(characterBottom <= groundHight + 10){
                clearInterval(downtime);
                isjumping= false;
            }
            characterBottom -= 10;
            character.style.bottom= characterBottom + 'px';

        }, 20);
    }
    
  characterBottom += 10;
  character.style.bottom= characterBottom + 'px';
  isjumping= true;
 }, 20);
   
}

function showscore(){
     score++;
     displayscore.innerText = score;
}
setInterval(showscore, 100);



function generateObstacle()
{
let obstacles = document.querySelector('.obstacles');
let obstacle = document.createElement('div');
obstacle.setAttribute('class', 'obstacle');
obstacles.appendChild(obstacle);

let randomTimeout = Math.floor(Math.random() * 1000) + 1000;
let obstacleRight= -30;
let obstacleBottom= 100;
let obstacleWidth= 30;
let obstacleHeight= Math.floor(Math.random() * 50) + 50;
obstacle.style.background = `rgb(${Math.floor(Math.random() * 255)} , ${Math.floor(Math.random() * 255)} , ${Math.floor(Math.random() * 255)}) `;

function moveObstacle()
{
    obstacleRight += 5;
    obstacle.style.right = obstacleRight + 'px';
    obstacle.style.bottom = obstacleBottom + 'px';
    obstacle.style.width = obstacleWidth + 'px';
    obstacle.style.height = obstacleHeight + 'px';
    if(characterRight >= obstacleRight - characterWidth && characterRight <=
         obstacleRight + obstacleWidth && characterBottom <= obstacleBottom + obstacleHeight){
        alert('Game over! Your score is: '+score);
        clearInterval(obstacleInterval);
        clearTimeout(obstacleTimeout);
        location.reload();
    }
}

let obstacleInterval = setInterval(moveObstacle, 20);
let obstacleTimeout = setTimeout(generateObstacle, randomTimeout);

}

generateObstacle();

function control(e)
{
if(e.key=='ArrowUp' || e.key == ' '){
    jump();
}
}
document.addEventListener('keydown', control);
document.addEventListener('onclick', control);






