//INCLUDES
const midi = require('midi');
const fs = require('fs');

//GLOBALS
var visualsEnabled = false;
var visualsColor = 15;
var visualsTimer = null;
var visualsQueue = new midiQueue();
var frequencyData;
var noteongrid = [];
var output = new midi.output()
var input = new midi.input();

//CONFIG PARSING
var config_path = 'config.json';
var cfg = JSON.parse(fs.readFileSync(config_path, 'UTF8'));

//INIT
clog('<b>LPAtom - v0.1.2 by idiidk</b>\n');
$("#reload-btn").on("click", function () {
    loadCurrentConfig();
});

$("#save-btn").on("click", function () {
    saveCurrentConfig();
});

$("#apply-btn").on("click", function () {
    applyCurrentConfig();
});

$("#full-test-btn").on("click", function () {
    fullTest();
});

$("#visualizer-btn").on("click", function () {
    toggleVisualizer();
});

$("#reset-btn").on("click", function () {
    resetLaunchpad();
});

function reloadMidiIO() {
    output.closePort();
    input.closePort()
    output = new midi.output()
    input = new midi.input();
    clog('[+] Starting midi output on port: ' + cfg.outport.toString());

    clog(' - Ouput ports available: ' + output.getPortCount());
    clog(' - Selected port: ' + output.getPortName(cfg.outport));
    clog(' - Opening port...');
    output.openPort(cfg.outport);
    clog(' - Sending reset...');
    output.sendMessage([176, 0, 0]);
    clog('[+] Starting midi input on port: ' + cfg.inport.toString());
    clog(' - Input ports available: ' + input.getPortCount());
    clog(' - Selected port: ' + input.getPortName(cfg.inport));
    clog(' - Opening port...');
    input.openPort(cfg.inport);
    input.on('message', function (deltaTime, message) {
        messageIn(deltaTime, message);
    });
}
reloadMidiIO();

function toggleVisualizer() {
    visualsEnabled = !visualsEnabled;
    if (visualsEnabled) {
        clog("Lets try this shit!");
        if (!navigator.getUserMedia) {
            navigator.getUserMedia = navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;
        }

        if (navigator.getUserMedia) {
            navigator.getUserMedia({
                audio: true
            }, function (e) {
                var audioCtx = new AudioContext();
                var source = audioCtx.createMediaStreamSource(e)
                analyser = audioCtx.createAnalyser();
                source.connect(analyser);
                analyser.fftSize = 32;
                analyser.smoothingTimeConstant = 0.0;
                frequencyData = new Uint8Array(analyser.frequencyBinCount);
                renderFrame(frequencyData);
            }, function (e) {
                alert('Error capturing audio.');
            });
        } else {
            alert('getUserMedia not supported in this browser.');
        }
    } else {
        resetLaunchpad();
    }
}


