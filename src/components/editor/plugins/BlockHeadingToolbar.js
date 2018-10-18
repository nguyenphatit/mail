import React, { Component } from "react";
import HeaderStyleDropdown from "./HeaderStyleDropdown";

export const HEADER_TYPES = [
	{ id: 'heading0', label: "-(None)-", style: "unstyled" },
	{ id: 'heading1', label: "Heading 1", style: "header-one" },
	{ id: 'heading2', label: "Heading 2", style: "header-two" },
	{ id: 'heading3', label: "Heading 3", style: "header-three" },
	{ id: 'heading4', label: "Heading 4", style: "header-four" },
	{ id: 'heading5', label: "Heading 5", style: "header-five" },
	{ id: 'heading6', label: "Heading 6", style: "header-six" }
];

export function getBlockStyle(block) {
	switch (block.getType()) {
		case "blockquote":
			return "RichEditor-blockquote";
		default:
			return null;
	}
}

class BlockHeadingToolbar extends Component {
	render() {
		const { editorState } = this.props;
		const selection = editorState.getSelection();
		const blockType = editorState
			.getCurrentContent()
			.getBlockForKey(selection.getStartKey())
			.getType();

		return (
			<React.Fragment>
				<HeaderStyleDropdown
					headerOptions={HEADER_TYPES}
					active={blockType}
					onToggle={this.props.onToggle}
				/>
			</React.Fragment>
		);
	}
}

export default BlockHeadingToolbar;
