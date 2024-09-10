document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.btn');
    const quizPage = document.getElementById('quiz-page');
    const openingPage = document.getElementById('opening-page');
    const scorePage = document.getElementById('score-page');
    const categoryContainer = document.querySelector('.top-left-container')
    const quizTitle = quizPage.querySelector('h2');
    const quizQuestion = quizPage.querySelector('.question');
    const answerButtons = quizPage.querySelectorAll('.answer-btn');
    const submitButton = document.getElementById('submit-answer');
    const restartButton = document.getElementById('restart-button');

    let currentQuestionIndex = 0;
    let currentQuiz = {};
    let selectedAnswer = null;
    let score = 0
    


    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const quizzes = data.quizzes;
            
            
            categoryButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const category = this.textContent.trim();
                    currentQuiz = quizzes.find(quiz => quiz.title === category);
                    if (currentQuiz) {
                        
                        currentQuestionIndex = 0; 
                        answering = true;
                        score = 0
                        loadQuestion();

                        const categoryIcon = document.getElementById('category-icon');
                        const categoryName = document.getElementById('category-name');
                        categoryIcon.src = currentQuiz.icon;
                        categoryName.textContent = currentQuiz.title;

                        
                        categoryContainer.style.display = 'flex'; //

                        
                        openingPage.classList.add('hidden');
                        quizPage.classList.remove('hidden');
                    }else{
                        console.error(`No quiz found for category: ${category}`);
                    }
                });
            });
        });
        function updateProgressBar() {
            const totalQuestions = currentQuiz.questions.length;
            const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
            document.querySelector('.progress-fill').style.width = `${progressPercentage}%`;
        }

function loadQuestion() {
    const questionObj = currentQuiz.questions[currentQuestionIndex];
    const totalQuestions = currentQuiz.questions.length;
    updateProgressBar();
    const answerLetters = ['A', 'B', 'C', 'D'];
    const errorMessage = document.getElementById('error-message');
        errorMessage.classList.add('hidden-error');

    
    quizTitle.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
    quizQuestion.textContent = questionObj.question;

    
    answerButtons.forEach((button, index) => {
        
        button.innerHTML = `
            <span class="letter-box">${answerLetters[index]}</span>
            <span class="answer-text">${questionObj.options[index]}</span>
        `;
        button.classList.remove('selected', 'correct', 'wrong');
        button.onclick = () => {
            
            answerButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedAnswer = questionObj.options[index];
        };
        
    });

    
    selectedAnswer = null;
    submitButton.textContent = "Submit Answer";
    submitButton.classList.remove('hidden');
    answering = true; 

    
    const topCategoryIcon = document.getElementById('top-category-icon');
    const topCategoryName = document.getElementById('top-category-name');
    
    topCategoryIcon.src = currentQuiz.icon;
    topCategoryName.textContent = currentQuiz.title;

    
    topCategoryIcon.classList.remove('html-icon', 'css-icon', 'javascript-icon', 'accessibility-icon');
    if (currentQuiz.title === 'HTML') {
        topCategoryIcon.classList.add('html-icon');
    } else if (currentQuiz.title === 'CSS') {
        topCategoryIcon.classList.add('css-icon');
    } else if (currentQuiz.title === 'JavaScript') {
        topCategoryIcon.classList.add('javascript-icon');
    } else if (currentQuiz.title === 'Accessibility') {
        topCategoryIcon.classList.add('accessibility-icon');
    }
    
}


submitButton.addEventListener('click', function() {
    const errorMessage = document.getElementById('error-message');

    
    if (!selectedAnswer) {
        
        errorMessage.classList.remove('hidden-error');
    } else {
        
        errorMessage.classList.add('hidden-error');
        
        const questionObj = currentQuiz.questions[currentQuestionIndex];
        const selectedButton = document.querySelector('.selected');

        if (submitButton.textContent === 'Submit Answer') {
            
            if (selectedAnswer === questionObj.answer) {
                selectedButton.classList.add('correct');
                score++;
            } else {
                selectedButton.classList.add('wrong');
            }
            
            
            const icon = selectedAnswer === questionObj.answer 
                ? 'assets/images/icon-correct.svg' 
                : 'assets/images/icon-incorrect.svg';
            selectedButton.insertAdjacentHTML('beforeend', `<img class="icon" src="${icon}" />`);

            
            submitButton.textContent = 'Next Question';
            answering = false;
        } else {
            
            currentQuestionIndex++;
            if (currentQuestionIndex < currentQuiz.questions.length) {
                loadQuestion();
            } else {
                showScore();
            }
        }
    }
});




    
    function showScore() {
        quizPage.classList.add('hidden');
        const scorePage = document.getElementById('score-page');
        scorePage.classList.remove('hidden');
        
        
        const scoreNumber = document.querySelector('.score-number');
        const scoreText = document.querySelector('.score-text');
        scoreNumber.textContent = `${score}`;
        scoreText.textContent = ` out of ${currentQuiz.questions.length}`;
    
        
        const categoryIcon = document.getElementById('category-icon');
        const categoryName = document.getElementById('category-name');
        
        categoryIcon.src = currentQuiz.icon;
        categoryName.textContent = currentQuiz.title;
        categoryIcon.classList.remove('html-icon', 'css-icon', 'javascript-icon', 'accessibility-icon');

    
    if (currentQuiz.title === 'HTML') {
        categoryIcon.classList.add('html-icon');
    } else if (currentQuiz.title === 'CSS') {
        categoryIcon.classList.add('css-icon');
    } else if (currentQuiz.title === 'Javascript') {
        categoryIcon.classList.add('javascript-icon');
    } else if (currentQuiz.title === 'Accessibility') {
        categoryIcon.classList.add('accessibility-icon');
    }
    }
    
    restartButton.addEventListener('click', function() {
        scorePage.classList.add('hidden');
        openingPage.classList.remove('hidden');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('dark-mode-toggle');

    
    toggle.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggle.checked = true;
    }
});