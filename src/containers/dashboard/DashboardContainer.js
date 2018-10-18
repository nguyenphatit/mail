import React, { Component } from 'react';
import Dashboard from '../../components/dashboard/Dashboard';
import { connect } from 'react-redux';
import { logoutUser, authenticate } from './../../actions/authentication';

class DashboardContainer extends Component {

    onLogout = history => {
        this.props.onLogout(history);
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            window.location.href = '/mail/login';
        }
        this.props.authenticate();
    }

    render() {
        const { userInfo } = this.props.auth;
        return (
            <Dashboard
                onLogout={this.onLogout}
                userInfo={userInfo}
            >
                {this.props.children}
            </Dashboard>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProp = (dispatch, props) => {
    return {
        onLogout: history => {
            dispatch(logoutUser(history))
        },
        authenticate: () => {
            dispatch(authenticate())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(DashboardContainer);