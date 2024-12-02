(function () {
    const wheel = document.querySelector('.wheel');
    const startButton = document.querySelector('.button');
    const countdownTimer = document.getElementById('countdown-timer');
    const currentDateTime = document.getElementById('current-datetime');
    const spinCount = document.getElementById('spin-count');
    const markerSegment = document.getElementById('marker-segment');
    const randomWinNumberDisplay = document.getElementById('random-win-number');
    const messageBox = document.getElementById('message-box'); // Message box for animations
    const totalSegments = 24; // Total segments on the wheel
    const segmentAngle = 360 / totalSegments; // Angle per segment
    let deg = 0;
    let spins = 0;

    // Randomize the winning number
    let randomWinNumber = Math.floor(Math.random() * totalSegments) + 1;
    randomWinNumberDisplay.textContent = randomWinNumber;

    // Initialize countdown timer
    let countdownSeconds = 3600;
    setInterval(() => {
        const hours = String(Math.floor(countdownSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((countdownSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(countdownSeconds % 60).padStart(2, '0');
        countdownTimer.textContent = `${hours}:${minutes}:${seconds}`;
        if (countdownSeconds > 0) countdownSeconds--;
    }, 1000);

    // Update current date and time every second
    setInterval(() => {
        const now = new Date();
        currentDateTime.textContent = now.toLocaleString();
    }, 1000);

    // Spin the wheel
    startButton.addEventListener('click', () => {
        spins++;
        spinCount.textContent = spins; // Update spin count
        startButton.style.pointerEvents = 'none'; // Disable button during spin
        deg = Math.floor(3000 + Math.random() * 3000); // Random rotation
        wheel.style.transition = 'all 8s ease-out';
        wheel.style.transform = `rotate(${deg}deg)`;
        wheel.classList.add('blur');
    });

    // When the spin ends
    wheel.addEventListener('transitionend', () => {
        wheel.classList.remove('blur');
        startButton.style.pointerEvents = 'auto'; // Re-enable button
        wheel.style.transition = 'none';
        const actualDeg = deg % 360; // Normalize angle
        wheel.style.transform = `rotate(${actualDeg}deg)`;
        const winningSegment = Math.floor((360 - actualDeg) / segmentAngle) % totalSegments + 1;
        markerSegment.textContent = winningSegment; // Update marker segment

        // Check if the user won
        if (winningSegment === randomWinNumber) {
            displayMessage(`🎉 Congratulations! You won with segment ${winningSegment}!`, 'success');
        } else {
            displayMessage(`❌ You landed on segment ${winningSegment}. Please try again.`, 'failure');
        }

        // Randomize the winning number for the next spin
        randomWinNumber = Math.floor(Math.random() * totalSegments) + 1;
        randomWinNumberDisplay.textContent = randomWinNumber;
    });

    // Display a message with animation
    function displayMessage(message, type) {
        messageBox.textContent = message;
        messageBox.className = ''; // Reset classes
        messageBox.classList.add('message-box', type);
        messageBox.style.opacity = '1';
        messageBox.style.transform = 'translateY(0)';

        // Hide the message after 3 seconds
        setTimeout(() => {
            messageBox.style.opacity = '0';
            messageBox.style.transform = 'translateY(-20px)';
        }, 3000);
    }
})();
