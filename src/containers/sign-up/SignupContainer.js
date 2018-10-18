import React, { Component } from 'react';
import Signup from '../../components/sign-up/Signup';
import { connect } from 'react-redux';
import { registerUser } from './../../actions/index';

class SignupContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {}
        }
    }
    
    onSubmit = user => {
        this.props.signupUser(user, this.props.history)
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            // window.location.href = '/';
            this.props.history.push('/')
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            // window.location.href = '/';
            this.props.history.push('/')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        return (
            <Signup onSubmit={this.onSubmit} errors={this.props.errors} auth={this.props.auth} />
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        signupUser: (user, history) => {
            dispatch(registerUser(user, history))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(SignupContainer);