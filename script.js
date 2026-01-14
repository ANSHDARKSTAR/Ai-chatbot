const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const toast = document.getElementById("toast");

const camBtn = document.getElementById("camBtn");
const camera = document.getElementById("camera");

const micBtn = document.getElementById("micBtn");
const voiceToggle = document.getElementById("voiceToggle");

const sendBtn = document.getElementById("sendBtn");
const textInput = document.getElementById("textInput");
const chatBox = document.getElementById("chatBox");

let cameraOn = false;
let stream = null;
let aiBusy = false;
let voiceReplyOn = true;

/* TOAST */
function showToast(msg) {
    toast.innerText = msg;
    toast.style.display = "block";
    setTimeout(() => toast.style.display = "none", 2000);
}

/* SIDEBAR */
document.getElementById("menuBtn").onclick = () => {
    sidebar.classList.add("open");
    overlay.style.display = "block";
};

overlay.onclick = () => {
    sidebar.classList.remove("open");
    overlay.style.display = "none";
};

/* CHAT */
function addMsg(text, type) {
    const d = document.createElement("div");
    d.className = type;
    d.innerText = text;
    chatBox.appendChild(d);
    chatBox.scrollTop = chatBox.scrollHeight;

    if (type === "aiMsg" && voiceReplyOn) speak(text);
}

/* SPEAK */
function speak(text) {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    speechSynthesis.speak(u);
}

/* SEND */
sendBtn.onclick = () => {
    if (aiBusy) return;
    const t = textInput.value.trim();
    if (!t) return;
    textInput.value = "";
    addMsg(t, "userMsg");
    aiResponse(t.toLowerCase());
};

/* AI */
function aiResponse(cmd) {
    aiBusy = true;
    sendBtn.disabled = true;

    setTimeout(() => {
        const reply = "💙 I’m here with you. You can talk to me freely.";
        addMsg(reply, "aiMsg");
        aiBusy = false;
        sendBtn.disabled = false;
    }, 1200);
}

/* MIC */
micBtn.onclick = () => {
    const rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    rec.lang = "auto";
    rec.onresult = e => {
        textInput.value = e.results[0][0].transcript;
    };
    rec.start();
};

/* VOICE TOGGLE */
voiceToggle.onclick = () => {
    voiceReplyOn = !voiceReplyOn;
    showToast(voiceReplyOn ? "Voice reply ON 🔊" : "Voice reply OFF 🔇");
};

/* CAMERA TOGGLE */
camBtn.onclick = async () => {
    if (!cameraOn) {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        camera.srcObject = stream;
        camera.style.display = "block";
        cameraOn = true;
        showToast("Camera is ON 📷");
    } else {
        stream.getTracks().forEach(t => t.stop());
        camera.style.display = "none";
        cameraOn = false;
        showToast("Camera is OFF ❌");
    }
};

/* SIDEBAR FUNCTIONS */
function newChat() {
    chatBox.innerHTML = "";
    overlay.click();
}
function showMood() {
    alert("Mood: Calm & Caring 💙");
}
function showHistory() {
    alert("History will open as a screen next.");
}