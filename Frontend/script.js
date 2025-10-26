document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', () => {
        
        window.location.href = 'selection.html';
        console.log('User clicked "Start Mock Interview". Redirecting...');
    });
});