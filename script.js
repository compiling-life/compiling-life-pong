document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("gameCanvas");

    const ctx = canvas.getContext("2d");

    canvas.width = 800;

    canvas.height = 400;

    const paddleWidth = 10, paddleHeight = 80, paddleSpeed = 5;

    let leftPaddle = { x: 10, y: canvas.height / 2 - 40, dy: 0 };

    let rightPaddle = { x: canvas.width - 20, y: canvas.height / 2 - 40, dy: 0 };

    let ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 8, speed: 2, dx: 2, dy: 2 };

    let leftScore = 0, rightScore = 0;

    const usernameScreen = document.getElementById("usernameScreen");

    const gameScreen = document.getElementById("gameScreen");

    const player1NameInput = document.getElementById("player1");

    const player2NameInput = document.getElementById("player2");

    const player1NameDisplay = document.getElementById("player1Name");

    const player2NameDisplay = document.getElementById("player2Name");

    const score1Display = document.getElementById("score1");

    const score2Display = document.getElementById("score2");

    function startGame() 
    {
        const player1Name = player1NameInput.value || "Player 1";

        const player2Name = player2NameInput.value || "Player 2";

        player1NameDisplay.textContent = player1Name;

        player2NameDisplay.textContent = player2Name;

        usernameScreen.style.display = "none";

        gameScreen.style.display = "block";

        resetGame();

        gameLoop();
    }

    function resetGame() 
    {
        ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 8, speed: 2, dx: 2, dy: 2 };

        leftPaddle = { x: 10, y: canvas.height / 2 - 40, dy: 0 };

        rightPaddle = { x: canvas.width - 20, y: canvas.height / 2 - 40, dy: 0 };

        leftScore = 0;

        rightScore = 0;

        score1Display.textContent = leftScore;

        score2Display.textContent = rightScore;
    }

    function gameLoop() 
    {
        moveBall();
        
        movePaddles();

        checkCollisions();

        clearCanvas();

        drawBall();

        drawPaddles();

        requestAnimationFrame(gameLoop);
    }

    function clearCanvas() 
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawBall() 
    {
        ctx.beginPath();

        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);

        ctx.fillStyle = "#fff";

        ctx.fill();

        ctx.closePath();
    }

    function drawPaddles() 
    {
        ctx.beginPath();

        ctx.rect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight);

        ctx.rect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight);

        ctx.fillStyle = "#fff";

        ctx.fill();

        ctx.closePath();
    }

    function moveBall() 
    {
        ball.x += ball.dx;

        ball.y += ball.dy;

        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) 
        {
            ball.dy *= -1;
        }

        if (ball.x - ball.radius < 0) 
        {
            rightScore++;

            score2Display.textContent = rightScore;

            resetBall();
        } 
        
        else if (ball.x + ball.radius > canvas.width) 
        {
            leftScore++;

            score1Display.textContent = leftScore;

            resetBall();
        }
    }

    function resetBall() 
    {
        ball.x = canvas.width / 2;

        ball.y = canvas.height / 2;

        ball.dx *= -1;

        ball.dy = 4;
    }

    function movePaddles() 
    {
        if (leftPaddle.dy !== 0) leftPaddle.y += leftPaddle.dy;

        if (rightPaddle.dy !== 0) rightPaddle.y += rightPaddle.dy;

        if (leftPaddle.y < 0) leftPaddle.y = 0;

        if (leftPaddle.y + paddleHeight > canvas.height) leftPaddle.y = canvas.height - paddleHeight;

        if (rightPaddle.y < 0) rightPaddle.y = 0;

        if (rightPaddle.y + paddleHeight > canvas.height) rightPaddle.y = canvas.height - paddleHeight;
    }

    function checkCollisions() 
    {
        if (ball.x - ball.radius < leftPaddle.x + paddleWidth && ball.y > leftPaddle.y && ball.y < leftPaddle.y + paddleHeight) 
        {
            ball.dx = Math.abs(ball.dx);

            ball.x = leftPaddle.x + paddleWidth + ball.radius;

            ball.dy = (ball.y - (leftPaddle.y + paddleHeight / 2)) * 0.2; 
        }
   
        if (ball.x + ball.radius > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + paddleHeight) 
        {
            ball.dx = -Math.abs(ball.dx);

            ball.x = rightPaddle.x - ball.radius;
  
            ball.dy = (ball.y - (rightPaddle.y + paddleHeight / 2)) * 0.2;
        }
    }   
   

    document.addEventListener("keydown", (e) => {
        
        if (e.key === "w") 
        {
            leftPaddle.dy = -paddleSpeed;
        }

        if (e.key === "s") 
        {
            leftPaddle.dy = paddleSpeed;
        }

        if (e.key === "ArrowUp") 
        {
            rightPaddle.dy = -paddleSpeed;
        }

        if (e.key === "ArrowDown") 
        {
            rightPaddle.dy = paddleSpeed;
        }
    });
   
    document.addEventListener("keyup", (e) => {
        
        if (e.key === "w" || e.key === "s") 
        {
            leftPaddle.dy = 0;
        }

        if (e.key === "ArrowUp" || e.key === "ArrowDown") 
        {
            rightPaddle.dy = 0;
        }
    });
   
    const startButton = document.querySelector("#startGameButton");
    
    startButton.addEventListener("click", startGame);
});
