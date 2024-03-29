console.log("Here I am");
let streams = [
	"http://tess.fast-serv.com:8570/",
	"http://kara.fast-serv.com:8358/",
    "http://retrostrange.com:8000/radio1-mp3",
	"https://ice8.securenetsystems.net/WXRC?playSessionID=B924D20F-155D-C0F3-037E590BC7D113D6",
	"https://audio-mp3.ibiblio.org/wdav-112k"
];
let streamIndex = 0;

const FFplay = require("ffplay");
let player = new FFplay(streams[streamIndex]);

const changeChannel = newStream => {
	console.log("New Stream: " + newStream);
	player.stop();
	player = new FFplay(newStream);
}

const { exec } = require("child_process");
const Gpio = require('onoff').Gpio;
const led = new Gpio(27, 'out');
const btnTune = new Gpio(22, 'in', 'rising', {debounceTimeout: 10});
const btnStop = new Gpio(5, 'in', 'rising', {debounceTimer: 10});
let light = true;
led.writeSync(light ? 1 : 0);

const cleanUp = () => {
	console.log("CleanUp");
	player.stop();
	player = null;
	led.writeSync(0);
	led.unexport();
	btnTune.unexport();
}

const blink = () => {
	led.writeSync(0);
	setTimeout(() =>{led.writeSync(1);}, 250);
	setTimeout(() =>{led.writeSync(0);}, 500);
	setTimeout(() =>{led.writeSync(light ? 1 : 0);}, 750);
}

// Tune Button
btnTune.watch((err, value) => {
	console.log("Change Channel");
	/*
	if (err) {
		throw err;
	}
	light = !light;
	// console.log("Button Press ", (value ? "On" : "Off"), "Light: ", light);
	led.writeSync(light ? 1 : 0);
	*/
	setTimeout(blink, 1);
	changeChannel(streams[++streamIndex % streams.length]);
});

// Exit Button
btnStop.watch((err, value) => {
	console.log("Exit Button");
	if (err) {
		throw err;
	}
	cleanUp();
	exec("sudo shutdown -h now", (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
	});
});

// Clean up on Ctrl-C quit
process.on('SIGINT', _ => {
	console.log("Ctrl-C");
	cleanUp();
	process.exit(0);
});
