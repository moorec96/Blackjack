import React from 'react'
import './FirstButton.css';

class FirstButton extends React.Component {
	constructor() {
		super();
		this.state = {
			num: 0
		}
		this.DoMath = this.DoMath.bind(this);
	}
	DoMath(soWeird) {
		this.setState({ num: this.state.num + 1 })
	}
	render() {
		return <button onClick={this.DoMath} className="My-Button"></button>;
	}
}

export default FirstButton