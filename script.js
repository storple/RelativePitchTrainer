const noteFrequencies = {
    'C': 261.63,
    'C#': 277.18,
    'D': 293.66,
    'D#': 311.13,
    'E': 329.63,
    'F': 349.23,
    'F#': 369.99,
    'G': 392.00,
    'G#': 415.30,
    'A': 440.00,
    'A#': 466.16,
    'B': 493.88
};

function getRandomNote() {
    const noteNames = Object.keys(noteFrequencies);
    const randomIndex = Math.floor(Math.random() * noteNames.length);
    return noteNames[randomIndex];
}

function playNote(noteName) {
    const frequency = noteFrequencies[noteName];

    // piano-esque audio
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const oscillator = audioContext.createOscillator();
    oscillator.frequency.value = frequency;

    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const now = audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(1, now + 0.01); 
    gainNode.gain.linearRampToValueAtTime(0.5, now + 0.1); 
    gainNode.gain.linearRampToValueAtTime(0, now + 1); 

    // play the note for 1 second
    oscillator.start();
    setTimeout(() => {
        oscillator.stop();
    }, 1000); 
}

function playBothNotes() {
    var playButton = document.getElementById('playNotes');
    playButton.textContent = 'Playing...';
    playButton.disabled = true;

    playNote(notes[0])
    setTimeout(function() {
        playNote(notes[1]);
        setTimeout(function() {
            playButton.textContent = 'Play';
            playButton.disabled = false;
        }, 1000);
    }, 1000);
}

function generateNotes() {
    // makes sure both notes are not the same note
    let firstNote, secondNote;
    do {
        firstNote = getRandomNote();
        secondNote = getRandomNote();
    } while (secondNote === firstNote); 
    return [firstNote, secondNote];
}

function start() {
    notes = generateNotes();
}

function checkGuess() {
    const userGuess = document.getElementById('guess').value.toUpperCase(); // gets user input
    const correctNote = notes[1];
    const resultDiv = document.getElementById('result');

    if (userGuess === correctNote) {
        resultDiv.textContent = 'Congratulations! You guessed the correct note: ' + correctNote;
    } else {
        resultDiv.textContent = 'Sorry, the correct note was ' + correctNote + '. Try again!';
    }
}

let notes = generateNotes();