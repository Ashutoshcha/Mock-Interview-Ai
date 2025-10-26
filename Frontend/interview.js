document.addEventListener('DOMContentLoaded', () => {
    const answerButton = document.getElementById('answerButton');
    const recordingStatus = document.getElementById('recordingStatus');
    const progressBar = document.getElementById('progressBar');
    const timerDisplay = document.getElementById('timerDisplay');
    const pauseButton = document.getElementById('pauseButton');
    const questionCounter = document.getElementById('questionCounter');

    let isRecording = false;
    let interviewTime = 0;
    let currentQuestion = 1;
    let totalQuestions = 10;
    let recordingTimer = null;
    let totalInterviewTimer = null;

    

    function startTotalTimer() {
        totalInterviewTimer = setInterval(() => {
            interviewTime++;
            const minutes = String(Math.floor(interviewTime / 60)).padStart(2, '0');
            const seconds = String(interviewTime % 60).padStart(2, '0');
            timerDisplay.textContent = `${minutes}:${seconds}`;
        }, 1000);
    }

    function startRecordingTimer() {
        let maxTime = 120;
        let timeElapsed = 0;
        
        progressBar.style.width = '0%'; 
        
        recordingTimer = setInterval(() => {
            timeElapsed++;
            const remaining = maxTime - timeElapsed;
            const minutes = String(Math.floor(remaining / 60)).padStart(1, '0');
            const seconds = String(remaining % 60).padStart(2, '0');
            
            recordingStatus.textContent = `Recording... Time Remaining: ${minutes}:${seconds}`;
            
            progressBar.style.width = `${(timeElapsed / maxTime) * 100}%`;

            if (timeElapsed >= maxTime) {
                stopRecording(true);
            }
        }, 1000);
    }

    function stopRecording(isTimeOut = false) {
        clearInterval(recordingTimer);
        isRecording = false;
        answerButton.textContent = 'Next Question';
        answerButton.style.backgroundColor = isTimeOut ? '#ff6f00' : '#80ff00';
        recordingStatus.textContent = isTimeOut ? 'Time Out! Click Next Question.' : 'Answer Recorded. Click Next Question.';
        recordingStatus.style.visibility = 'visible';
        
        if (isTimeOut) {
            alert('Time limit reached for this question!');
        }
    }
    
    function advanceQuestion() {
        if (currentQuestion >= totalQuestions) {
            clearInterval(totalInterviewTimer);
            alert('Interview Finished! Redirecting to Results...');
            window.location.href = 'results.html';
            return;
        }
        
        currentQuestion++;
        questionCounter.textContent = `Question ${currentQuestion}/${totalQuestions}`;
        answerButton.textContent = 'Start Recording';
        answerButton.style.backgroundColor = '#00d4ff';
        recordingStatus.style.visibility = 'hidden';
        progressBar.style.width = '0%';
        
        
        document.getElementById('currentQuestion').textContent = `[Placeholder] Technical Question ${currentQuestion} for the selected focus area.`;
    }

    

    answerButton.addEventListener('click', () => {
        if (answerButton.textContent === 'Next Question') {
            advanceQuestion();
            return;
        }
        
        if (!isRecording) {
            
            isRecording = true;
            answerButton.textContent = 'Stop Recording';
            answerButton.style.backgroundColor = '#ff6f00';
            recordingStatus.style.visibility = 'visible';
            startRecordingTimer();
        } else {
            
            stopRecording();
            console.log('User finished answering question.');
        }
    });

    pauseButton.addEventListener('click', () => {
        if (totalInterviewTimer) {
            clearInterval(totalInterviewTimer);
            clearInterval(recordingTimer);
            totalInterviewTimer = null;
            pauseButton.textContent = 'Resume';
            console.log('Interview Paused.');
        } else {
            startTotalTimer();
            if (isRecording) {
                startRecordingTimer();
            }
            pauseButton.textContent = 'Pause';
        }
    });

    
    startTotalTimer();
});