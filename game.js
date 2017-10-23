/*
 * TODO:
 * 1. Display FPS, arena dimensions
 * 2. Save state while changing FPS and load when done
 * 3. Some button/option to display key bindings
 */

var snake;
var food;
var Scale = 12;
var fps = 6;
var maxfps = 15;
var minfps = 5;
var arenaWidth = 480;
var maxArenaWidth = 480;
var minArenaWidth = 276;
var bannerHeight = 60;
var score = 0;
var lives = 9;

function setup() {
    createCanvas(arenaWidth, arenaWidth+bannerHeight);
    snake = new Snake();
    food = new Food();
    frameRate(fps);
}

function draw() {
    background(51, 51, 51);

    if (lives > 0) {
        if (snake.isdead()) {
            lives--;
        }
        snake.update();
        snake.show();
        if (snake.eats(food)) {
            score++;
            food.pickLocation();
        }
        food.show();

        stroke(48, 120, 168);
        fill(48, 120, 168);
        rect(0, 0, width, bannerHeight);

        fill(214, 216, 218);
        textSize(20);
        textFont('Monospace');
        textAlign(LEFT, CENTER);
        text('Score: ' + score, 20, floor(bannerHeight/2));
        textAlign(RIGHT, CENTER);
        text('Lives: ' + lives, width-20, floor(bannerHeight/2));

        stroke(0, 0, 0);
    }
    else {
        stroke(48, 120, 168);
        fill(214, 216, 218);
        textSize(40);
        textFont('Monospace');
        textAlign(CENTER, CENTER);
        text('GAME OVER', floor(width/2), floor(height/2)-60);
        textSize(20);
        text('Score: ' + score, floor(width/2), floor(height/2));
        textSize(34);
        text('< HIT SPACE >', floor(width/2), floor(height/2)+60);

        stroke(0, 0, 0);
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        snake.direction(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        snake.direction(0, 1);
    } else if (keyCode === LEFT_ARROW) {
        snake.direction(-1, 0);
    } else if (keyCode === RIGHT_ARROW) {
        snake.direction(1, 0);
    } else if (lives === 0 && keyCode === 32) {
        lives = 9;
        score = 0;
        setup();
    } else if (lives > 0 && keyCode === 32) {
        lives = 9;
        score = 0;
        setup();
    } else if (width < maxArenaWidth && lives > 0 && keyCode === 190) {
        lives = 9;
        score = 0;
        arenaWidth += 12;
        setup();
    } else if (width > minArenaWidth && lives > 0 && keyCode === 188) {
        lives = 9;
        score = 0;
        arenaWidth -= 12;
        setup();
    } else if (fps < maxfps && keyCode === 187) {
        lives = 9;
        score = 0;
        fps++;
        setup();
    } else if (fps > minfps && keyCode === 189) {
        lives = 9;
        score = 0;
        fps--;
        setup();
    }
}
