'use strict';
const React = require('react');

const GuidEntry = React.createClass({

	handleChange: function(e){
		var event = new CustomEvent('listnr:connect', {detail : {guid:e.target.value}});
		document.body.dispatchEvent(event);
	},

	render: function(){
		return (
			<input type="text" onChange={this.handleChange}/>
		)
	}
});

export default GuidEntry;
