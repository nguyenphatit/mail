import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { ListItem, ListItemIcon, ListItemText, Avatar, Tooltip, Hidden, Menu, MenuItem, Button } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { NavLink } from 'react-router-dom';
import './Dashboard.scss';
import { injectIntl, defineMessages } from "react-intl";

const drawerWidth = 240;
const ITEM_HEIGHT = 48;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    chartContainer: {
        marginLeft: -22,
    },
    tableContainer: {
        height: 320,
    },
    list: {
        marginTop: "20px",
        paddingLeft: "0",
        paddingTop: "0",
        paddingBottom: "0",
        marginBottom: "0",
        listStyle: "none",
        position: "unset"
    },
    item: {
        position: "relative",
        display: "block",
        textDecoration: "none",
        "&:hover,&:focus,&:visited,&": {
            color: "#FFFFFF"
        }
    },
    itemLink: {
        width: "auto",
        transition: "all 300ms linear",
        margin: "10px 15px 0",
        borderRadius: "3px",
        position: "relative",
        display: "block",
        padding: "10px 15px",
        backgroundColor: "transparent",
    },
    itemIcon: {
        width: "24px",
        height: "30px",
        fontSize: "24px",
        lineHeight: "30px",
        float: "left",
        marginRight: "15px",
        textAlign: "center",
        verticalAlign: "middle",
    },
    itemText: {
        margin: "0",
        lineHeight: "30px",
        fontSize: "14px",
        color: "#FFFFFF"
    },
});

const messages = defineMessages({
    compose: {
        id: 'compose',
        defaultMessage: 'Compose'
    },
    inbox: {
        id: 'inbox',
        defaultMessage: 'Inbox'
    },
    sent: {
        id: 'sent',
        defaultMessage: 'Sent'
    },
    drafts: {
        id: 'drafts',
        defaultMessage: 'Drafts'
    },
    trash: {
        id: 'trash',
        defaultMessage: 'Trash'
    },
    spam: {
        id: 'Spam',
        defaultMessage: 'Spam'
    }
})

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            anchorEl: null,
            user: {}
        };
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    onLogout = (e) => {
        e.preventDefault();
        this.props.onLogout(this.props.history);
    }

    render() {
        const { classes, userInfo } = this.props;
        const open = Boolean(this.state.anchorEl);
        const { intl: { formatMessage } } = this.props;
        const renderMenu = (
            <Hidden smDown>
                <Button href="/?locale=en" style={{ "color": "#fff" }}>
                    English
                </Button>
                <Button href="/?locale=vi" style={{ "color": "#fff" }}>
                    Tiếng Việt
                </Button>
                <IconButton color="inherit" onClick={this.onLogout}>
                    <ExitToAppIcon />
                </IconButton>
                <Tooltip title={ userInfo ? `${userInfo.firstname} ${userInfo.lastname}` : 'Name'} placement="bottom">
                    <Avatar alt={ userInfo ? `${userInfo.firstname} ${userInfo.lastname}` : 'Name'} src={userInfo ? userInfo.avatar :"https://material-ui.com/static/images/remy.jpg"} className={classes.avatar} />
                </Tooltip>
            </Hidden>
        )

        const renderMobileMenu = (
            <Hidden mdUp>
                <IconButton
                    aria-label="More"
                    aria-owns={open ? 'long-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={this.state.anchorEl}
                    open={open}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200,
                        },
                    }}
                >
                    <MenuItem onClick={this.handleClose}>
                        <ListItemIcon className={classes.icon}>
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="Notifications" />
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                        <Tooltip title={ userInfo ? `${userInfo.firstname} ${userInfo.lastname}` : 'Name'} placement="bottom">
                            <Avatar alt={ userInfo ? `${userInfo.firstname} ${userInfo.lastname}` : 'Name'} src={userInfo ? userInfo.avatar :"https://material-ui.com/static/images/remy.jpg"} className={classes.avatar} />
                        </Tooltip>
                        <ListItemText classes={{ primary: classes.primary }} inset primary={ userInfo ? userInfo.firstname : 'Name'} />
                    </MenuItem>
                    <MenuItem onClick={this.onLogout}>
                        <ListItemIcon className={classes.icon}>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="Sign Out" />
                    </MenuItem>
                    ))}
                </Menu>
            </Hidden>
        )

        return (
            <React.Fragment>
                <CssBaseline />
                <div className={classes.root}>
                    <AppBar
                        position="absolute"
                        className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                    >
                        <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(
                                    classes.menuButton,
                                    this.state.open && classes.menuButtonHidden,
                                )}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                variant="h6"
                                color="inherit"
                                noWrap
                                className={classes.title}
                                style={!this.state.open ? { "display": "block" } : { "display": "none" }
                                }>
                                React Mail
                            </Typography>
                            <Typography
                                variant="h6"
                                color="inherit"
                                noWrap
                                className={classes.title}
                                style={this.state.open ? { "display": "block" } : { "display": "none" }}
                            >
                                { userInfo ? userInfo.email : 'Dashboard'}
                            </Typography>
                            {renderMenu}
                            {renderMobileMenu}
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                        }}
                        open={this.state.open}
                    >
                        <div className={classes.toolbarIcon}>
                            <Typography variant="h6" color="inherit" align="center" noWrap className={classes.title}>
                                React Mail
                            </Typography>
                            <IconButton onClick={this.handleDrawerClose}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        <div align="center" style={this.state.open ? { "display": "block" } : { "display": "none" }}>
                            <NavLink
                                to='/compose'
                                activeClassName="active"
                            >
                                <button className="btnCompose">
                                    <AddIcon className="iconCompose" />
                                    <span className="textCompose">{formatMessage(messages.compose)}</span>
                                </button>
                            </NavLink>
                        </div>
                        <List component="nav" className={classes.list}>
                            <NavLink
                                to='/compose'
                                className={classes.item}
                                style={!this.state.open ? { "display": "block" } : { "display": "none" }}>
                                <ListItem button >
                                    <ListItemIcon>
                                        <AddIcon />
                                    </ListItemIcon>
                                </ListItem>
                            </NavLink>
                            <NavLink to='/' className={classes.item}>
                                <ListItem button >
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={formatMessage(messages.inbox)} />
                                </ListItem>
                            </NavLink>
                            <NavLink to='/sent' className={classes.item}>
                                <ListItem button >
                                    <ListItemIcon>
                                        <SendIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={formatMessage(messages.sent)} />
                                </ListItem>
                            </NavLink>
                            <NavLink to='/trash' className={classes.item}>
                                <ListItem button >
                                    <ListItemIcon>
                                        <DeleteIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={formatMessage(messages.trash)} />
                                </ListItem>
                            </NavLink>
                        </List>
                    </Drawer>
                    <main className={classes.content + ` mainContent`}>
                        <div className={classes.appBarSpacer} />
                        {this.props.children}
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

Dashboard = withStyles(styles)(Dashboard);

export default injectIntl(Dashboard);