/**
 * Pong Game
 * Author: Adam Beloucif
 * Description: Jeu Pong classique avec IA et mode multijoueur
 */

// ===================================================
// CANVAS SETUP
// ===================================================
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// ===================================================
// GAME STATE
// ===================================================
let gameMode = null; // 'solo' or 'multi'
let isPaused = false;
let isGameRunning = false;
let animationId = null;

// Settings
let settings = {
    difficulty: 'medium',
    ballSpeed: 5,
    paddleSpeed: 8,
    winScore: 11,
    keyboardLayout: 'azerty'
};

// Game Objects
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    velocityX: 5,
    velocityY: 5,
    speed: 5,
    maxSpeed: 15
};

const paddle = {
    width: 15,
    height: 100,
    player1: {
        x: 10,
        y: canvas.height / 2 - 50,
        score: 0,
        dy: 0
    },
    player2: {
        x: canvas.width - 25,
        y: canvas.height / 2 - 50,
        score: 0,
        dy: 0
    }
};

// AI Configuration
const aiConfig = {
    easy: { speed: 0.4, prediction: 0.3, reaction: 0.6 },
    medium: { speed: 0.6, prediction: 0.5, reaction: 0.4 },
    hard: { speed: 0.8, prediction: 0.7, reaction: 0.2 },
    impossible: { speed: 1, prediction: 1, reaction: 0 }
};

// Keyboard State
const keys = {};

// ===================================================
// DOM ELEMENTS
// ===================================================
const elements = {
    mainMenu: document.getElementById('mainMenu'),
    settingsPanel: document.getElementById('settingsPanel'),
    gameScreen: document.getElementById('gameScreen'),
    pauseMenu: document.getElementById('pauseMenu'),
    victoryModal: document.getElementById('victoryModal'),
    score1: document.getElementById('score1'),
    score2: document.getElementById('score2'),
    player1Name: document.getElementById('player1Name'),
    player2Name: document.getElementById('player2Name'),
    winnerText: document.getElementById('winnerText'),
    finalScore: document.getElementById('finalScore'),
    difficulty: document.getElementById('difficulty'),
    ballSpeed: document.getElementById('ballSpeed'),
    ballSpeedValue: document.getElementById('ballSpeedValue'),
    paddleSpeed: document.getElementById('paddleSpeed'),
    paddleSpeedValue: document.getElementById('paddleSpeedValue'),
    winScore: document.getElementById('winScore'),
    keyboardLayout: document.getElementById('keyboardLayout')
};

// ===================================================
// GAME INITIALIZATION
// ===================================================
function initGame(mode) {
    gameMode = mode;
    isPaused = false;
    isGameRunning = true;
    
    // Reset scores
    paddle.player1.score = 0;
    paddle.player2.score = 0;
    
    // Reset paddles
    paddle.player1.y = canvas.height / 2 - paddle.height / 2;
    paddle.player2.y = canvas.height / 2 - paddle.height / 2;
    
    // Update UI
    elements.player1Name.textContent = 'Joueur 1';
    elements.player2Name.textContent = mode === 'solo' ? 'IA' : 'Joueur 2';
    updateScore();
    
    // Show game screen
    hideAllScreens();
    elements.gameScreen.classList.remove('hidden');
    
    // Reset and start ball
    resetBall();
    
    // Start game loop
    gameLoop();
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = settings.ballSpeed;
    
    // Random direction
    const angle = (Math.random() * Math.PI / 4) - Math.PI / 8;
    const direction = Math.random() < 0.5 ? 1 : -1;
    
    ball.velocityX = direction * ball.speed * Math.cos(angle);
    ball.velocityY = ball.speed * Math.sin(angle);
}

// ===================================================
// GAME LOOP
// ===================================================
function gameLoop() {
    if (!isGameRunning || isPaused) return;
    
    update();
    render();
    
    animationId = requestAnimationFrame(gameLoop);
}

