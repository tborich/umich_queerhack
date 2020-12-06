// Messaging app
/*
class TextEntry extends React.Component { 
	
}
*/
import React from 'react';
import ReactDOM from 'react-dom';
const e = React.createElement;

class HelloButton extends React.Component{
	render() {
		return e(
			'button',
			{ onClick: () => this.alert('Hello World')}
		);
	}
}
class Messenger extends React.Component {
	/*
	renderMessage(i) {
		return (
			<Message
			value={this.props.messages[i]}
			onClick={() => this.props.onClick(i)}
			/>
		);
	}
	*
	*/
	constructor(props) {
		super(props):

	}
	render() {
		return (
			e(HelloButton),
		);
	}
}

ReactDOM.render(
	<h1>Hello, world!</h1>,
	document.getElementById('root')
);
export default Messenger;
