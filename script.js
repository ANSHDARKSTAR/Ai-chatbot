const chatBox = document.getElementById("chatBox");
const textInput = document.getElementById("textInput");
const sendBtn = document.getElementById("sendBtn");
const micBtn = document.getElementById("micBtn");
const camBtn = document.getElementById("camBtn");
const camera = document.getElementById("camera");
const menuPanel = document.getElementById("menuPanel");

let memory = JSON.parse(localStorage.getItem("anshcore_memory")) || [];
let aiBusy = false;

/* UI HELPERS */
function addMsg(text, type) {
    const div = document.createElement("div");
    div.className = type;
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

/* SAVE MEMORY */
function saveMemory(role, text) {
    memory.push({ role, text, time: new Date().toLocaleString() });
    localStorage.setItem("anshcore_memory", JSON.stringify(memory));
}

/* SEND TEXT */
sendBtn.onclick = () => {
    if (aiBusy) return;
    let txt = textInput.value.trim();
    if (!txt) return;
    textInput.value = "";
    addMsg(txt, "userMsg");
    saveMemory("user", txt);
    aiResponse(txt.toLowerCase());
};

/* AI RESPONSE */
function aiResponse(cmd) {
    aiBusy = true;
    sendBtn.disabled = true;

    setTimeout(() => {
        let reply = emotionalReply(cmd);
        addMsg(reply, "aiMsg");
        saveMemory("ai", reply);
        aiBusy = false;
        sendBtn.disabled = false;
    }, 1200);
}

/* EMOTIONAL BRAIN */
function emotionalReply(text) {

    if (text.includes("sad") || text.includes("depressed") || text.includes("alone")) {
        return "💙 I am here with you. You are not alone. Talk to me, I will listen 🤍";
    }

    if (text.includes("happy")) {
        return "😊 That makes me smile too! Keep shining ✨";
    }

    if (text.includes("love")) {
        return "❤️ Love is powerful. You deserve it.";
    }

    return "🤖 I understand you. Tell me more...";
}

/* MENU */
document.getElementById("menuBtn").onclick = () => {
    menuPanel.classList.toggle("hidden");
};

function newChat() {
    chatBox.innerHTML = "";
}

function showHistory() {
    alert("Total memories: " + memory.length);
}

function showMood() {
    alert("ANSHCORE AI mood: Caring 💙");
}

/* CAMERA */
camBtn.onclick = async () => {
    camera.style.display = "block";
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    camera.srcObject = stream;
};