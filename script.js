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

document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');

    // Save the user's preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Check for a saved user preference on page load
window.addEventListener('load', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});