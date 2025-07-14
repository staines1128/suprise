// ✅ Enable background music on first user interaction
function enableMusicOnUserInteraction() {
  const music = document.getElementById("birthdayMusic");
  if (!music) return;

  function playMusic() {
    music.play().then(() => {
      console.log("🎵 Music started");
    }).catch((err) => {
      console.warn("Autoplay blocked:", err);
    });

    document.removeEventListener("click", playMusic);
    document.removeEventListener("keydown", playMusic);
    document.removeEventListener("touchstart", playMusic);
  }

  document.addEventListener("click", playMusic);
  document.addEventListener("keydown", playMusic);
  document.addEventListener("touchstart", playMusic);
}

window.addEventListener("DOMContentLoaded", enableMusicOnUserInteraction);

// ✅ Main surprise logic
document.getElementById("birthdayForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const birthdate = document.getElementById("birthdate").value.trim();
  const wish = document.getElementById("wish").value.trim();
  const correctBirthdate = "21-07-2005"; // 🎯 Update to the birthday

  if (birthdate === correctBirthdate) {
    // Hide form, show celebration
    document.querySelector(".form-container").classList.add("hidden");
    const messageBox = document.getElementById("messageBox");
    messageBox.classList.remove("hidden");
    messageBox.style.display = "flex";

    // 🧁 Show typing greeting
    typeMessage(`🎉 Happy Birthday, ${name}! 🎈`, "greetingText");

    // ✨ Show their wish
    document.getElementById("wishText").innerText = `✨May your wish "${wish}" come true✨`;

    // 🎈 Launch animations
    launchConfetti();
    loopConfetti();
    launchBalloons();

    // 🎤 Text-to-speech
    speakMessage(name, wish);
  } else {
    alert("Oops! Incorrect birthdate.");
  }
});

// 🎈 Balloons floating upward
function launchBalloons() {
  const container = document.getElementById("balloon-container");
  setInterval(() => {
    const balloon = document.createElement("span");
    balloon.innerText = "🎈";
    balloon.style.left = Math.random() * 100 + "%";
    balloon.style.position = "absolute";
    balloon.style.fontSize = "30px";
    balloon.style.bottom = "-50px";
    balloon.style.animation = "floatUp 10s linear infinite";
    balloon.style.animationDelay = Math.random() * 5 + "s";
    container.appendChild(balloon);

    setTimeout(() => {
      container.removeChild(balloon);
    }, 10000);
  }, 500);
}

// 🎉 Confetti blast
function launchConfetti() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) clearInterval(interval);
    const particleCount = 50 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    }));
  }, 250);
}

// 🎉 Looping confetti
function loopConfetti() {
  setInterval(() => {
    confetti({
      particleCount: 100,
      spread: 120,
      origin: { x: Math.random(), y: Math.random() * 0.5 },
    });
  }, 5000);
}

// ✨ Typing animation
function typeMessage(message, elementId, speed = 80) {
  let i = 0;
  const element = document.getElementById(elementId);
  element.innerHTML = "";
  const typer = setInterval(() => {
    element.innerHTML += message.charAt(i);
    i++;
    if (i >= message.length) clearInterval(typer);
  }, speed);
}

// 🎤 Speak greeting and wish
function speakMessage(name, wish) {
  const msg = new SpeechSynthesisUtterance(`Happy Birthday ${name}! I hope your wish, "${wish}", comes true!`);
  msg.rate = 0.9;
  msg.pitch = 1;
  window.speechSynthesis.speak(msg);
}
