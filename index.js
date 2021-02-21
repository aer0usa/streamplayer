console.log("Here I am");
let streams = [
	"http://tess.fast-serv.com:8570/",
	"http://kara.fast-serv.com:8358/",
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

/*
setTimeout(() => {
	console.log("stopping");
	player.stop();
	player = null;
}, 30000);
*/

const Gpio = require('onoff').Gpio;
const led = new Gpio(27, 'out');
const button = new Gpio(22, 'in', 'rising', {debounceTimeout: 10});
let light = false;

button.watch((err, value) => {
	if (err) {
		throw err;
	}
	light = !light;
	// console.log("Button Press ", (value ? "On" : "Off"), "Light: ", light);
	led.writeSync(light ? 1 : 0);
	changeChannel(streams[++streamIndex % streams.length]);
});

// Clean up on quit
process.on('SIGINT', _ => {
	player.stop();
	player = null;
	led.writeSync(0);
	led.unexport();
	button.unexport();
	process.exit(0);
});
