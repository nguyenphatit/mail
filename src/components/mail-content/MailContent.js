import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper,
    Grid,
    Typography,
    CardHeader,
    Avatar,
    Card,
    CardContent,
    Divider,
    Hidden,
    Tooltip,
    IconButton
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Moment from 'react-moment';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
});

class MailContent extends Component {

    deleteRestoreMail = id => {
        this.props.deleteRestoreMail(id)
    }

    render() {
        const { classes, mailContent } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Tooltip title="Delete" placement="bottom" style={mailContent.trash ? { display: 'none' } : { display: 'block' }}>
                            <IconButton aria-label="Delete" onClick={() => this.deleteRestoreMail(mailContent._id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Restore" placement="bottom" style={mailContent.trash ? { display: 'block' } : { display: 'none' }}>
                            <IconButton aria-label="Restore" onClick={() => this.deleteRestoreMail(mailContent._id)}>
                                <RestoreFromTrashIcon />
                            </IconButton>
                        </Tooltip>
                        <Paper className={classes.paper}>
                            <Typography variant="h5" gutterBottom>
                                {mailContent.title}
                            </Typography>
                            <Divider />
                            <Typography variant="caption" gutterBottom align="right">
                                <Moment format="YYYY/MM/DD">
                                    {mailContent.date}
                                </Moment>
                            </Typography>
                            <CardHeader
                                avatar={
                                    (mailContent.userSender) ?
                                        <Hidden smDown>
                                            <Avatar
                                                alt={mailContent.sender}
                                                src={mailContent.userSender.avatar}
                                                aria-label="Sender"
                                                className={classes.avatar}
                                            /></Hidden> : <Hidden mdDown><Avatar className={classes.avatar}><AccountCircleIcon /></Avatar></Hidden>

                                }
                                title={(mailContent.userSender) ?
                                    <Typography gutterBottom>
                                        <b>{mailContent.userSender.firstname} {mailContent.userSender.lastname}</b>&nbsp;
                                        <Hidden mdDown> &#60;{mailContent.userSender.email}&#62;</Hidden>
                                    </Typography> : ''}
                                subheader={(mailContent.userSender) ?
                                    <div>
                                        To: {mailContent.userReceiver.firstname} {mailContent.userReceiver.lastname}&nbsp;
                                                <Hidden mdDown>{mailContent.userReceiver.email}</Hidden></div> : ''
                                }
                            />
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant="body1">
                                        {mailContent.content}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(MailContent);