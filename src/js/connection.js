'use strict';
const generateGuid = require('./lib/guid');
const Peer = require('peerjs');
const getUserMedia = require('./lib/getUserMedia');
const audio = require('./audio');

const connectionStatus = {
	CONNECTED : 'CONNECTED',
	NO_CONNECTION : 'NO_CONNECTION',
	NO_INTERNET : 'NO_INTERNET',
	ERROR : 'ERROR'
};

let currentConnectionStatus = connectionStatus.NO_CONNECTION;

function connect(guid){
	let	 GUID = generateGuid();
	let monitorGuid = guid;
	console.log('attempt connect', monitorGuid);
	let peer = new Peer(GUID, {key: '1uyi3xryfsqncdi'});
	peer.connect(monitorGuid);
	peer.on('call', function(mediaConnection){
		console.log('receieved call');
		mediaConnection.answer(null);
		mediaConnection.on('stream', function(stream){
			console.log('stream', stream);
			audio.setSource(stream);
		});
	});
	window.addEventListener('beforeunload', function(){
		peer.destroy();
	});
}

module.exports = {
	init : () => {
		audio.init();
		document.body.addEventListener('listnr:connect', function(e){
			connect(e.detail.guid);
		});
	}
};
