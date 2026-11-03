const clockElement = document.getElementById("clock");
const welcomeMessage = document.getElementById("welcome-message");
const announcementList = document.getElementById("announcement-list");
const animationTrack = document.getElementById("animation-track");
const movingIcon = document.getElementById("moving-icon");
const animationStatus = document.getElementById("animation-status");

function updateClock() {
  clockElement.textContent = new Date().toLocaleTimeString();
}

updateClock();
setInterval(updateClock, 1000);

document.getElementById("year").textContent = new Date().getFullYear();

setTimeout(function () {
  welcomeMessage.textContent = "Welcome to EduPortal — happy learning!";
  welcomeMessage.hidden = false;
}, 700);

document.getElementById("background-button").addEventListener("click", function () {
  document.body.classList.toggle("alternate-background");
  this.textContent = document.body.classList.contains("alternate-background")
    ? "Reset page color"
    : "Change page color";
});

const hoverText = document.getElementById("hover-text");

hoverText.addEventListener("mouseover", function () {
  this.classList.add("is-enlarged");
});

hoverText.addEventListener("mouseout", function () {
  this.classList.remove("is-enlarged");
});

document.getElementById("show-announcements").addEventListener("click", function () {
  announcementList.hidden = false;
});

document.getElementById("hide-announcements").addEventListener("click", function () {
  announcementList.hidden = true;
});

let animationInterval = null;
let animationPosition = 8;
let animationDirection = 1;

document.getElementById("start-animation").addEventListener("click", function () {
  if (animationInterval !== null) {
    return;
  }

  animationStatus.textContent = "Animation is running.";
  animationInterval = setInterval(function () {
    const maxPosition = Math.max(0, animationTrack.clientWidth - movingIcon.offsetWidth - 8);

    animationPosition += 3 * animationDirection;

    if (animationPosition >= maxPosition) {
      animationPosition = maxPosition;
      animationDirection = -1;
    } else if (animationPosition <= 8) {
      animationPosition = 8;
      animationDirection = 1;
    }

    movingIcon.style.left = animationPosition + "px";
  }, 20);
});

document.getElementById("stop-animation").addEventListener("click", function () {
  if (animationInterval !== null) {
    clearInterval(animationInterval);
    animationInterval = null;
  }

  animationStatus.textContent = "Animation is stopped.";
});
