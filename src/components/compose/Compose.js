import React, { Component } from 'react';
import { injectIntl, defineMessages } from "react-intl";
import { Grid, Paper, TextField, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
// import EditorDraft from '../editor/EditorDraft';

const messages = defineMessages({
    title: {
        id: 'compose.title',
        defaultMessage: 'Title'
    },
    to: {
        id: 'compose.to',
        defaultMessage: 'To'
    },
    send: {
        id: 'compose.send',
        defaultMessage: 'Send'
    },
    content: {
        id: 'compose.content',
        defaultMessage: 'Content'
    }
})

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
    contentEditor: {
        minWidth: 300,
    }
})

class Compose extends Component {

    constructor(props) {
        super(props);
        this.state = {
            receiver: '',
            title: '',
            content: ''
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    }

    onSubmit = e => {
        e.preventDefault();
        let mail = {
            receiver: this.state.receiver,
            title: this.state.title,
            content: this.state.content
        }
        this.props.onSubmit(mail)
    }

    render() {
        const { intl: { formatMessage }, classes, errors } = this.props;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                id="receiver"
                                label={formatMessage(messages.to)}
                                className={classes.textField}
                                value={this.state.receiver}
                                onChange={this.handleChange('receiver')}
                                margin="normal"
                                variant="outlined"
                                required={true}
                            />
                            <Typography variant="caption" gutterBottom color="secondary">
                                {errors.messages ? errors.messages : ''}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                id="title"
                                label={formatMessage(messages.title)}
                                className={classes.textField}
                                value={this.state.title}
                                onChange={this.handleChange('title')}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.contentEditor}>
                            <Paper className={classes.paper}>
                                <TextField
                                    id="content"
                                    label={formatMessage(messages.content)}
                                    multiline
                                    rows="4"
                                    className={classes.textField}
                                    value={this.state.content}
                                    onChange={this.handleChange('content')}
                                    margin="normal"
                                    variant="outlined"
                                    required={true}
                                />
                                <Typography variant="caption" gutterBottom color="secondary">
                                    {errors.content ? errors.content : ''}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} className={classes.formFooter}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                {formatMessage(messages.send)}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}

Compose = withStyles(styles)(Compose);

export default injectIntl(Compose);