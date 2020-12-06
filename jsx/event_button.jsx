import React from 'react';
import ReactDOM from 'react-dom';

'use strict';

const e = React.createElement;


class NewEventWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      eventName: "",
      discription: "",
      host: "",
      location: "",
      time: "",
      show: true
     }
     this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  render() {
    if(this.state.show == false)
      return null;
    return (
      <div id = "new-event-window">
        <form>
        <label style={{float: "right"}}>
          Event Name:
          <input 
            name="eventName"
            type="string"
            value={this.state.eventName}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label style={{float: "right"}}>
          Description:
          <input
            name="discription"
            type="string"
            value={this.state.discription}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label style={{float: "right"}}>
          Host:
          <input
            name="host"
            type="string"
            value={this.state.host}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label style={{float: "right"}}>
          Location:
          <input
            name="location"
            type="string"
            value={this.state.location}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label style={{float: "right"}}>
        Time:
          <input
            name="time"
            type="string"
            value={this.state.time}
            onChange={this.handleInputChange} />
        </label>
        </form>
        <button style={{backgroundColor: "Transparent", border: "none", outline: "none", color: "#B25B00", fontSize: '30px'}}
          onClick={() => { 
            this.props.action();

            firebase.firestore().collection("events").add({
              discription: this.state.discription,
              duration: "180",
              event_name: this.state.eventName,
              host: this.state.host,
              lat: 42.291076, 
              lng: -83.777737,
              time: 0
          })
            //TODO RELOAD MAP AFTER NEW EVENT
            this.setState({ show: false });
          }}>
            Submit
          </button>
    </div>
    )
  }
}

class EventButton extends React.Component {
    constructor(props) {
      super(props);
      this.handler = this.handler.bind(this);
      this.state = { pressed: false }
      console.log("TEST");
    }
    handler() {
      this.setState({ pressed: false });
  }
    render() {
      return (
        <div>
       { this.state.pressed == false &&
          <button style={{backgroundColor: "Transparent", border: "none", outline: "none", color: "#0c99c8", position: "absolute", bottom: 0, right: '60%', fontSize: '90px'}}
          onClick={() => {
            console.log("Event Button Pressed");
            this.setState({
              pressed: true
            })
          }}>
            +
          </button>
      }

      { this.state.pressed == true &&
          <NewEventWindow action={this.handler} />
      }
      </div>
)
    }
  }

const domContainer = document.querySelector('#event_button_container');
ReactDOM.render(e(EventButton), domContainer);