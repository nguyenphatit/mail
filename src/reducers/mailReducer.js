import {
    LOAD_ALL_MAIL_INBOX,
    LOAD_ALL_MAIL_SENT,
    LOAD_ALL_MAIL_TRASH,
    DELETE_RESTORE,
    LOAD_MAIL_INFO,
    SEND_MAIL,
    READ_MAIL
} from './../constants/ActionType';

const initialState = {
    listMail: [],
    mailContent: {},
    userMore: {}
}

const mailReducer = (state = initialState, action) => {
    let index = -1;
    switch (action.type) {
        case LOAD_ALL_MAIL_INBOX:
            return {
                ...state,
                listMail: action.payload
            }

        case LOAD_ALL_MAIL_SENT:
            return {
                ...state,
                listMail: action.payload
            }

        case LOAD_ALL_MAIL_TRASH:
            return {
                ...state,
                listMail: action.payload
            }

        case LOAD_MAIL_INFO:
            return {
                ...state,
                mailContent: action.payload
            }

        case DELETE_RESTORE:
            index = findMailById(state.listMail, action.payload)
            if (index !== -1) {
                state.listMail.splice(index, 1)
            }
            return {
                ...state
            }

        case SEND_MAIL:
            return {
                ...state,
                mailContent: action.payload
            }

        case READ_MAIL:
            return {
                ...state,
                mailContent: action.payload
            }

        default:
            return state
    }
}

let findMailById = (mails, mail) => {
    let index = -1;
    if (mails.length > 0) {
        for (let i = 0; i < mails.length; i++) {
            if (mails[i]._id === mail._id) {
                index = i;
                break;
            }
        }
    }
    return index;
}

export default mailReducer;