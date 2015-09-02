'use strict';
const React = require('react');
const GuidEntry = require('./guidEntry');

export function init(){
	React.render(<GuidEntry/>, document.getElementById('guidEntry'));
}
