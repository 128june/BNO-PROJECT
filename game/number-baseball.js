document.addEventListener('DOMContentLoaded', () => {
    // 게임 관련 변수
    let secretNumber = [];
    let attempts = 0;
    const maxAttempts = 10;
    let selectedNumbers = [];
    
    // DOM 요소
    const userInput = document.getElementById('user-input');
    const submitBtn = document.getElementById('submit-btn');
    const restartBtn = document.getElementById('restart-btn');
    const clearBtn = document.getElementById('clear-btn');
    const historyDiv = document.getElementById('history');
    const messageDiv = document.getElementById('message');
    const numberKeys = document.querySelectorAll('.number-key');
    
    // 게임 초기화 함수
    function initGame() {
        secretNumber = generateSecretNumber();
        attempts = 0;
        selectedNumbers = [];
        historyDiv.innerHTML = '';
        messageDiv.innerHTML = '';
        messageDiv.className = '';
        messageDiv.classList.remove('visible');
        userInput.value = '';
        enableAllNumberKeys();
        submitBtn.disabled = false;
        console.log('정답:', secretNumber.join('')); // 개발용 (실제 게임에서는 제거)
    }
    
    // 3자리 랜덤 숫자 생성 (중복 없음)
    function generateSecretNumber() {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const result = [];
        
        // Fisher-Yates 셔플 알고리즘
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * numbers.length);
            result.push(numbers[randomIndex]);
            numbers.splice(randomIndex, 1);
        }
        
        return result;
    }
    
    // 사용자 입력 검증
    function validateInput(input) {
        // 3자리 숫자인지 확인
        if (input.length !== 3) {
            return false;
        }
        
        // 각 자리가 1-9 사이의 숫자인지 확인
        for (let i = 0; i < input.length; i++) {
            const digit = parseInt(input[i]);
            if (isNaN(digit) || digit < 1 || digit > 9) {
                return false;
            }
        }
        
        // 중복된 숫자가 있는지 확인
        const uniqueDigits = new Set(input.split(''));
        if (uniqueDigits.size !== 3) {
            return false;
        }
        
        return true;
    }
    
    // 결과 계산 (스트라이크, 볼)
    function calculateResult(userGuess) {
        let strikes = 0;
        let balls = 0;
        
        // 문자열을 배열로 변환
        const userGuessArray = userGuess.split('').map(Number);
        
        // 스트라이크와 볼 계산
        for (let i = 0; i < 3; i++) {
            const digit = userGuessArray[i];
            
            if (digit === secretNumber[i]) {
                strikes++;
            } else if (secretNumber.includes(digit)) {
                balls++;
            }
        }
        
        return { strikes, balls };
    }
    
    // 결과 표시
    function displayResult(userGuess, result) {
        attempts++;
        
        const resultItem = document.createElement('div');
        resultItem.className = 'history-item';
        
        const attemptSpan = document.createElement('span');
        attemptSpan.textContent = `${attempts}회차: ${userGuess}`;
        
        const resultSpan = document.createElement('span');
        resultSpan.innerHTML = `${result.strikes}<span class="strike">S</span> ${result.balls}<span class="ball">B</span>`;
        
        resultItem.appendChild(attemptSpan);
        resultItem.appendChild(resultSpan);
        
        historyDiv.prepend(resultItem);
        
        // 게임 종료 조건 확인
        if (result.strikes === 3) {
            messageDiv.innerHTML = `🎉 축하합니다! ${attempts}번 만에 맞추셨습니다!`;
            messageDiv.className = 'success visible';
            disableAllNumberKeys();
            submitBtn.disabled = true;
            
            // 승리 효과
            celebrateWin();
        } else if (attempts >= maxAttempts) {
            messageDiv.innerHTML = `😢 게임 오버! 정답은 ${secretNumber.join('')}였습니다.`;
            messageDiv.className = 'error visible';
            disableAllNumberKeys();
            submitBtn.disabled = true;
        }
    }
    
    // 승리 축하 효과
    function celebrateWin() {
        // 숫자 키패드에 승리 효과 적용
        numberKeys.forEach(key => {
            key.classList.add('win-effect');
            setTimeout(() => {
                key.classList.remove('win-effect');
            }, 1500);
        });
    }
    
    // 숫자 키패드 활성화
    function enableAllNumberKeys() {
        numberKeys.forEach(key => {
            key.disabled = false;
            key.classList.remove('disabled');
        });
    }
    
    // 숫자 키패드 비활성화
    function disableAllNumberKeys() {
        numberKeys.forEach(key => {
            key.disabled = true;
            key.classList.add('disabled');
        });
    }
    
    // 이미 선택된 숫자 키패드 비활성화
    function updateNumberKeyState() {
        numberKeys.forEach(key => {
            const value = parseInt(key.dataset.value);
            if (selectedNumbers.includes(value)) {
                key.disabled = true;
                key.classList.add('disabled');
            } else {
                key.disabled = false;
                key.classList.remove('disabled');
            }
        });
        
        // 3개 숫자가 모두 선택되었으면 모든 키 비활성화
        if (selectedNumbers.length >= 3) {
            submitBtn.classList.add('ready');
        } else {
            submitBtn.classList.remove('ready');
        }
    }
    
    // 숫자 키 클릭 이벤트
    numberKeys.forEach(key => {
        key.addEventListener('click', () => {
            if (selectedNumbers.length < 3) {
                const value = parseInt(key.dataset.value);
                selectedNumbers.push(value);
                userInput.value = selectedNumbers.join('');
                
                // 키 누름 효과
                key.classList.add('pressed');
                setTimeout(() => {
                    key.classList.remove('pressed');
                }, 200);
                
                updateNumberKeyState();
            }
        });
    });
    
    // 클리어 버튼 클릭 이벤트
    clearBtn.addEventListener('click', () => {
        selectedNumbers = [];
        userInput.value = '';
        enableAllNumberKeys();
    });
    
    // 제출 버튼 클릭 이벤트
    submitBtn.addEventListener('click', () => {
        const userGuess = userInput.value.trim();
        
        if (!validateInput(userGuess)) {
            messageDiv.innerHTML = '⚠️ 1~9까지의 서로 다른 숫자 3개를 입력하세요!';
            messageDiv.className = 'error visible';
            return;
        }
        
        // 메시지 영역 숨기기
        messageDiv.className = '';
        messageDiv.classList.remove('visible');
        
        const result = calculateResult(userGuess);
        displayResult(userGuess, result);
        
        // 게임이 끝나지 않았으면 입력 초기화
        if (result.strikes !== 3 && attempts < maxAttempts) {
            selectedNumbers = [];
            userInput.value = '';
            enableAllNumberKeys();
        }
    });
    
    // 다시 시작 버튼 클릭 이벤트
    restartBtn.addEventListener('click', () => {
        initGame();
    });
    
    // 게임 시작
    initGame();
});