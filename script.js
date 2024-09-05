document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.btn');
    const quizPage = document.getElementById('quiz-page');
    const openingPage = document.getElementById('opening-page');
    const scorePage = document.getElementById('score-page');
    const categoryContainer = document.querySelector('.top-left-container');
    const quizTitle = quizPage.querySelector('h2');
    const quizQuestion = quizPage.querySelector('p');
    const answerButtons = quizPage.querySelectorAll('.answer-btn');
    const submitButton = document.getElementById('submit-answer');
    const restartButton = document.getElementById('restart-button');

    let currentQuestionIndex = 0;
    let currentQuiz = {};
    let selectedAnswer = null;
    let score = 0

    // Load the quiz data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const quizzes = data.quizzes;
            
            // Add click event listeners to each category button
            categoryButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const category = this.textContent.trim();
                    currentQuiz = quizzes.find(quiz => quiz.title === category);
                    if (currentQuiz) {
                        // Reset question index and load the first question
                        currentQuestionIndex = 0; 
                        score = 0
                        loadQuestion();
                        const categoryIcon = document.getElementById('category-icon');
                        const categoryName = document.getElementById('category-name');
                        categoryIcon.src = currentQuiz.icon;
                        categoryName.textContent = currentQuiz.title;

                        // Show the category container and quiz page
                        categoryContainer.style.display = 'flex'; //

                        // Hide the opening page and show the quiz page
                        openingPage.classList.add('hidden');
                        quizPage.classList.remove('hidden');
                    }else{
                        console.error(`No quiz found for category: ${category}`);
                    }
                });
            });
        });

    // Function to load a question
    function loadQuestion() {
        const questionObj = currentQuiz.questions[currentQuestionIndex];
        const totalQuestions = currentQuiz.questions.length;

        // Update the title with the current question number and total questions
        quizTitle.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
        quizQuestion.textContent = questionObj.question;

        // Populate the answers
        answerButtons.forEach((button, index) => {
            button.textContent = questionObj.options[index];
            button.classList.remove('selected');
            button.onclick = () => {
                answerButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                selectedAnswer = questionObj.options[index];
            };
        });

        // Reset the selected answer
        selectedAnswer = null;
        submitButton.classList.remove('hidden');
        // Update the top-left icon and category
        const topCategoryIcon = document.getElementById('top-category-icon');
        const topCategoryName = document.getElementById('top-category-name');
        
        topCategoryIcon.src = currentQuiz.icon;
        topCategoryName.textContent = currentQuiz.title;

        // Apply the dynamic background class for the icon
        topCategoryIcon.classList.remove('html-icon', 'css-icon', 'javascript-icon', 'accessibility-icon');
        if (currentQuiz.title === 'HTML') {
            topCategoryIcon.classList.add('html-icon');
        } else if (currentQuiz.title === 'CSS') {
            topCategoryIcon.classList.add('css-icon');
        } else if (currentQuiz.title === 'Javascript') {
            topCategoryIcon.classList.add('javascript-icon');
        } else if (currentQuiz.title === 'Accessibility') {
            topCategoryIcon.classList.add('accessibility-icon');
        }
    }

    // Function to check the answer when submitting
    submitButton.addEventListener('click', function() {
        if (selectedAnswer) {
            const questionObj = currentQuiz.questions[currentQuestionIndex];
            if (selectedAnswer === questionObj.answer) {
                score++; // Increase the score if the answer is correct
            }
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuiz.questions.length) {
            loadQuestion();
        } else {
            showScore();
        }
    });


    // Function to show the score
    function showScore() {
        quizPage.classList.add('hidden');
        const scorePage = document.getElementById('score-page');
        scorePage.classList.remove('hidden');
        
        // Set the score display
        const scoreNumber = document.querySelector('.score-number');
        const scoreText = document.querySelector('.score-text');
        scoreNumber.textContent = `${score}`; // or use the actual score variable
        scoreText.textContent = ` out of ${currentQuiz.questions.length}`;
    
        // Dynamically set category icon and name
        const categoryIcon = document.getElementById('category-icon');
        const categoryName = document.getElementById('category-name');
        
        categoryIcon.src = currentQuiz.icon;  // Assuming the JSON data includes the icon property
        categoryName.textContent = currentQuiz.title;  // This will be the category name, like "HTML" or "CSS"
        categoryIcon.classList.remove('html-icon', 'css-icon', 'javascript-icon', 'accessibility-icon');

    // Add background color class based on category
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



// document.getElementById('start-button').addEventListener('click', startQuiz);
// document.getElementById('restart-button').addEventListener('click', restartQuiz);

// function startQuiz() {
//     // Hide the opening page and show the quiz page
//     document.getElementById('opening-page').classList.add('hidden');
//     document.getElementById('quiz-page').classList.remove('hidden');
// }

// function showScore(score) {
//     // Hide the quiz page and show the score page
//     document.getElementById('quiz-page').classList.add('hidden');
//     document.getElementById('score-page').classList.remove('hidden');

//     // Display the score
//     document.getElementById('score').textContent = `You scored: ${score}`;
// }

// function restartQuiz() {
//     // Hide the score page and show the opening page
//     document.getElementById('score-page').classList.add('hidden');
//     document.getElementById('opening-page').classList.remove('hidden');
// }

document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('dark-mode-toggle');

    // Add event listener for dark mode toggle
    toggle.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    // Check for a saved user preference on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggle.checked = true;
    }
});