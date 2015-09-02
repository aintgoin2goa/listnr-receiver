'use strict';
const AudioContext = require('./lib/audioContext');

const context = new AudioContext();
const gainNode = context.createGain();
const analyser = context.createAnalyser();

function analyse(dataArray){
	analyser.getByteTimeDomainData(dataArray);
	console.log(dataArray);
	requestAnimationFrame(analyse);
}

module.exports = {
	init : () => {
		gainNode.gain.value = 1;
		analyser.fftSize = 2048;
	},
	setSource : (stream) => {
		let source = context.createMediaStreamSource(stream);
		source.connect(gainNode);
		gainNode.connect(context.destination);
		const dataArray = new Uint8Array(analyser.frequencyBinCount);
		requestAnimationFrame(analyse.bind(null, dataArray));
	}
};
