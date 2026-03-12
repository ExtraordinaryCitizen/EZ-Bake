let port;
let writer;
const consoleEl = document.getElementById("console");
const inputEl = document.getElementById("input");

// Helps you log to the console
function log(msg) {
consoleEl.textContent += msg;
consoleEl.scrollTop = consoleEl.scrollHeight;
}

// Runs on loop reading serial data
// Parses a line, splits on spaces
function parseLine(line) {
    const parts = line.trim().split(/\s+/);
    if (parts.length === 0 || (parts.length === 1 && parts[0] === "")) return;
    // Example: log the parsed parts; replace with your own handling
    log(line + " -> [" + parts.join(", ") + "]\n");
}

// Runs on loop reading serial data
async function readLoop() {
    const reader = port.readable.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    try {
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split(/\r?\n/);
            buffer = lines.pop() || ""; // keep incomplete line in buffer
            for (const line of lines) {
                parseLine(line);
            }
        }
        if (buffer) parseLine(buffer);
    } catch (e) {
        if (e.name !== "NetworkError") log("\n[Read error: " + e.message + "]");
    }
}

// You can get an element by id, then subscribe to its event: in this case, onclick. Then run the connect logic
document.getElementById("connect").onclick = async () => {
try {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 115200 });
    await port.setSignals({ dataTerminalReady: true }); // Required for hardware Clear To Send
    writer = port.writable.getWriter();
    setInterval(() => {
        writer.write(new TextEncoder().encode("Q0\n")).catch(e => log("[Q0 error: " + e.message + "]\n"));
    }, 1000);
    log("[Connected]\n");
    readLoop();
} catch (e) {
    log("[Error: " + e.message + "]\n");
}
};

// Similar story for send, enter or onclick and run the send logic
document.getElementById("send").onclick = async () => {
if (!writer) return alert("Connect first!");
const text = inputEl.value + "\n";
inputEl.value = "";
try {
    await writer.write(new TextEncoder().encode(text));
} catch (e) {
    log("[Send error: " + e.message + "]\n");
}
};

// Same thing for enter input, keydown and run the send logic
inputEl.addEventListener("keydown", (e) => {
if (e.key === "Enter") document.getElementById("send").click();
});