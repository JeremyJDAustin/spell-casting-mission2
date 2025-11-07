// --- Declare variables ---
let enemyHealth = 100;
const log = document.getElementById("battleLog");
const healthDisplay = document.getElementById("enemyHealth");
const victoryText = document.getElementById("victory");
const body = document.body;

// Array of spells
const spells = [
  { name: "Fire", emoji: "🔥", min: 10, max: 25, color: "#FF5733" },
  { name: "Ice", emoji: "❄️", min: 5, max: 15, color: "#6ECFF6" },
  { name: "Lightning", emoji: "⚡", min: 15, max: 30, color: "#F9E79F" }
];

// --- Function to cast a spell ---
function castSpell(type) {
  const spell = spells.find(s => s.name.toLowerCase() === type);
  if (!spell) return;

  const damage = Math.floor(Math.random() * (spell.max - spell.min + 1)) + spell.min;
  enemyHealth -= damage;
  if (enemyHealth < 0) enemyHealth = 0;

  // Flash color animation
  body.style.backgroundColor = spell.color;
  setTimeout(() => body.style.backgroundColor = "#101020", 400);

  healthDisplay.textContent = enemyHealth;

  const message = `🧙 You cast ${spell.name} ${spell.emoji} and dealt ${damage} damage! (${enemyHealth} HP left)`;
  addLog(message);

  // --- Check victory condition ---
  if (enemyHealth <= 0) {
    victoryText.style.display = "block";
    addLog("🎉 The enemy has been defeated!");
    disableButtons();
    startAutoReset();
  }
}

// --- Function to update the log ---
function addLog(text) {
  const entry = document.createElement("p");
  entry.textContent = text;
  log.appendChild(entry);
  log.scrollTop = log.scrollHeight;
}

// --- Disable spell buttons ---
function disableButtons() {
  const buttons = document.querySelectorAll("#buttons button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
}

// --- Enable spell buttons ---
function enableButtons() {
  const buttons = document.querySelectorAll("#buttons button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
}

// --- Auto reset function with countdown ---
function startAutoReset() {
  let countdown = 5;
  addLog(`🔁 New battle begins in ${countdown} seconds...`);

  const timer = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      addLog(`⏳ ${countdown}...`);
    } else {
      clearInterval(timer);
      resetBattle();
    }
  }, 1000);
}

// --- Reset the battle ---
function resetBattle() {
  enemyHealth = 100;
  healthDisplay.textContent = enemyHealth;
  log.innerHTML = "";
  victoryText.style.display = "none";
  enableButtons();

  // Randomize enemy emoji each battle (fun addition)
  const enemies = ["👹", "💀", "🧛‍♂️", "🐉", "🦴"];
  document.getElementById("enemy").textContent =
    enemies[Math.floor(Math.random() * enemies.length)];

  addLog("🧙 A new enemy appears! Prepare to battle!");
  body.style.backgroundColor = "#101020";
}

// --- Event listeners for spells ---
document.getElementById("fire").addEventListener("click", () => castSpell("fire"));
document.getElementById("ice").addEventListener("click", () => castSpell("ice"));
document.getElementById("lightning").addEventListener("click", () => castSpell("lightning"));
