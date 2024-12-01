// Spinner Configuration
const wheel = new Winwheel({
  numSegments: 8,
  segments: [
    { fillStyle: '#eae56f', text: 'Prize 1' },
    { fillStyle: '#89f26e', text: 'Prize 2' },
    { fillStyle: '#7de6ef', text: 'Try Again' },
    { fillStyle: '#e7706f', text: 'Prize 3' }
  ],
  animation: {
    type: 'spinToStop',
    duration: 5,
    spins: 8,
    callbackFinished: showResult
  }
});

document.getElementById('spin-btn').addEventListener('click', () => {
  wheel.startAnimation();
});

function showResult(indicatedSegment) {
  if (indicatedSegment.text !== 'Try Again') {
    const uniqueCode = `WIN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    document.getElementById('unique-code').textContent = uniqueCode;
    document.getElementById('winner').style.display = 'block';
    // Save winner details to Google Drive
    saveWinnerToGoogleDrive(indicatedSegment.text, uniqueCode);
  } else {
    alert('Better luck next time!');
  }
}
