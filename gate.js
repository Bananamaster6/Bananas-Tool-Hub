const TOOL_HUB_PASSWORD = "Browserfartthebesteverbananamaster667";
const STORAGE_KEY = "b6hub_unlocked_v1";

function gateEls() {
  return {
    overlay: document.getElementById("gateOverlay"),
    password: document.getElementById("gatePassword"),
    button: document.getElementById("gateButton"),
    status: document.getElementById("gateStatus"),
  };
}

function unlockUI() {
  const { overlay } = gateEls();
  if (overlay) overlay.classList.add("hidden");
  localStorage.setItem(STORAGE_KEY, "1");
}

async function checkGate() {
  const { overlay } = gateEls();
  if (!overlay) return true;
  if (localStorage.getItem(STORAGE_KEY) === "1") {
    overlay.classList.add("hidden");
    return true;
  }
  overlay.classList.remove("hidden");
  return false;
}

async function verifyGatePassword() {
  const { password, status } = gateEls();
  if (!password) return;
  const entered = password.value.trim();
  if (!entered) {
    if (status) status.textContent = "Enter the password.";
    return;
  }
  const ok = entered === TOOL_HUB_PASSWORD;
  if (!ok) {
    if (status) status.className = "status bad";
    if (status) status.textContent = "Wrong password.";
    return;
  }
  unlockUI();
  window.dispatchEvent(new Event("toolhub-unlocked"));
}

document.addEventListener("DOMContentLoaded", () => {
  const { button, password } = gateEls();
  if (button) button.addEventListener("click", verifyGatePassword);
  if (password) password.addEventListener("keydown", e => {
    if (e.key === "Enter") verifyGatePassword();
  });
});
