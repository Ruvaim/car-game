const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

// console.log(score);

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
}

let player = {
    speed : 5,
    score : 0,
}

startScreen.addEventListener("click", start)

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
    keys[e.key] = true;
    // console.log(e.key);
    // console.log(keys);
}
function keyUp(e) {
    keys[e.key] = false;
    // console.log(e.key);
}

function isCollide(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function moveLines(){
    let lines = document.querySelectorAll('.lines');
    lines.forEach( (item) => {

        if (item.y >= 700) {
            item.y -= 750
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function endGame(){
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over <br> Your Final Score is " + player.score + "<br> Press Here To Restart The Game.";
    reset();
}

function reset(){
    player = {
        speed : 5,
        score : "",
    }
}

function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach( (item) => {

        if (isCollide (car,item)) {
            // console.log("BHOOM");
            endGame();
        }

        if (item.y >= 750) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350 ) + "px";
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}


function start() {

    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";


    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    
    for (x = 0; x < 5; x++) {
        let roadLine = document.createElement('div');
        roadLine.classList.add("lines");
        roadLine.y = (x * 150)
        roadLine.style.top = (roadLine.y) + "px";
        gameArea.appendChild(roadLine);
    }
    

    let car = document.createElement('div');
    // car.setAttribute("class", "car"),
    car.classList.add("car");
    // car.innerText = "Hey I Am Ruvaim";
    gameArea.appendChild(car);


    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    
    // console.log(car.offsetTop);
    // console.log(car.offsetLeft);
    
    for (x = 0; x < 3; x++) {
        let enemyCar = document.createElement('div');
        enemyCar.classList.add("enemy");
        enemyCar.y = ((x+1) * 350) * -1;
        enemyCar.style.top = (enemyCar.y) + "px";
        enemyCar.style.background = 'blue';
        enemyCar.style.left = Math.floor(Math.random() * 350 ) + "px";
        gameArea.appendChild(enemyCar);
    }
    

}

function gamePlay() {
    // console.log("hey im clicked");
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    // console.log(road);
    if (player.start) {

        moveLines();
        moveEnemy(car);
        
        if (keys.ArrowUp && player.y > (road.top + 100)) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (road.bottom - 70)) { player.y += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        if (keys.ArrowRight && player.x < (road.width - 50)) { player.x += player.speed }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);
        console.log(player.score);
        
        player.score++;
        let ps = player.score - 1;
        score.innerText = "Score : " + ps;
        
        if (player.score > 500) {
            player.speed = 7;
        }
        if (player.score > 1000) {
            player.speed = 10;
        }
        if (player.score > 1500) {
            player.speed = 15;
        }
    }
}