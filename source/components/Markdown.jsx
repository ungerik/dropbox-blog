import React from "react";
import marked from "marked";


export default class Markdown extends React.Component {
	static displayName = "Markdown";

	static propTypes = {
		markdown: React.PropTypes.string.isRequired,
		gfm: React.PropTypes.bool,
		tables: React.PropTypes.bool,
		breaks: React.PropTypes.bool,
		pedantic: React.PropTypes.bool,
		sanitize: React.PropTypes.bool,
		smartLists: React.PropTypes.bool,
		smartypants: React.PropTypes.bool,
	};

	static defaultProps = {
		gfm: true,
		tables: true,
		breaks: false,
		pedantic: false,
		sanitize: true,
		smartLists: true,
		smartypants: false,
	};

	render() {
		const __html = marked(this.props.markdown, this.props);
		return (
			<div dangerouslySetInnerHTML={{ __html}}></div>
		);
	}
}
