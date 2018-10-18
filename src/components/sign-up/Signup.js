import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import { Grid, Paper, Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import './Signup.scss';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            birdthday: '',
            email: '',
            password: '',
            password_confirm: '',
            phone: '',
            address: ''
        }
    }

    handleChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        let user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            birdthday: this.state.birdthday,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
            phone: this.state.phone,
            address: this.state.address
        }
        this.props.onSubmit(user);
    }

    render() {
        const { errors } = this.props;
        return (
            <Paper className="Signup">
                <Grid container spacing={16}>
                    <Grid item xs={12} sm container>
                        <ValidatorForm
                            className="form"
                            ref="form"
                            onSubmit={this.onSubmit}
                            onError={errors => console.log(errors)}
                        >
                            <Grid item xs container direction="column" className="Signup__content" spacing={16}>
                                <Grid item xs>
                                    <Typography variant="h3" align="center" gutterBottom>
                                        Sign up
                                    </Typography>
                                    <TextValidator
                                        id="firstname"
                                        label="Firstname"
                                        margin="normal"
                                        className="form-control"
                                        name="firstname"
                                        value={this.state.firstname}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        required={true}
                                        validators={['required']}
                                        errorMessages={['This field is required']}
                                    />
                                    <TextValidator
                                        id="lastname"
                                        label="Lastname"
                                        margin="normal"
                                        className="form-control"
                                        name="lastname"
                                        value={this.state.lastname}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        required={true}
                                        validators={['required']}
                                        errorMessages={['This field is required']}
                                    />
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
                                    <br/>
                                    <Typography variant="body2" gutterBottom color="secondary">
                                        {errors ? errors.email : ''}
                                    </Typography>
                                    <TextValidator
                                        id="password"
                                        label="Password"
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
                                    <br/>
                                    <Typography variant="body2" gutterBottom color="secondary">
                                        {errors ? errors.password : ''}
                                    </Typography>
                                    <TextValidator
                                        id="password_confirm"
                                        label="Password Confirm"
                                        margin="normal"
                                        type="password"
                                        className="form-control"
                                        name="password_confirm"
                                        value={this.state.password_confirm}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        required={true}
                                        validators={['required']}
                                        errorMessages={['This field is required']}
                                    />
                                    <br/>
                                    <Typography variant="body2" gutterBottom color="secondary">
                                        {errors ? errors.password_confirm : ''}
                                    </Typography>
                                    <br />
                                    <TextValidator
                                        id="date"
                                        label="Birthday"
                                        type="date"
                                        className="form-control"
                                        name="birdthday"
                                        value={this.state.birdthday}
                                        onChange={this.handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                    />
                                    <TextValidator
                                        id="phone"
                                        label="Phone"
                                        margin="normal"
                                        className="form-control"
                                        name="phone"
                                        value={this.state.phone}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                    />
                                    <TextValidator
                                        id="address"
                                        label="Address"
                                        multiline
                                        rowsMax="4"
                                        className="form-control"
                                        name="address"
                                        value={this.state.address}
                                        onChange={this.handleChange}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Submit
                                </Button>
                            </Grid>
                            <div align="right" className="Signup__footer">
                                <NavLink className="link" to='/login'>Login now!</NavLink>
                            </div>
                        </ValidatorForm>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default Signup;