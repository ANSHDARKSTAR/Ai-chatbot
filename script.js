const chatBox = document.getElementById("chatBox");
const textInput = document.getElementById("textInput");
const sendBtn = document.getElementById("sendBtn");
const micBtn = document.getElementById("micBtn");
const camBtn = document.getElementById("camBtn");
const camera = document.getElementById("camera");
const sidebar = document.getElementById("sidebar");
const toast = document.getElementById("toast");

let memory = JSON.parse(localStorage.getItem("anshcore_memory")) || [];
let aiBusy = false;
let cameraOn = false;
let cameraStream = null;

/* TOAST */
function showToast(msg) {
    toast.innerText = msg;
    toast.style.display = "block";
    setTimeout(() => toast.style.display = "none", 2000);
}

/* SIDEBAR TOGGLE */
document.getElementById("menuBtn").onclick = () => {
    sidebar.classList.toggle("open");
};

/* CHAT HELPERS */
function addMsg(text, type) {
    const div = document.createElement("div");
    div.className = type;
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function saveMemory(role, text) {
    memory.push({
        role,
        text,
        time: new Date().toLocaleString()
    });
    localStorage.setItem("anshcore_memory", JSON.stringify(memory));
}

/* SEND */
sendBtn.onclick = () => {
    if (aiBusy) return;
    let txt = textInput.value.trim();
    if (!txt) return;

    textInput.value = "";
    addMsg(txt, "userMsg");
    saveMemory("User", txt);
    aiResponse(txt.toLowerCase());
};

/* AI */
function aiResponse(cmd) {
    aiBusy = true;
    sendBtn.disabled = true;

    setTimeout(() => {
        let reply = emotionalReply(cmd);
        addMsg(reply, "aiMsg");
        saveMemory("ANSHCORE AI", reply);
        aiBusy = false;
        sendBtn.disabled = false;
    }, 1200);
}

function emotionalReply(text) {
    if (text.includes("sad") || text.includes("depressed") || text.includes("alone")) {
        return "💙 I’m here with you. You’re not alone. Talk to me 🤍";
    }
    if (text.includes("happy")) {
        return "😊 I love seeing you happy ✨";
    }
    return "🤖 I understand you. Tell me more...";
}

/* SIDEBAR OPTIONS */
function newChat() {
    chatBox.innerHTML = "";
    sidebar.classList.remove("open");
}

function showHistory() {
    if (memory.length === 0) {
        alert("No memory yet 🤍");
        return;
    }

    let text = "🧠 ANSHCORE AI MEMORY\n\n";
    memory.forEach((m, i) => {
        text += `${i+1}. ${m.role}\n💬 ${m.text}\n⏰ ${m.time}\n\n`;
    });
    alert(text);
}

function showMood() {
    alert("💙 Mood: Calm, Caring & Always With You");
}

/* CAMERA TOGGLE */
camBtn.onclick = async () => {
    if (!cameraOn) {
        cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
        camera.srcObject = cameraStream;
        camera.style.display = "block";
        cameraOn = true;
        showToast("Camera is ON 📷");
    } else {
        cameraStream.getTracks().forEach(track => track.stop());
        camera.style.display = "none";
        cameraOn = false;
        showToast("Camera is OFF ❌");
    }
};