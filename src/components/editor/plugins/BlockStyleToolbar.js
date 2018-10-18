import React, { Component } from "react";
import BlockStyleButton from "./BlockStyleButton";
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import CodeIcon from '@material-ui/icons/Code';

export const BLOCK_TYPES = [
	{ id: 'quote', label: <FormatQuoteIcon />, style: "blockquote" },
	{ id: 'listBullteted', label: <FormatListBulletedIcon />, style: "unordered-list-item" },
	{ id: 'listNumbered', label: <FormatListNumberedIcon />, style: "ordered-list-item" },
	{ id: 'code', label: <CodeIcon />, style: "code-block" }
];

export function getBlockStyle(block) {
	switch (block.getType()) {
		case "blockquote":
			return "RichEditor-blockquote";
		default:
			return null;
	}
}

class BlockStyleToolbar extends Component {
	render() {
		const { editorState } = this.props;
		const selection = editorState.getSelection();
		const blockType = editorState
			.getCurrentContent()
			.getBlockForKey(selection.getStartKey())
			.getType();

		return (
			<React.Fragment>
				{BLOCK_TYPES.map(type => {
					return (
						<BlockStyleButton
							active={type.style === blockType}
							label={type.label}
							onToggle={this.props.onToggle}
							style={type.style}
							key={type.id}
							type={type}
						/>
					);
				})}
			</React.Fragment>
		);
	}
}

export default BlockStyleToolbar;
