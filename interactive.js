const moods = [
  { emoji: "😀", color: "#FFFACD", message: "You're feeling cheerful and full of energy!" },
  { emoji: "😴", color: "#B0E0E6", message: "Sleepy vibes… maybe it’s nap time." },
  { emoji: "😎", color: "#FFD700", message: "Cool and confident, ready to conquer the day." },
  { emoji: "😡", color: "#F08080", message: "Uh oh… maybe step back and take a deep breath." },
  { emoji: "🤔", color: "#90EE90", message: "Curious and thoughtful — keep exploring!" },
  { emoji: "🥳", color: "#D8BFD8", message: "It’s party mode! Celebrate the little wins!" },
  { emoji: "😭", color: "#ADD8E6", message: "A little sad today, but brighter days are ahead." },
  { emoji: "🤩", color: "#FFB6C1", message: "You're starstruck and amazed by something!" }
];

let clickCount = 0;
const moodHistory = [];

// --- Function to generate a random mood ---
function generateMood() {
  clickCount++;

  // Pick a random mood index
  const randomIndex = Math.floor(Math.random() * moods.length);

  // Comparative and arithmetic operators in action
  if (clickCount % 5 === 0) {
    console.log("You've clicked 5 times! Keep going!");
  }

  // Retrieve DOM elements
  const moodEl = document.getElementById("mood");
  const messageEl = document.getElementById("message");
  const body = document.body;
  const list = document.getElementById("moodList");

  // Simple fade-out effect
  moodEl.style.opacity = 0;

  // Wait for fade, then apply new mood
  setTimeout(() => {
    const mood = moods[randomIndex];
    moodEl.textContent = mood.emoji;
    messageEl.textContent = mood.message;
    body.style.backgroundColor = mood.color;
    moodEl.style.opacity = 1;

    // Add mood to history list
    moodHistory.push(mood.emoji);
    updateHistory(list);

    // Update document title
    document.title = `Mood Machine - ${clickCount} Clicks`;
  }, 400);
}

// --- Function to update mood history list ---
function updateHistory(list) {
  list.innerHTML = ""; // clear list
  // Demonstrate looping
  for (let i = moodHistory.length - 1; i >= 0; i--) {
    const li = document.createElement("li");
    li.textContent = `Mood ${moodHistory.length - i}: ${moodHistory[i]}`;
    list.appendChild(li);
  }
}

// --- Event listener ---
document.getElementById("moodButton").addEventListener("click", generateMood);