function renderFrame(frequencyData) {
    analyser.getByteFrequencyData(frequencyData);
    var currfft = Math.round((frequencyData[0] * 8) / 256);
    for (i = 0; i < 8; i++) {
        var currtolight = (112 + 0) - ((((i)) * 16));
        if (i < currfft) {
            if (!noteongrid[currtolight]) {
                sendMidiOut([144, currtolight, visualsColor]);
                noteongrid[currtolight] = true;
            }
        } else {
            if (noteongrid[currtolight] == true) {
                sendMidiOut([144, currtolight, 0]);
                noteongrid[currtolight] = false;
            }
        }
    }
    currfft = Math.round((frequencyData[2] * 8) / 256);
    for (i = 0; i < 8; i++) {
        var currtolight = (112 + 1) - ((((i)) * 16));
        if (i < currfft) {
            if (!noteongrid[currtolight]) {
                sendMidiOut([144, currtolight, visualsColor]);
                noteongrid[currtolight] = true;
            }
        } else {
            if (noteongrid[currtolight] == true) {
                sendMidiOut([144, currtolight, 0]);
                noteongrid[currtolight] = false;
            }
        }
    }
    currfft = Math.round((frequencyData[4] * 8) / 256);
    for (i = 0; i < 8; i++) {
        var currtolight = (112 + 2) - ((((i)) * 16));
        if (i < currfft) {
            if (!noteongrid[currtolight]) {
                sendMidiOut([144, currtolight, visualsColor]);
                noteongrid[currtolight] = true;
            }
        } else {
            if (noteongrid[currtolight] == true) {
                sendMidiOut([144, currtolight, 0]);
                noteongrid[currtolight] = false;
            }
        }
    }
    currfft = Math.round((frequencyData[6] * 8) / 256);
    for (i = 0; i < 8; i++) {
        var currtolight = (112 + 3) - ((((i)) * 16));
        if (i < currfft) {
            if (!noteongrid[currtolight]) {
                sendMidiOut([144, currtolight, visualsColor]);
                noteongrid[currtolight] = true;
            }
        } else {
            if (noteongrid[currtolight] == true) {
                sendMidiOut([144, currtolight, 0]);
                noteongrid[currtolight] = false;
            }
        }
    }
    currfft = Math.round((frequencyData[8] * 8) / 256);
    for (i = 0; i < 8; i++) {
        var currtolight = (112 + 4) - ((((i)) * 16));
        if (i < currfft) {
            if (!noteongrid[currtolight]) {
                sendMidiOut([144, currtolight, visualsColor]);
                noteongrid[currtolight] = true;
            }
        } else {
            if (noteongrid[currtolight] == true) {
                sendMidiOut([144, currtolight, 0]);
                noteongrid[currtolight] = false;
            }
        }
    }
    currfft = Math.round((frequencyData[10] * 8) / 256);
    for (i = 0; i < 8; i++) {
        var currtolight = (112 + 5) - ((((i)) * 16));
        if (i < currfft) {
            if (!noteongrid[currtolight]) {
                sendMidiOut([144, currtolight, visualsColor]);
                noteongrid[currtolight] = true;
            }
        } else {
            if (noteongrid[currtolight] == true) {
                sendMidiOut([144, currtolight, 0]);
                noteongrid[currtolight] = false;
            }
        }
    }
    currfft = Math.round((frequencyData[12] * 8) / 256);
    for (i = 0; i < 8; i++) {
        var currtolight = (112 + 6) - ((((i)) * 16));
        if (i < currfft) {
            if (!noteongrid[currtolight]) {
                sendMidiOut([144, currtolight, visualsColor]);
                noteongrid[currtolight] = true;
            }
        } else {
            if (noteongrid[currtolight] == true) {
                sendMidiOut([144, currtolight, 0]);
                noteongrid[currtolight] = false;
            }
        }
    }
    currfft = Math.round((frequencyData[14] * 8) / 256);
    for (i = 0; i < 8; i++) {
        var currtolight = (112 + 7) - ((((i)) * 16));
        if (i < currfft) {
            if (!noteongrid[currtolight]) {
                sendMidiOut([144, currtolight, visualsColor]);
                noteongrid[currtolight] = true;
            }
        } else {
            if (noteongrid[currtolight] == true) {
                sendMidiOut([144, currtolight, 0]);
                noteongrid[currtolight] = false;
            }
        }
    }
    if(visualsEnabled) {
        setTimeout(function() {
            renderFrame(frequencyData);
        }, 10);
    }
}

function midiQueue() {
    this.messageArray = [];
    this.addMessageToQueue = function (packet) {
        this.messageArray.push(packet);
    }
    this.sendOut = function () {
        this.messageArray.array.forEach(function(element) {
            sendMidiOut(element);
        }, this);
        this.messageArray = [];
    }
}

function fullTest() {
    clog("<b>--- Starting full test - " + new Date() + " ---</b>\n")
    clog("Single led on / off");
    sendMidiOut([144, 96, 15]);
    setTimeout(function () {
        clog("All leds - brightness low");
        sendMidiOut([144, 96, 0]);
        sendMidiOut([176, 0, 125]);
        setTimeout(function () {
            clog("All leds - brightness medium");
            sendMidiOut([176, 0, 126]);
            setTimeout(function () {
                clog("All leds - brightness high");
                sendMidiOut([176, 0, 127]);
                setTimeout(function () {
                    clog("Scrolling text - Hello world!")
                    sendMidiOut([240, 0, 32, 41, 9, 124, 5, 72, 101, 108, 108, 111, 32, 2, 119, 111, 114, 108, 100, 33, 247]);
                    setTimeout(function () {
                        sendMidiOut([240, 0, 32, 41, 9, 0, 247]);
                        clog("Resetting Launchpad to default state")
                        sendMidiOut([176, 0, 0]);
                        clog("<b> --- Testing done! ---</b>\n");
                    }, 6500);
                }, 1500);
            }, 1500);
        }, 1500);
    }, 1500);
}

function loadCurrentConfig(apply) {
    fs.readFile("config.json", function (err, data) {
        if (err) throw err;
        $("#config-edit").val(data);
        $("#config-edit").trigger("autoresize");
        if(apply) {
            reloadMidiIO();
        }
    });
}

function saveCurrentConfig(apply = false) {
    if ($("#config-edit").val()) {
        fs.writeFile("config.json", $("#config-edit").val(), function(err) {
            if(err) throw err;
        });
        loadCurrentConfig(apply);
    } else {
        Materialize.toast("Can`t save empty config!", 3000);
    }
}

function applyCurrentConfig() {
    if ($("#config-edit").val()) {
        saveCurrentConfig();
        loadCurrentConfig(true);
    } else {
        Materialize.toast("Can`t apply empty config!", 3000);
    }
}

function messageIn(deltaTime, message) {

}

function sendMidiOut(msg) {
    if (output) {
        output.sendMessage(msg);
    }
}

function clearLog() {
    $("#log-text").text(null);
}

function clog(text) {
    console.log(text);
    $("#log-text").append(text + "\n");
}

function resetLaunchpad() {
    sendMidiOut([176, 0, 0]);
}

loadCurrentConfig();