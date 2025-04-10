document.addEventListener('DOMContentLoaded', () => {
    const questionBox = document.getElementById('question');
    const testSelector = document.getElementById('test-selector');
    const feedback = document.getElementById('feedback');
    const newQuestionButton = document.getElementById('new-question');
    const submitAnswerButton = document.getElementById('submit-answer');
    const themeToggleButton = document.getElementById('theme-toggle');

    const selectedTheme = localStorage.getItem('selectedTheme');
    if (selectedTheme) {
        document.body.classList.add(selectedTheme + '-theme');
        document.querySelector('.container').classList.add(selectedTheme + '-theme');
    }

    const starsContainer = document.querySelector('.stars');
    const numberOfStars = 100;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`;
        starsContainer.appendChild(star);
    }

    let currentQuestion = null;
    const questions = [
        { text: "Based on a random sample of 38 men's shoe prices, what is the average price of all men's similar shoes?", correctAnswer: 't-interval' },
        { text: "Based on a random sample of 45 women's handbag prices, what is the average price of all similar women's handbags?", correctAnswer: 't-interval' },
        { text: "You survey 500 randomly selected college students. What proportion of students prefer online classes over in-person classes?", correctAnswer: '1-proportion-z-interval' },
        { text: "A gym offers a new workout program to 10 members. The maximum weight they can lift is recorded at the beginning and end of the program. Does the program significantly increase the maximum weight lifted by more than 5 pounds?", correctAnswer: 'matched-pairs-t-test' },
        { text: "You select a random sample of 60 toys at a toy store and see where the toy was made. Were a majority of all the toys at the store manufactured in the USA?", correctAnswer: '1-proportion-z-test' },
        { text: "Are cats more likely to respond when you call their names than dogs? You randomly select 30 cat owners and 30 dog owners, call their pets' names, and see how many of the pets respond.", correctAnswer: '2-proportion-z-test' },
        { text: "Do older people tend to carry more cash? You ask a random sample of 50 people over the age of 50 how much cash they're carrying and do the same for a random sample of 50 people below the age of 30.", correctAnswer: '2-sample-t-test' },
        { text: "A random sample of 50 smartphones is tested for battery life. What is the average battery life of all similar smartphones?", correctAnswer: 't-interval' },
        { text: "You survey 600 high school students. What proportion of students prefer studying in the morning?", correctAnswer: '1-proportion-z-interval' },
        { text: "A company tests a new training program on 12 employees. Their productivity is measured before and after the program. Does the program significantly increase productivity?", correctAnswer: 'matched-pairs-t-test' },
        { text: "You select a random sample of 70 books at a library and check their publication year. Were a majority of the books published after 2000?", correctAnswer: '1-proportion-z-test' },
        { text: "Are electric cars more efficient than gasoline cars? You randomly select 25 electric car owners and 25 gasoline car owners and compare their mileage.", correctAnswer: '2-sample-t-test' },
        { text: "Do people who exercise regularly have lower cholesterol levels? You compare cholesterol levels of 40 regular exercisers and 40 non-exercisers.", correctAnswer: '2-sample-t-test' },
        { text: "A new diet plan is tested on 15 participants. Their weight is recorded before and after the diet. Does the diet significantly reduce weight?", correctAnswer: 'matched-pairs-t-test' },
        { text: "You survey 550 adults about their preference for digital over print media. What proportion prefers digital media?", correctAnswer: '1-proportion-z-interval' },
        { text: "A random sample of 65 laptops is tested for processing speed. What is the average processing speed of all similar laptops?", correctAnswer: 't-interval' },
        { text: "You select a random sample of 80 students and ask if they have a part-time job. Were a majority of the students employed?", correctAnswer: '1-proportion-z-test' },
        { text: "Are hybrid cars more fuel-efficient than diesel cars? You compare the fuel efficiency of 30 hybrid cars and 30 diesel cars.", correctAnswer: '2-sample-t-test' },
        { text: "A new teaching method is tested on 20 students. Their test scores are recorded before and after the method is applied. Does the method significantly improve scores?", correctAnswer: 'matched-pairs-t-test' },
        { text: "You survey 700 people about their preference for online shopping. What proportion prefers online shopping over in-store shopping?", correctAnswer: '1-proportion-z-interval' },
        { text: "A random sample of 55 tablets is tested for screen resolution. What is the average screen resolution of all similar tablets?", correctAnswer: 't-interval' },
        { text: "You select a random sample of 90 employees and ask if they are satisfied with their job. Were a majority of the employees satisfied?", correctAnswer: '1-proportion-z-test' }
    ];

    function getRandomQuestion() {
        const randomIndex = Math.floor(Math.random() * questions.length);
        return questions[randomIndex];
    }

    function loadNewQuestion() {
        currentQuestion = getRandomQuestion();
        questionBox.textContent = currentQuestion.text;
        feedback.textContent = '';
        testSelector.value = '';
    }

    function checkAnswer() {
        const selectedValue = testSelector.value;
        if (selectedValue === currentQuestion.correctAnswer) {
            feedback.textContent = 'Correct!';
        } else {
            feedback.textContent = 'Incorrect, try again.';
        }
    }

    function openThemeSelection() {
        window.location.href = 'theme-selection.html';
    }

    themeToggleButton.addEventListener('click', () => {
        anime({
            targets: themeToggleButton,
            scale: [1, 1.1, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        });
    });

    newQuestionButton.addEventListener('click', loadNewQuestion);
    submitAnswerButton.addEventListener('click', checkAnswer);
    themeToggleButton.addEventListener('click', openThemeSelection);
    loadNewQuestion();


    anime({
        targets: '.theme-selection-container',
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo'
    });
});

function selectTheme(theme) {

    localStorage.setItem('selectedTheme', theme);


    anime({
        targets: '.theme-selection-container',
        scale: [1, 0.8],
        opacity: [1, 0],
        duration: 500,
        easing: 'easeInExpo',
        complete: function() {

            window.location.href = 'index.html';
        }
    });
}

document.getElementById('submit-question').addEventListener('click', function() {
    document.getElementById('question-modal').style.display = 'block';
});

document.querySelector('.close-button').addEventListener('click', function() {
    document.getElementById('question-modal').style.display = 'none';
});

document.getElementById('send-question').addEventListener('click', function() {
    const question = document.getElementById('question-input').value;
    const answerSelector = document.getElementById('answer-selector');
    const selectedAnswer = answerSelector.value;
    if (selectedAnswer === '') {
        alert('Please select the correct answer.');
        return;
    }
    
    fetch('https://discord.com/api/webhooks/1358211714021064734/xSnw0fEHm8pdGauYYtR3Y--tqXTzfTd5TUWj53LmVFgeasutHkvJuoeVDrTuLB_htkZa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: `Question: ${question}\nCorrect Answer: ${selectedAnswer}`
        })
    }).then(response => {
        if (response.ok) {
            alert('Question submitted successfully!');
            document.getElementById('question-modal').style.display = 'none';
            document.getElementById('question-input').value = '';
            answerSelector.value = '';
        } else {
            alert('Failed to submit question.');
        }
    }).catch(error => {
        console.error('Error:', error);
        alert('Error submitting question.');
    });
});

document.getElementById('practice-tests').addEventListener('click', function() {
    document.getElementById('practice-page').style.display = 'block';
    document.querySelector('.container').style.display = 'none';
});

document.getElementById('back-button').addEventListener('click', function() {
    document.getElementById('practice-page').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
});

async function submitTestAsPDF(isAnonymous) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Collect answers and other content
    const answers = collectAnswers();
    const submission = {
        testType: 'FRQ',
        testId: 'physics1test',
        timestamp: new Date().toISOString(),
        name: isAnonymous ? 'Anonymous' : submitterName.value,
        answers: answers
    };

    // Add content to PDF
    doc.text(`Test Submission from ${submission.name}`, 10, 10);
    doc.text(`Test Type: ${submission.testType}`, 10, 20);
    doc.text(`Test ID: ${submission.testId}`, 10, 30);
    doc.text(`Timestamp: ${submission.timestamp}`, 10, 40);

    let yOffset = 50;
    Object.entries(submission.answers).forEach(([key, value]) => {
        if (key === 'canvas_data') {
            doc.text('Canvas Drawings:', 10, yOffset);
            yOffset += 10;
            Object.entries(value).forEach(([canvasKey, canvasValue]) => {
                doc.addImage(canvasValue, 'PNG', 10, yOffset, 180, 100);
                yOffset += 110;
            });
        } else {
            doc.text(`${key.replace('_', ' ')}: ${value || '(No answer provided)'}`, 10, yOffset);
            yOffset += 10;
        }
    });

    // Convert PDF to base64
    const pdfBase64 = doc.output('datauristring').split(',')[1];

    fetch('https://discord.com/api/webhooks/1358211714021064734/xSnw0fEHm8pdGauYYtR3Y--tqXTzfTd5TUWj53LmVFgeasutHkvJuoeVDrTuLB_htkZa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: `New submission from ${submission.name}`,
            files: [
                {
                    attachment: pdfBase64,
                    name: 'submission.pdf'
                }
            ]
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Your test has been submitted successfully!');
            window.location.href = 'test-results.html?test=physics1test';
        } else {
            response.text().then(text => {
                console.error('Error response:', text);
                alert('There was an error submitting your test. Please try again.');
            });
        }
    })
    .catch(error => {
        console.error('Error submitting test:', error);
        alert('There was an error submitting your test. Please try again.');
    });

    // Close modal
    submissionModal.style.display = 'none';
}

submitAnonymous.addEventListener('click', () => {
    submitTestAsPDF(true);
});

submitWithName.addEventListener('click', () => {
    if (!submitterName.value.trim()) {
        alert('Please enter your name or choose to submit anonymously.');
        return;
    }
    submitTestAsPDF(false);
});

function submitTest() {
    // Prepare the message content
    const messageContent = {
        content: "hi"
    };

    // Send a simple message to Discord webhook
    fetch('https://discord.com/api/webhooks/1358211714021064734/xSnw0fEHm8pdGauYYtR3Y--tqXTzfTd5TUWj53LmVFgeasutHkvJuoeVDrTuLB_htkZa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageContent)
    })
    .then(response => {
        if (response.ok) {
            alert('Message sent successfully!');
        } else {
            response.text().then(text => {
                console.error('Error response:', text);
                alert('There was an error sending the message. Please try again.');
            });
        }
    })
    .catch(error => {
        console.error('Error sending message:', error);
        alert('There was an error sending the message. Please try again.');
    });
}

// Trigger the test message
submitTest();

// Function to load environment variables from .env file
async function loadEnvVars() {
    try {
        const response = await fetch('.env');
        if (!response.ok) {
            throw new Error(`Failed to load .env file: ${response.status}`);
        }
        
        const text = await response.text();
        const envVars = {};
        
        // Parse the .env file content
        text.split('\n').forEach(line => {
            line = line.trim();
            if (line && !line.startsWith('#')) {
                const [key, value] = line.split('=');
                if (key && value) {
                    envVars[key.trim()] = value.trim();
                }
            }
        });
        
        return envVars;
    } catch (error) {
        console.error('Error loading environment variables:', error);
        return {};
    }
}