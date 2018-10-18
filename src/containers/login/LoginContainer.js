import React, { Component } from 'react';
import Login from '../../components/login/Login';
import { connect } from 'react-redux';
import { loginUser } from './../../actions/authentication';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {}
        }
    }

    onSubmit = (user) => {
        this.props.loginUser(user, this.props.history);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            // window.location.href = '/';
            this.props.history.push('/')
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            // window.location.href = '/';
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        return (
            <Login onSubmit={this.onSubmit} auth={this.props.auth} errors={this.props.errors} />
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

const mapDispatchToProps = (dispatch, props) => {
    return {
        loginUser: (user, history) => {
            dispatch(loginUser(user, history))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);