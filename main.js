const generateBtn = document.getElementById('generate-btn');
const numbersContainer = document.getElementById('numbers-container');
const lightModeBtn = document.getElementById('light-mode-btn');
const darkModeBtn = document.getElementById('dark-mode-btn');

generateBtn.addEventListener('click', () => {
    numbersContainer.innerHTML = '';
    const lottoNumbers = generateLottoNumbers();

    lottoNumbers.forEach(number => {
        const circle = document.createElement('div');
        circle.className = 'number-circle';
        circle.textContent = number;
        circle.style.backgroundColor = getRandomColor();
        numbersContainer.appendChild(circle);
    });
});

lightModeBtn.addEventListener('click', () => {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
});

darkModeBtn.addEventListener('click', () => {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
});

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function getRandomColor() {
    const colors = [
        '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
        '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
        '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
        '#FF5722', '#795548', '#607D8B'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 페이지 로드 시 저장된 테마 적용
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});
