const steamer = document.querySelector(".steamer");
const stage = document.querySelector(".stage");
const mandu = document.querySelector(".mandu");
const button = document.querySelector(".reveal-button");

button.addEventListener("click", () => {
  const isOpen = steamer.classList.toggle("is-open");
  stage.classList.toggle("is-open", isOpen);
  button.setAttribute("aria-expanded", String(isOpen));
  button.textContent = isOpen ? "Close tray" : "Open tray";
});

function boopMandu() {
  if (!steamer.classList.contains("is-open")) {
    return;
  }

  mandu.classList.remove("is-booped");
  window.requestAnimationFrame(() => {
    mandu.classList.add("is-booped");
  });
}

mandu.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  boopMandu();
});

mandu.addEventListener("animationend", (event) => {
  if (event.animationName === "mandu-boop") {
    mandu.classList.remove("is-booped");
  }
});

window.addEventListener("pointermove", (event) => {
  if (!steamer.classList.contains("is-open")) {
    return;
  }

  const rect = mandu.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const distanceX = event.clientX - centerX;
  const distanceY = event.clientY - centerY;
  const length = Math.hypot(distanceX, distanceY) || 1;
  const gazeX = (distanceX / length) * 5.5;
  const gazeY = (distanceY / length) * 4.5;

  mandu.style.setProperty("--gaze-x", `${gazeX.toFixed(2)}px`);
  mandu.style.setProperty("--gaze-y", `${gazeY.toFixed(2)}px`);
});
