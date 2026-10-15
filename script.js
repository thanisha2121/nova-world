// =====================================
// NOVA WORLD - INTERACTIVE FEATURES
// =====================================


// MOVING STARS
const starsContainer = document.getElementById("stars");

if (starsContainer) {
    for (let i = 0; i < 80; i++) {
        const star = document.createElement("span");

        star.className = "star";
        star.textContent = Math.random() > 0.5 ? "✦" : "·";
        star.style.left = Math.random() * 100 + "%";
        star.style.fontSize = (Math.random() * 12 + 5) + "px";
        star.style.animationDuration = (Math.random() * 10 + 6) + "s";
        star.style.animationDelay = (Math.random() * 10) + "s";

        starsContainer.appendChild(star);
    }
}


// HOME PAGE SURPRISE
function surprise() {
    const messages = [
        "✨ Your imagination has no limits!",
        "🚀 Every great journey begins with one step!",
        "🌟 Keep learning and discovering!",
        "💜 You can create something wonderful!",
        "🌌 Your next big idea could be amazing!"
    ];

    const output = document.getElementById("surpriseText");

    if (output) {
        output.textContent =
            messages[Math.floor(Math.random() * messages.length)];
    }
}


// NUMBER GUESSING GAME
let secretNumber = Math.floor(Math.random() * 10) + 1;

function checkGuess() {
    const input = document.getElementById("guess");
    const output = document.getElementById("guessResult");

    if (!input || !output) return;

    const guess = Number(input.value);

    if (
        input.value.trim() === "" ||
        !Number.isInteger(guess) ||
        guess < 1 ||
        guess > 10
    ) {
        output.textContent = "Enter a whole number from 1 to 10.";
        return;
    }

    if (guess === secretNumber) {
        output.textContent = "🎉 Correct! You guessed the number!";
        secretNumber = Math.floor(Math.random() * 10) + 1;
    } else if (guess < secretNumber) {
        output.textContent = "⬆️ Try a higher number!";
    } else {
        output.textContent = "⬇️ Try a lower number!";
    }
}


// COIN TOSS
function coinToss(choice) {
    const output = document.getElementById("coinResult");

    if (!output) return;

    const result = Math.random() < 0.5 ? "Heads" : "Tails";

    output.textContent =
        "🪙 Result: " + result +
        (choice === result
            ? " — You guessed correctly!"
            : " — Try again!");
}


// SPACE FACTS
function showFact() {
    const facts = [
        "🌙 The Moon orbits Earth.",
        "🔴 Mars is called the Red Planet.",
        "🪐 Saturn is famous for its rings.",
        "☀️ The Sun is a star.",
        "🌌 Our solar system is in the Milky Way galaxy."
    ];

    const output = document.getElementById("factResult");

    if (output) {
        output.textContent =
            facts[Math.floor(Math.random() * facts.length)];
    }
}


// STORY CREATOR
function showStory() {
    const title = document.getElementById("storyTitle");
    const story = document.getElementById("storyText");
    const previewTitle = document.getElementById("previewTitle");
    const previewStory = document.getElementById("previewStory");

    if (!title || !story || !previewTitle || !previewStory) return;

    previewTitle.textContent = title.value || "My Story";
    previewStory.textContent = story.value || "Write your story first!";
}


