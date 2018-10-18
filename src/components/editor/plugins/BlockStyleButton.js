import React from "react";
import IconButton from '@material-ui/core/IconButton';
class BlockStyleButton extends React.Component {
	onToggle = e => {
		e.preventDefault();
		this.props.onToggle(this.props.style);
	};

	render() {
		let className = "RichEditor-styleButton";
		if (this.props.active) {
			className += " RichEditor-activeButton";
		}

		return (
            <IconButton color="primary" className={className}  onClick={this.onToggle}>
				{this.props.label}
            </IconButton>
		);
	}
}

export default BlockStyleButton;
