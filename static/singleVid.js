document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('back-btn');
    backButton.addEventListener('click', function () {
        window.location.href = '/videos'; 
    });
});