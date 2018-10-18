import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor'
import { AppBar, Toolbar, Button, Popper, Grow, Paper, Hidden, ClickAwayListener, MenuList, MenuItem, ListItemText } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import FormatStrikethroughIcon from '@material-ui/icons/FormatStrikethrough';
import HighlightIcon from '@material-ui/icons/Highlight';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import createHighlightPlugin from "./plugins/highlightPlugin";
import addLinkPlugin from "./plugins/addLinkPlugin";
import BlockStyleToolbar from "./plugins/BlockStyleToolbar";
import BlockHeadingToolbar from "./plugins/BlockHeadingToolbar";
import { mediaBlockRenderer } from './plugins/mediaBlockRenderer';
import './EditorDraft.scss';

const styles = theme => ({
    paper: {
        padding: 10,
    },
    textField: {
        width: '100%',
    },
    formFooter: {
        textAlign: 'right',
    },
    content: {
        border: '1px solid #999',
        borderRadius: 5,
        marginTop: 20,
        padding: 5,
    }
})

const highlightPlugin = createHighlightPlugin();

class EditorDraft extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openMenu: false,
            editorState: EditorState.createEmpty(),
        }

        this.plugins = [
            highlightPlugin,
            addLinkPlugin
        ];
    }

    onChange = editorState => {
        this.setState({
            editorState
        })
    }

    handleToggleMenu = () => {
        this.setState(state => ({ openMenu: !state.openMenu }));
    }

    handleCloseMenu = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ openMenu: false });
    }

    handleKeyCommand = command => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handle';
        }
        return 'not-hanlde'
    }

    _onBoldClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, "BOLD")
        )
    }

    _onItalicClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
        )
    }

    _onUnderlineClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
        )
    }

    _onStrikethroughClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, "STRIKETHROUGH")
        )
    }

    _onHighlightClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, 'HIGHLIGHT')
        )
    }

    _onAddLink = () => {
        const editorState = this.state.editorState;
        const selection = editorState.getSelection();
        const link = window.prompt("Paste the link -");
        if (!link) {
            this.onChange(RichUtils.toggleLink(editorState, selection, null));
            return "handled";
        }
        const content = editorState.getCurrentContent();
        const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
            url: link
        });
        const newEditorState = EditorState.push(
            editorState,
            contentWithEntity,
            "create-entity"
        );
        const entityKey = contentWithEntity.getLastCreatedEntityKey();
        this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
        return "handled";
    };

    _toggleBlockType = blockType => {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    };

    onURLChange = e => this.setState({ urlValue: e.target.value });

    focus = () => this.refs.editor.focus();

    _onAddImage = e => {
        e.preventDefault();
        const editorState = this.state.editorState;
        const urlValue = window.prompt("Paste Image Link");
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            "image",
            "IMMUTABLE",
            { src: urlValue }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editorState,
            { currentContent: contentStateWithEntity },
            "create-entity"
        );
        this.setState(
            {
                editorState: AtomicBlockUtils.insertAtomicBlock(
                    newEditorState,
                    entityKey,
                    " "
                )
            },
            () => {
                setTimeout(() => this.focus(), 0);
            }
        );
    };

    render() {
        const { classes } = this.props;
        const { openMenu } = this.state;

        const renderStyleBarMenu = (
            <MenuList>
                <MenuItem onClick={this._onBoldClick}>
                    <IconButton color="primary">
                        <FormatBoldIcon />
                    </IconButton>
                    <ListItemText inset primary="Bold" />
                </MenuItem>
                <MenuItem onClick={this._onItalicClick}>
                    <IconButton color="primary">
                        <FormatItalicIcon />
                    </IconButton>
                    <ListItemText inset primary="Italic" />
                </MenuItem>
                <MenuItem onClick={this._onUnderlineClick}>
                    <IconButton color="primary">
                        <FormatUnderlinedIcon />
                    </IconButton>
                    <ListItemText inset primary="Italic" />
                </MenuItem>
                <MenuItem onClick={this._onStrikethroughClick}>
                    <IconButton color="primary">
                        <FormatStrikethroughIcon />
                    </IconButton>
                    <ListItemText inset primary="Underline" />
                </MenuItem>
                <MenuItem onClick={this._onHighlightClick}>
                    <IconButton color="primary">
                        <HighlightIcon />
                    </IconButton>
                    <ListItemText inset primary="Highlight" />
                </MenuItem>
                <MenuItem onClick={this._onAddLink}>
                    <IconButton color="primary">
                        <InsertLinkIcon />
                    </IconButton>
                    <ListItemText inset primary="Add Link" />
                </MenuItem>
                <MenuItem onClick={this._onAddImage}>
                    <IconButton color="primary">
                        <AddPhotoAlternateIcon />
                    </IconButton>
                    <ListItemText inset primary="Add Image" />
                </MenuItem>
            </MenuList>
        )
        return (
            <React.Fragment>
                <Hidden mdUp>
                    <BlockHeadingToolbar
                        editorState={this.state.editorState}
                        onToggle={this._toggleBlockType}
                    />

                    <Button
                        buttonRef={node => {
                            this.anchorEl = node;
                        }}
                        aria-owns={openMenu ? 'menu-list-grow' : null}
                        aria-haspopup="true"
                        onClick={this.handleToggleMenu}
                    >
                        Style
                        </Button>
                    <Popper open={openMenu} anchorEl={this.anchorEl} transition>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper style={{ zIndex: 100 }}>
                                    <ClickAwayListener onClickAway={this.handleCloseMenu}>
                                        {renderStyleBarMenu}
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                    <BlockStyleToolbar
                        editorState={this.state.editorState}
                        onToggle={this._toggleBlockType}
                    />
                </Hidden>
                <Hidden smDown>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <BlockHeadingToolbar
                                editorState={this.state.editorState}
                                onToggle={this._toggleBlockType}
                            />
                            <BlockStyleToolbar
                                editorState={this.state.editorState}
                                onToggle={this._toggleBlockType}
                            />
                            <IconButton color="primary" onClick={this._onBoldClick}>
                                <FormatBoldIcon />
                            </IconButton>
                            <IconButton color="primary" onClick={this._onItalicClick}>
                                <FormatItalicIcon />
                            </IconButton>
                            <IconButton color="primary" onClick={this._onUnderlineClick}>
                                <FormatUnderlinedIcon />
                            </IconButton>
                            <IconButton color="primary" onClick={this._onStrikethroughClick}>
                                <FormatStrikethroughIcon />
                            </IconButton>
                            <IconButton color="primary" onClick={this._onHighlightClick}>
                                <HighlightIcon />
                            </IconButton>
                            <IconButton color="primary" onClick={this._onAddLink}>
                                <InsertLinkIcon />
                            </IconButton>
                            <IconButton color="primary" onClick={this._onAddImage}>
                                <AddPhotoAlternateIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Hidden>
                <div className={classes.content}>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        handleKeyCommand={this.handleKeyCommand}
                        plugins={this.plugins}
                        blockRendererFn={mediaBlockRenderer}
                        ref="editor"
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(EditorDraft);