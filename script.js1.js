// Get all button and section elements
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const backBtn = document.getElementById('back-btn');
const buttonContainer = document.querySelector('.button-container');
const yesResult = document.getElementById('yes-result');
const noResult = document.getElementById('no-result');

// State variable to control No button movement
let noButtonMoving = false;
let gameOver = false;

// Initialize event listeners
function initializeListeners() {
    yesBtn.addEventListener('click', handleYesClick);
    noBtn.addEventListener('mouseover', handleNoHover);
    noBtn.addEventListener('click', handleNoClick);
    noBtn.addEventListener('touchstart', handleNoTouchStart);
    backBtn.addEventListener('click', handleBackClick);
}

// Yes button clicked
function handleYesClick() {
    // Hide the button container
    buttonContainer.style.display = 'none';
    
    // Show the yes result section
    yesResult.removeAttribute('hidden');
    
    // Show the back button
    backBtn.removeAttribute('hidden');
    
    // Disable no button movement
    noButtonMoving = false;
    gameOver = true;
}

// No button hover - move the button away
function handleNoHover(e) {
    if (gameOver) return;
    
    // Move button to random position
    moveNoButtonAway();
}

// No button touch start - move the button away
function handleNoTouchStart(e) {
    if (gameOver) return;
    
    e.preventDefault();
    moveNoButtonAway();
}

// No button clicked - show cat result
function handleNoClick(e) {
    if (!gameOver) {
        // Stop button movement
        noButtonMoving = false;
        gameOver = true;
        
        // Hide the button container
        buttonContainer.style.display = 'none';
        
        // Show the no result section
        noResult.removeAttribute('hidden');
        
        // Show the back button
        backBtn.removeAttribute('hidden');
        
        // Reset button position
        noBtn.style.position = 'static';
        noBtn.style.transform = 'none';
    }
}

// Back button clicked - reset everything
function handleBackClick() {
    // Hide both result sections
    yesResult.setAttribute('hidden', '');
    noResult.setAttribute('hidden', '');
    
    // Show button container
    buttonContainer.style.display = 'flex';
    
    // Hide back button
    backBtn.setAttribute('hidden', '');
    
    // Reset no button position and style
    noBtn.style.position = 'static';
    noBtn.style.left = 'auto';
    noBtn.style.top = 'auto';
    noBtn.style.transform = 'none';
    
    // Reset game state
    noButtonMoving = false;
    gameOver = false;
}

// Move No button to random position
function moveNoButtonAway() {
    if (gameOver) return;
    
    noButtonMoving = true;
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Get button dimensions
    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;
    
    // Calculate random position with safety margins
    const randomX = Math.random() * (viewportWidth - buttonWidth - 20) + 10;
    const randomY = Math.random() * (viewportHeight - buttonHeight - 20) + 10;
    
    // Apply fixed positioning
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    // Add slight rotation for playful effect
    const rotation = (Math.random() - 0.5) * 15;
    noBtn.style.transform = `rotate(${rotation}deg)`;
}

// Initialize the script when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeListeners);
} else {
    initializeListeners();
}
