import React from "react";


export default class App extends React.Component {
	static displayName = "App";

	static propTypes = {
		children: React.PropTypes.node,
	};

	render() {
		const style = {
		};

		return (
			<div className="app-container" style={style}>
				{this.props.children}
			</div>
		);
	}
}
