// Messaging app
/*
class TextEntry extends React.Component { 
	
}
*/
import React from 'react';
import ReactDOM from 'react-dom';
const e = React.createElement;
const baseapi = "https://firestore.googleapis.com/v1beta1/projects/queerhacks-um/databases/(default)/documents/"

// class HelloButton extends React.Component{
// 	render() {
// 		return e(
// 			'button',
// 			{ onClick: () => this.alert('Hello World')}
// 		);
// 	}
// }

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
		super(props);
		this.state = {
			messages: [],
			value: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	componentDidMount() {
		// Call REST API to get messages so far
		var url = baseapi + "messages";
		fetch(url)
		.then((response) => {
			if (!response.ok) throw Error(response.statusText);
			return response.json();
		})
		.then((data) => {
			console.log(data);
			this.setState({
				messages: data.documents
			});
		})
		.catch((error) => console.log(error));
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		var newmessage = {text: this.state.value}
		var defaultlat = 42.268314
		var defaultlng = -83.758558
		var defauluser = "Beth (She/Her)"

		let tosend = {
			fields: {
				user: {stringValue: defauluser},
				message: {stringValue: newmessage},
				lat: {doubleValue: defaultlat},
				lng: {doubleValue: defaultlng}
			}
		};

		// TODO Get this document posting API working :(
		// More info here:
		// https://cloud.google.com/firestore/docs/reference/rest/v1beta1/projects.databases.documents/createDocument
		var url = baseapi + "messages";
		fetch(url, {
			method: "POST",
			// headers: {
			// 	"Content-Type": "application/json",
			// },
			body: JSON.stringify(tosend),
		})
		.then((response) => {
			if (!response.ok) {
				console.log(response);
				throw Error(response.statusText);
			}
			// if (!response.ok) throw Error(response.statusText);
			return response.json();
		})
		.then((data) => {
			let allmessages = this.state.messages;
			allmessages.push(data);
			this.setState({
				messages: allmessages,
				value: ""
			});
		})
		.catch((error) => console.log(error));

	}

	render() {
		// const { messages } = this.state;
		const { messages } = this.state
		const { value } = this.state;

		// Render the messages
		return (
			<div>
				<div>
					{ messages.map( (doc, index) => (
						<p key={index}>{ doc.fields.user.stringValue } { doc.fields.message.stringValue }</p>
					)) }
				</div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" value={ value } onChange={this.handleChange} />
				</form>
			</div>
		);
	}
}

export default Messenger;
