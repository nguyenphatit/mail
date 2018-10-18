import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import './NotFound.scss';
import earth from './earth.png';

class NotFound extends Component {
    render() {
        return (
            <div className="NotFound">
                <div className="NotFound__content">
                    <Typography variant="h1" gutterBottom className="txtheading">
                        404
                    </Typography>
                    <Typography variant="h3" gutterBottom className="txtsubheading">
                        page not found
                    </Typography>
                    <hr />
                    <NavLink className="link" to='/'>Go Home</NavLink>
                </div>
                <div className="NotFound__image">
                    <div className="Earth">
                        <img src={earth} alt="Earth" />
                    </div>
                </div>
            </div>
        );
    }
}

export default NotFound;