function update() {
    // Move paddles
    movePaddles();
    
    // AI logic
    if (gameMode === 'solo') {
        aiLogic();
    }
    
    // Move ball
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    // Ball collision with top/bottom walls
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }
    
    // Ball collision with paddles
    const player = ball.x < canvas.width / 2 ? paddle.player1 : paddle.player2;
    
    if (collision(ball, player)) {
        // Calculate hit position
        const collidePoint = ball.y - (player.y + paddle.height / 2);
        const collisionAngle = (collidePoint / (paddle.height / 2)) * (Math.PI / 4);
        
        // Change direction
        const direction = ball.x < canvas.width / 2 ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(collisionAngle);
        ball.velocityY = ball.speed * Math.sin(collisionAngle);
        
        // Increase speed
        ball.speed = Math.min(ball.speed + 0.3, ball.maxSpeed);
    }
    
    // Score
    if (ball.x - ball.radius < 0) {
        paddle.player2.score++;
        updateScore();
        checkWinner();
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        paddle.player1.score++;
        updateScore();
        checkWinner();
        resetBall();
    }
}

function movePaddles() {
    // Player 1 Controls
    const upKey = settings.keyboardLayout === 'azerty' ? 'z' : 'w';
    const downKey = 's';

    if (keys[upKey] || keys[upKey.toUpperCase()]) {
        paddle.player1.y = Math.max(0, paddle.player1.y - settings.paddleSpeed);
    }
    if (keys[downKey] || keys[downKey.toUpperCase()]) {
        paddle.player1.y = Math.min(canvas.height - paddle.height, paddle.player1.y + settings.paddleSpeed);
    }
    
    // Player 2 (Arrow keys) - only in multiplayer
    if (gameMode === 'multi') {
        if (keys['ArrowUp']) {
            paddle.player2.y = Math.max(0, paddle.player2.y - settings.paddleSpeed);
        }
        if (keys['ArrowDown']) {
            paddle.player2.y = Math.min(canvas.height - paddle.height, paddle.player2.y + settings.paddleSpeed);
        }
    }
}

function aiLogic() {
    const config = aiConfig[settings.difficulty];
    const paddleCenter = paddle.player2.y + paddle.height / 2;
    
    // Predict ball position
    let targetY = ball.y;
    if (ball.velocityX > 0) { // Ball moving towards AI
        const timeToReach = (paddle.player2.x - ball.x) / ball.velocityX;
        targetY = ball.y + ball.velocityY * timeToReach * config.prediction;
    }
    
    // Add reaction delay
    if (Math.random() > config.reaction) {
        return;
    }
    
    // Move paddle
    const diff = targetY - paddleCenter;
    const moveSpeed = settings.paddleSpeed * config.speed;
    
    if (Math.abs(diff) > 10) {
        if (diff > 0) {
            paddle.player2.y = Math.min(canvas.height - paddle.height, paddle.player2.y + moveSpeed);
        } else {
            paddle.player2.y = Math.max(0, paddle.player2.y - moveSpeed);
        }
    }
}

function collision(ball, player) {
    const paddleX = player.x < canvas.width / 2 ? player.x : player.x;
    
    return ball.x - ball.radius < paddleX + paddle.width &&
           ball.x + ball.radius > paddleX &&
           ball.y - ball.radius < player.y + paddle.height &&
           ball.y + ball.radius > player.y;
}

// ===================================================
// RENDERING
// ===================================================
function render() {
    // Clear canvas
    ctx.fillStyle = '#0f1419';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw center line
    ctx.setLineDash([10, 15]);
    ctx.strokeStyle = '#2d3748';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw paddles
    ctx.fillStyle = '#667eea';
    ctx.fillRect(paddle.player1.x, paddle.player1.y, paddle.width, paddle.height);
    
    ctx.fillStyle = '#10b981';
    ctx.fillRect(paddle.player2.x, paddle.player2.y, paddle.width, paddle.height);
    
    // Draw ball
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw ball trail effect
    ctx.fillStyle = 'rgba(248, 250, 252, 0.3)';
    ctx.beginPath();
    ctx.arc(ball.x - ball.velocityX * 2, ball.y - ball.velocityY * 2, ball.radius * 0.7, 0, Math.PI * 2);
    ctx.fill();
}

// ===================================================
// GAME MANAGEMENT
// ===================================================
function updateScore() {
    elements.score1.textContent = paddle.player1.score;
    elements.score2.textContent = paddle.player2.score;
}

