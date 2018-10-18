import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { injectIntl, defineMessages } from "react-intl";
import './Login.scss';

const messages = defineMessages({
    title: {
        id: 'login.title',
        defaultMessage: 'Log in'
    },
    signup: {
        id: 'login.signup',
        defaultMessage: 'Registry now!'
    },
    password: {
        id: 'login.password',
        defaultMessage: 'Password'
    }
})

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = event => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    onSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        const { intl: { formatMessage }, errors } = this.props;
        return (
            <div className="Login">
                <span className="span-line"></span>
                <span className="span-line"></span>
                <span className="span-line"></span>
                <span className="span-line"></span>
                <div className="Login__content">
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.onSubmit}
                        onError={errors => console.log(errors)}
                    >
                        <Typography variant="h3" gutterBottom>
                            {formatMessage(messages.title)}
                        </Typography>
                        <TextValidator
                            id="email"
                            label="Email"
                            margin="normal"
                            className="form-control"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            variant="outlined"
                            required={true}
                            validators={['required', 'isEmail']}
                            errorMessages={['This field is required', 'Email is not valid']}
                        />
                        <Typography variant="caption" gutterBottom color="secondary" align="left">
                            {errors.email ? errors.email : ''}
                        </Typography>
                        <TextValidator
                            id="password"
                            label={formatMessage(messages.password)}
                            margin="normal"
                            type="password"
                            className="form-control"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            variant="outlined"
                            required={true}
                            validators={['required']}
                            errorMessages={['This field is required']}
                        />
                        <Typography variant="caption" gutterBottom color="secondary" align="left">
                            {errors.password ? errors.password : ''}
                        </Typography>
                        <div>
                            <button type="submit" className="btn-login">{formatMessage(messages.title)}</button>
                        </div>
                    </ValidatorForm>
                    <div className="Login__footer">
                        <NavLink className="link" to='/signup'>Registry now!</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectIntl(Login);