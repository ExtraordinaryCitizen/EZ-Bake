WebSerial Console
=================

A prototype! Use the serial-sender below to send and receive commands from the EZ-Bake controller.

.. raw:: html

    <!-- You need to actually place down some html for the script to interact with, this is like the framework -->
    <!-- In this format too, you'll also need to squeeze some style in or put it all in static/custom.css -->
    <!DOCTYPE html>
    <html>
    <head>
        <title>EZ-Bake GUI</title>
        <script src="webserial\confirmValue.js"></script>
        <link rel="stylesheet" href="webserial\style.css">
    </head>


    <body>

    <div class="header" id="header">
        
    </div>

    <div class="top-options">
        <div><button id="connect">Connect Serial</button></div>
        <div>
            <span>Display Status</span>
            <span><input type="checkbox"></span>
        </div>
    </div>

    <div>
        <div class="info-display" style="margin-top: 0.5em;">
            <div class="num-input" id="set-temp-container">
                <label for="set-temp">Set Temperature:</label>
                <input 
                    name="set-temp" 
                    id="set-temp"
                    type="number" 
                    placeholder="°C" 
                    max=400
                    min=-70
                    onblur="confirmValue('set-temp')"
                >
            </div>
            <div class="current-readings" id="current-readings">
                <div id="current-temp-container">
                    <p id="current-temp">Current Temperature: -</p>
                </div>

                <div id="current-humidity-container">
                    <p id="current-humidity">Current Humidity: -</p>
                </div>
            </div>
        </div>
    </div>

    <div style="margin-top: 0.5em;">
    <pre id="console" style="background:#1e1e1e;color:#ffffff;padding:0.5em;min-height:8em;max-height:20em;overflow:auto;font-family:monospace;"></pre>
    <input id="input" type="text" placeholder="Type command..." style="width:70%;margin-right:0.25em;">
    <button id="send">Send</button>
    </div>

    <div>

    </div>

    <script src="webserial\serialConnect.js"></script>

    </body>
    </html>
