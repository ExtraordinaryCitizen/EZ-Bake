WebSerial Console
=================

A prototype! Use the serial-sender below to send and receive commands from the EZ-Bake controller.

.. raw:: html

    <!-- You need to actually place down some html for the script to interact with, this is like the framework -->
    <!-- In this format too, you'll also need to squeeze some style in or put it all in static/custom.css -->
    <button id="connect">Connect Serial</button>
    <div style="margin-top: 0.5em;">
        <pre id="console" style="background:#1e1e1e;color:#2d2424;padding:0.5em;min-height:8em;max-height:20em;overflow:auto;font-family:monospace;"></pre>
        <input id="input" type="text" placeholder="Type command..." style="width:70%;margin-right:0.25em;">
        <button id="send">Send</button>
    </div>

    <!-- This is the script that will interact with the html -->
    <script>
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
    async function readLoop() {
        const reader = port.readable.getReader();
        const decoder = new TextDecoder();
        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                log(decoder.decode(value));
            }
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
    </script>
