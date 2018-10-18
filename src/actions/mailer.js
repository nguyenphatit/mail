import {
    LOAD_ALL_MAIL_INBOX,
    LOAD_ALL_MAIL_SENT,
    LOAD_ALL_MAIL_TRASH,
    LOAD_MAIL_INFO,
    DELETE_RESTORE,
    SEND_MAIL,
    READ_MAIL,
    GET_ERRORS
} from './../constants/ActionType';
import axios from 'axios';
import { NODE_API } from './../constants/Config';
import setAuthToken from '../util/setAuthToken';

export const getAllMailInbox = () => dispatch => {
    const token = localStorage.getItem('jwtToken');
    setAuthToken(token)
    axios.get(`${NODE_API}/api/mails/inbox`)
        .then(res => {
            dispatch({
                type: LOAD_ALL_MAIL_INBOX,
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

export const getAllMailSent = () => dispatch => {
    const token = localStorage.getItem('jwtToken');
    setAuthToken(token)
    axios.get(`${NODE_API}/api/mails/sent`)
        .then(res => {
            dispatch({
                type: LOAD_ALL_MAIL_SENT,
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

export const getAllMailTrash = () => dispatch => {
    const token = localStorage.getItem('jwtToken');
    setAuthToken(token)
    axios.get(`${NODE_API}/api/mails/trash`)
        .then(res => {
            dispatch({
                type: LOAD_ALL_MAIL_TRASH,
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

export const getMailInfo = id => dispatch => {
    const token = localStorage.getItem('jwtToken');
    setAuthToken(token)
    axios.get(`${NODE_API}/api/mails/${id}`)
        .then(res => {
            dispatch({
                type: LOAD_MAIL_INFO,
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

export const deleteRestore = id => dispatch => {
    const token = localStorage.getItem('jwtToken');
    setAuthToken(token)
    axios.get(`${NODE_API}/api/mails/delete-restore/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_RESTORE,
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

export const sendMail = data => dispatch => {
    axios.post(`${NODE_API}/api/mails/sendmail`, data)
        .then(res => {
            dispatch({
                type: SEND_MAIL,
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

export const readMail = id => dispatch => {
    const token = localStorage.getItem('jwtToken');
    setAuthToken(token)
    axios.get(`${NODE_API}/api/mails/read/${id}`)
        .then(res => {
            dispatch({
                type: READ_MAIL,
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