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

    toggle.addEventListener('change', function () {
        if (this.checked) {
            console.log('Dark mode activated');
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            console.log('Light mode activated');
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        console.log('Applying saved dark mode');
        document.body.classList.add('dark-mode');
        toggle.checked = true;
    } else {
        console.log('Applying saved light mode');
        document.body.classList.remove('dark-mode');
    }
});