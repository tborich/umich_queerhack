'use strict';

const e = React.createElement;

class GoogleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
    }

    render() {
      if (this.state.liked) {
        return 'You liked this.';
      }
  
      return e(
      <div  styles={{ backgroundImage:`url(${car})` }}>
      <h1>This is red car</h1>
    </div>
      );
    }
}

const domContainer = document.querySelector('#react-google-button');
ReactDOM.render(e(GoogleButton), domContainer);