import React, { Component } from 'react';
import Compose from '../../components/compose/Compose';
import { sendMail } from './../../actions/mailer';
import { connect } from 'react-redux';

class ComposeContainer extends Component {

    onSubmit = data => {
        this.props.sendMail(data)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        this.props.history.push('/sent')
    }

    render() {
        // console.log(this.props.mail)
        return (
            <Compose onSubmit={this.onSubmit} errors={this.props.errors} />
        );
    }
}
const mapStateToProps = (state) => ({
    mail: state.mail,
    errors: state.errors
})

const mapDispatchToProps = (dispatch, props) => {
    return {
        sendMail: data => {
            dispatch(sendMail(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComposeContainer);