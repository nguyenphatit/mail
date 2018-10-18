import { GET_ERRORS, SET_CURRENT_USER, AUTHENTICATE } from './../constants/ActionType';
import axios from 'axios';
import { NODE_API } from './../constants/Config';
import setAuthToken from '../util/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, history) => dispatch => {
    axios.post(`${NODE_API}/api/users/register`, user)
        .then(res => window.location.href = '/login')
        .catch(err => {
            if (err.data) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            } else {
                window.location.href = ''
            }
        })
}

export const loginUser = user => dispatch => {
    axios.post(`${NODE_API}/api/users/login`, user)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decode = jwt_decode(token);
            dispatch(setCurrentUser(decode));
            authenticate();
        })
        .catch(err => {
            if (err.data) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            } else {
                window.location.href = ''
            }
        })
}

export const setCurrentUser = decode => {
    return {
        type: SET_CURRENT_USER,
        payload: decode
    }
}

export const logoutUser = history => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    window.location.href = '/login'
}

export const authenticate = () => dispatch => {
    setAuthToken(localStorage.getItem('jwtToken'))
    axios.get(`${NODE_API}/api/users/me`)
        .then(res => {
            dispatch({
                type: AUTHENTICATE,
                payload: res.data
            })
        })
        .catch(err => {
            if (err.data) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            } else {
                window.location.href = ''
            }
        })
}