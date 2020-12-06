import React from 'react';
import ReactDOM from 'react-dom';
// import firebase from 'firebase/app';
import Messenger from './messaging';

'use strict';

const e = React.createElement;

const baseapi = "https://firestore.googleapis.com/v1beta1/projects/queerhacks-um/databases/(default)/documents/"

class LikeButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          liked: false,
          disc: "Like",
      };
    }

    handleClick() {
        if( this.state.liked == false ) {
            var url = baseapi + "events/5whF03irZDEy0ovNykvv"
            console.log(url)
            fetch(url)
            .then((response) => {
                if(!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                // console.log(data)
                var disc = data.fields.discription.stringValue
                console.log("disc: ", disc)
                this.setState({
                    liked: true,
                    disc: disc
                })
            })
            .catch((error) => console.log(error));
        }
        else {
            this.setState(
                {
                    liked: false,
                    disc: "Like"
                }
            )
        }

    }

    render() {
        const { disc } = this.state

        return (
            <button onClick={() => this.handleClick()}>
                { disc.slice(0,4) }
            </button>
        );

    }
  }

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);
const messContainer = document.querySelector('#messenger_container');
ReactDOM.render(e(Messenger), messContainer);