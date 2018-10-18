import React, { Component } from 'react';
import MailContent from '../../components/mail-content/MailContent';
import { connect } from 'react-redux';
import { getMailInfo, deleteRestore } from './../../actions/mailer';

class MailContentContainer extends Component {

    render() {
        const { mailContent } = this.props.mail;
        return (
            <MailContent mailContent={mailContent} deleteRestoreMail={this.deleteRestoreMail} />
        );
    }
    componentDidMount() {
        const { match } = this.props;
        this.props.getMailInfo(match.params.id);
    }

    deleteRestoreMail = id => {
        this.props.deleteRestore(id)
        // window.location.href = '/sent';
        this.props.history.goBack();
        // console.log(this.props.history);
    }
}

const mapStateToProps = (state) => ({
    mail: state.mail
})

const mapDispatchToProps = (dispatch, props) => {
    return {
        getMailInfo: id => {
            dispatch(getMailInfo(id))
        },
        deleteRestore: id => {
            dispatch(deleteRestore(id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MailContentContainer);