// DOWNLOAD STORY
function downloadStory() {
    const title = document.getElementById("storyTitle");
    const story = document.getElementById("storyText");

    if (!title || !story) return;

    if (!title.value.trim() && !story.value.trim()) {
        alert("Please write your story first!");
        return;
    }

    const content =
        (title.value || "My Story") + "\n\n" + story.value;

    const blob = new Blob([content], {
        type: "text/plain;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "my-nova-story.txt";
    link.click();

    URL.revokeObjectURL(url);
}


// CREATIVE IDEAS
function getIdea() {
    const ideas = [
        "🌌 Imagine a city floating among the stars.",
        "🪐 Create a story about a mysterious planet.",
        "🚀 Imagine travelling to another galaxy.",
        "✨ Invent a magical object with special powers.",
        "🌈 Design a world where everyone can fly."
    ];

    const output = document.getElementById("ideaResult");

    if (output) {
        output.textContent =
            ideas[Math.floor(Math.random() * ideas.length)];
    }
}


// MYSTERY RIDDLES
const riddles = [
    {
        question: "I have keys but no locks. I have space but no room. What am I?",
        answer: "keyboard"
    },
    {
        question: "What has hands but cannot clap?",
        answer: "clock"
    },
    {
        question: "What gets wetter as it dries?",
        answer: "towel"
    },
    {
        question: "What has a face and two hands but no arms or legs?",
        answer: "clock"
    }
];

let riddleIndex = 0;

function checkRiddle() {
    const input = document.getElementById("riddleAnswer");
    const output = document.getElementById("riddleResult");

    if (!input || !output) return;

    const answer = input.value.trim().toLowerCase();

    if (!answer) {
        output.textContent = "Enter your answer first!";
        return;
    }

    if (answer === riddles[riddleIndex].answer) {
        output.textContent = "🎉 Correct! Well done!";
    } else {
        output.textContent = "🤔 Not correct. Try again!";
    }
}

function nextRiddle() {
    const question = document.getElementById("riddleQuestion");
    const input = document.getElementById("riddleAnswer");
    const output = document.getElementById("riddleResult");

    if (!question || !input || !output) return;

    riddleIndex = (riddleIndex + 1) % riddles.length;

    question.textContent = riddles[riddleIndex].question;
    input.value = "";
    output.textContent = "";
}


// =====================================
// BACKGROUND MUSIC - NOVA WORLD
// No music.mp3 file required!
// =====================================

let musicContext = null;
let musicTimer = null;
let musicPlaying = false;
let musicNote = 0;

async function toggleMusic() {
    const button = document.getElementById("musicButton");
    const status = document.getElementById("musicStatus");

    if (!button) return;

    // Stop music if already playing
    if (musicPlaying) {
        stopMusic();

        button.textContent = "🎵 Play Music";

        if (status) {
            status.textContent = "Music stopped.";
        }

        return;
    }

    const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
        if (status) {
            status.textContent =
                "Your browser does not support audio.";
        }
        return;
    }

    try {
        if (!musicContext || musicContext.state === "closed") {
            musicContext = new AudioContextClass();
        }

        await musicContext.resume();

        musicPlaying = true;
        musicNote = 0;

        button.textContent = "⏸ Stop Music";

        if (status) {
            status.textContent = "Playing a little space melody ✨";
        }

        // Space-style melody
        const melody = [
            261.63,
            329.63,
            392.00,
            523.25,
            392.00,
            329.63,
            293.66,
            349.23
        ];

        function playNote() {
            if (!musicPlaying || !musicContext) return;

            const oscillator = musicContext.createOscillator();
            const gain = musicContext.createGain();

            oscillator.type = "sine";

            oscillator.frequency.value =
                melody[musicNote % melody.length];

            const now = musicContext.currentTime;

            // Increased volume
            gain.gain.setValueAtTime(0.0001, now);

            gain.gain.exponentialRampToValueAtTime(
                0.30,
                now + 0.04
            );

            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                now + 0.48
            );

            oscillator.connect(gain);
            gain.connect(musicContext.destination);

            oscillator.start(now);
            oscillator.stop(now + 0.5);

            musicNote++;
        }

        playNote();

        musicTimer = setInterval(playNote, 550);

    } catch (error) {
        musicPlaying = false;

        if (status) {
            status.textContent = "Audio could not start. Try again.";
        }

        console.error("Music error:", error);
    }
}


// STOP MUSIC
function stopMusic() {
    musicPlaying = false;

    if (musicTimer) {
        clearInterval(musicTimer);
        musicTimer = null;
    }

    if (musicContext && musicContext.state !== "closed") {
        musicContext.suspend();
    }
}