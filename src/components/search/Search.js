import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl, defineMessages } from "react-intl";

const messages = defineMessages({
    search: {
        id: 'search.search',
        defaultMessage: 'Search'
    }
})

const styles = {
    root: {
        width: '100%',
        padding: 10,
    },
};

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    }

    onClick = event => {
        event.preventDefault();
        this.props.onClick(this.state.search);
    }

    render() {
        const { intl: { formatMessage }, classes } = this.props;
        return (
            <div className={classes.root}>
                <TextField
                    id="search"
                    label={formatMessage(messages.search)}
                    fullWidth
                    value={this.state.search}
                    onChange={this.handleChange('search')}
                    margin="normal"
                />
                <div align="right">
                    <Button type="button" onClick={this.onClick} variant="contained" color="primary">
                        {formatMessage(messages.search)}
                    </Button>
                </div>
            </div>
        );
    }
}

Search = withStyles(styles)(Search)

export default injectIntl(Search);