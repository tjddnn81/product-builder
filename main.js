document.addEventListener('DOMContentLoaded', () => {
    const numbersContainer = document.getElementById('numbers-container');
    const generateBtn = document.getElementById('generate-btn');
    const lightModeBtn = document.getElementById('light-mode-btn');
    const darkModeBtn = document.getElementById('dark-mode-btn');
    const runSimulatorBtn = document.getElementById('run-simulator-btn');
    const simulatorResult = document.getElementById('simulator-result');

    // --- 로또 번호 생성기 로직 ---
    const generateLottoNumbers = () => {
        numbersContainer.innerHTML = ''; // 기존 번호 삭제
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
        
        sortedNumbers.forEach(number => {
            const circle = document.createElement('div');
            circle.className = 'number-circle';
            circle.textContent = number;
            circle.style.backgroundColor = getNumberColor(number);
            numbersContainer.appendChild(circle);
        });
    };

    const getNumberColor = (number) => {
        if (number <= 10) return '#fbc400'; // 노란색
        if (number <= 20) return '#69c8f2'; // 파란색
        if (number <= 30) return '#ff7272'; // 빨간색
        if (number <= 40) return '#aaa';    // 회색
        return '#b0d840'; // 녹색
    };

    generateBtn.addEventListener('click', generateLottoNumbers);

    // --- 테마 변경 로직 ---
    lightModeBtn.addEventListener('click', () => {
        document.body.classList.remove('dark-mode');
    });

    darkModeBtn.addEventListener('click', () => {
        document.body.classList.add('dark-mode');
    });

    // --- 가상 당첨 시뮬레이터 로직 ---

    // 지난 1년치(52주) 가상 당첨 번호 데이터베이스 (실제와는 다를 수 있음)
    const pastWinningNumbersDB = Array.from({ length: 52 }, (_, i) => {
        const winningNumbers = new Set();
        while (winningNumbers.size < 6) {
            winningNumbers.add(Math.floor(Math.random() * 45) + 1);
        }
        const bonusNumber = Math.floor(Math.random() * 45) + 1;
        return {
            round: 1100 - i, // 최신 회차부터 역순으로
            numbers: Array.from(winningNumbers),
            bonus: bonusNumber
        };
    });

    const resultMessages = {
        1: [
            "세상에! 1등입니다! 은행 갈 준비 하세요!",
            "인생 역전! 1등 당첨을 축하합니다!"
        ],
        2: [
            "아깝지만 대박! 2등 당첨!",
            "보너스 볼의 행운! 2등에 당첨되셨습니다!"
        ],
        3: [
            "축하합니다! 3등 당첨! 소고기 사먹을 돈 벌었네요!",
            "3등이라니! 이 기세로 다음엔 1등을!"
        ],
        4: [
            "오! 4등 당첨! 비상금을 확보했습니다.",
            "5만원의 행복! 4등에 당첨되셨습니다."
        ],
        5: [
            "커피 한 잔 값 당첨! 5등입니다.",
            "작은 행운! 5등 당첨, 다음 기회를 노려보세요."
        ],
        0: [
            "아쉽지만 다음 기회에!",
            "낙첨! 하지만 포기하지 마세요!",
            "꽝! 그래도 번호를 확인하는 재미가 있었죠?"
        ]
    };

    const runSimulation = () => {
        const userNumbers = new Set();
        while(userNumbers.size < 6) {
            userNumbers.add(Math.floor(Math.random() * 45) + 1);
        }
        const sortedUserNumbers = Array.from(userNumbers).sort((a,b) => a - b);

        let bestRank = 0;
        let bestMatch = null;

        for (const draw of pastWinningNumbersDB) {
            const matchCount = sortedUserNumbers.filter(num => draw.numbers.includes(num)).length;
            const isBonusMatch = sortedUserNumbers.includes(draw.bonus);

            let rank = 0;
            if (matchCount === 6) rank = 1;
            else if (matchCount === 5 && isBonusMatch) rank = 2;
            else if (matchCount === 5) rank = 3;
            else if (matchCount === 4) rank = 4;
            else if (matchCount === 3) rank = 5;

            if (rank > bestRank) {
                bestRank = rank;
                bestMatch = draw;
            }
        }
        
        const messages = resultMessages[bestRank] || resultMessages[0];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];

        let resultHTML = ``;
        if (bestRank > 0 && bestMatch) {
            resultHTML = `
                <p><strong>생성된 번호:</strong> ${sortedUserNumbers.join(', ')}</p>
                <p><strong>${bestMatch.round}회차</strong>에서 최고 성적 <strong>${bestRank}등</strong>을 기록했습니다!</p>
                <p>"${randomMessage}"</p>
            `;
        } else {
             resultHTML = `
                <p><strong>생성된 번호:</strong> ${sortedUserNumbers.join(', ')}</p>
                <p>아쉽게도 지난 1년간 당첨 이력이 없습니다.</p>
                <p>"${randomMessage}"</p>
            `;
        }

        simulatorResult.innerHTML = resultHTML;
        simulatorResult.classList.add('visible');
    };

    runSimulatorBtn.addEventListener('click', runSimulation);

    // 초기 로딩 시 번호 생성
    generateLottoNumbers();
});