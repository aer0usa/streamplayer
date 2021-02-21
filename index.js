console.log("Here I am");
let streams = [
	"http://tess.fast-serv.com:8570/",
	"http://kara.fast-serv.com:8358/",
	"https://ice8.securenetsystems.net/WXRC?playSessionID=B924D20F-155D-C0F3-037E590BC7D113D6",
	"https://audio-mp3.ibiblio.org/wdav-112k"
];
let streamIndex = 3;
let FFplay = require("ffplay");
let player = new FFplay(streams[streamIndex]);

setTimeout(() => {
	console.log("stopping");
	player.stop();
	player = null;
}, 30000);