function checkWinner() {
    if (paddle.player1.score >= settings.winScore) {
        endGame('Joueur 1');
    } else if (paddle.player2.score >= settings.winScore) {
        endGame(gameMode === 'solo' ? 'IA' : 'Joueur 2');
    }
}

function endGame(winner) {
    isGameRunning = false;
    cancelAnimationFrame(animationId);
    
    elements.winnerText.textContent = `${winner} remporte la partie !`;
    elements.finalScore.textContent = `Score final: ${paddle.player1.score} - ${paddle.player2.score}`;
    elements.victoryModal.classList.remove('hidden');
}

function pauseGame() {
    isPaused = true;
    cancelAnimationFrame(animationId);
    elements.pauseMenu.classList.remove('hidden');
}

function resumeGame() {
    isPaused = false;
    elements.pauseMenu.classList.add('hidden');
    gameLoop();
}

function quitGame() {
    isGameRunning = false;
    isPaused = false;
    cancelAnimationFrame(animationId);
    hideAllScreens();
    elements.mainMenu.classList.remove('hidden');
}

function hideAllScreens() {
    elements.mainMenu.classList.add('hidden');
    elements.settingsPanel.classList.add('hidden');
    elements.gameScreen.classList.add('hidden');
    elements.pauseMenu.classList.add('hidden');
    elements.victoryModal.classList.add('hidden');
}

// ===================================================
// EVENT LISTENERS
// ===================================================
// Menu buttons
document.getElementById('soloBtn').addEventListener('click', () => initGame('solo'));
document.getElementById('multiBtn').addEventListener('click', () => initGame('multi'));

document.getElementById('settingsBtn').addEventListener('click', () => {
    hideAllScreens();
    elements.settingsPanel.classList.remove('hidden');
});

document.getElementById('backToMenuBtn').addEventListener('click', () => {
    hideAllScreens();
    elements.mainMenu.classList.remove('hidden');
});

// Game controls
document.getElementById('pauseBtn').addEventListener('click', pauseGame);
document.getElementById('quitBtn').addEventListener('click', quitGame);

// Pause menu
document.getElementById('resumeBtn').addEventListener('click', resumeGame);
document.getElementById('restartBtn').addEventListener('click', () => {
    elements.pauseMenu.classList.add('hidden');
    initGame(gameMode);
});
document.getElementById('mainMenuBtn').addEventListener('click', quitGame);

// Victory modal
document.getElementById('playAgainBtn').addEventListener('click', () => {
    elements.victoryModal.classList.add('hidden');
    initGame(gameMode);
});
document.getElementById('menuBtn').addEventListener('click', () => {
    elements.victoryModal.classList.add('hidden');
    quitGame();
});

// Settings
elements.ballSpeed.addEventListener('input', (e) => {
    settings.ballSpeed = parseInt(e.target.value);
    elements.ballSpeedValue.textContent = e.target.value;
});

elements.paddleSpeed.addEventListener('input', (e) => {
    settings.paddleSpeed = parseInt(e.target.value);
    elements.paddleSpeedValue.textContent = e.target.value;
});

elements.keyboardLayout.addEventListener('change', (e) => {
    settings.keyboardLayout = e.target.value;
    updateControlsHint();
});

function updateControlsHint() {
    const p1Keys = settings.keyboardLayout === 'azerty' ? 'Z/S' : 'W/S';
    document.querySelector('.controls-hint').textContent = `P1: ${p1Keys} | P2: ↑/↓ | Pause: P`;
    
    // Update menu controls info
    const keyElement = document.querySelector('.control-item .key');
    if (keyElement) {
        keyElement.textContent = p1Keys;
    }
}

elements.difficulty.addEventListener('change', (e) => {
    settings.difficulty = e.target.value;
});

elements.winScore.addEventListener('change', (e) => {
    settings.winScore = parseInt(e.target.value);
});

// Keyboard
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    
    if (e.key === 'Escape' && isGameRunning) {
        if (isPaused) {
            resumeGame();
        } else {
            pauseGame();
        }
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// ===================================================
// INITIALIZATION
// ===================================================
console.log('🏓 Pong Game chargé avec succès !');
