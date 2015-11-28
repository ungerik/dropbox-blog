/* global fetch */
import React from "react";
import { Tabs, Tab } from "react-bootstrap";



export default class App extends React.Component {
	static displayName = "App";

	static propTypes = {
		children: React.PropTypes.node,
	};

	state = {
		tabs: [],
	}

	componentDidMount() {
		fetch("content/pages/index.txt")
			.then(response => response.text())
			.then(body => {
				const tabs = [];
				for (const filename of body.split("\n")) {
					const md = filename.lastIndexOf(".md");
					if (md !== -1) {
						const title = filename.substring(0, md);
						const contentPath = "content/pages/" + filename;
						tabs.push({title, contentPath});
					}
				}
				this.setState({tabs});
			})
			.catch(alert);

			// fetch("content/pages/" + filename)
			// 	.then(response => response.text())
			// 	.then(content => {
			// 		tabs.push({title, content});
			// 	})
			// 	.catch(console.error);
	}

	render() {
		return (
			<div className="app-container">
				<h1>test</h1>
				<Tabs bsStyle="pills" defaultActiveKey={0}>
					<Tab eventKey={0} title="Posts">
						<div>Latest news...</div>
					</Tab>
					{
						this.state.tabs.map((tab, i) => {
							return (
								<Tab key={i+1} eventKey={i+1} title={tab.title}>
									<div>{i} {tab.content}</div>
								</Tab>
							);
						})
					}
				</Tabs>
				{this.props.children}
			</div>
		);
	}
}
