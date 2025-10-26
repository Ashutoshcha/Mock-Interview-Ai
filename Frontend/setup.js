document.addEventListener('DOMContentLoaded', () => {
    const startInterviewButton = document.getElementById('startInterviewButton');
    const interviewFocusDisplay = document.getElementById('interviewFocus');

    function loadInterviewFocus() {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category') || 'General';
        const focus = urlParams.get('focus') || 'Behavioral';
        
        
        const displayCategory = decodeURIComponent(category).replace(/([A-Z])/g, ' $1').trim();
        const displayFocus = decodeURIComponent(focus);

        interviewFocusDisplay.textContent = `Focus: ${displayCategory} - ${displayFocus}`;
        console.log(`Interview Focus loaded: ${displayCategory} - ${displayFocus}`);
    }

    function handleStartInterview() {
        const difficulty = document.querySelector('input[name="difficulty"]:checked').value;
        const bodyLanguageEnabled = document.getElementById('bodyLanguageToggle').checked;
        const focusText = interviewFocusDisplay.textContent.replace('Focus: ', '');
        
        const settings = {
            focus: focusText,
            difficulty: difficulty,
            bodyLanguageAnalysis: bodyLanguageEnabled
        };

        console.log("Starting Interview with Settings:", settings);
        
        
        window.location.href = 'interview.html';
    }

    loadInterviewFocus();
    startInterviewButton.addEventListener('click', handleStartInterview);
});