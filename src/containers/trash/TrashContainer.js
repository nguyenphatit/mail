import React, { Component } from 'react';
import { injectIntl, defineMessages } from "react-intl";
import { connect } from 'react-redux';
import { getAllMailTrash, deleteRestore, readMail } from '../../actions/mailer';
import ListMail from '../../components/list/ListMail';
import MailItem from '../../components/list-item/MailItem';
import Search from './../../components/search/Search';
import Sort from './../../components/sort/Sort';
import { Typography, Divider } from '@material-ui/core';

const messages = defineMessages({
    messageContent: {
        id: 'trashcontainer.messageContent',
        defaultMessage: 'No content'
    }
})

class TrashContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            sort: {
                by: '',
                value: 1
            }
        }
    }

    render() {
        let { listMail } = this.props.mail;
        let { search, sort } = this.state;
        const { intl: { formatMessage } } = this.props;
        if (search) {
            listMail = listMail.filter(item => {
                return (
                    item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
                    || item.userSender.email.toLowerCase().indexOf(search.toLowerCase()) !== -1
                    || item.userReceiver.email.toLowerCase().indexOf(search.toLowerCase()) !== -1
                    || item.userSender.firstname.toLowerCase().indexOf(search.toLowerCase()) !== -1
                    || item.userSender.lastname.toLowerCase().indexOf(search.toLowerCase()) !== -1
                    || item.userReceiver.firstname.toLowerCase().indexOf(search.toLowerCase()) !== -1
                    || item.userReceiver.lastname.toLowerCase().indexOf(search.toLowerCase()) !== -1
                );
            })
        }
        if (sort.by === 'by Date') {
            listMail = listMail.sort((mB, mE) => {
                if (mB.date > mE.date) return sort.value
                else if (mB.date < mE.date) return -sort.value
                return 0
            })
        }
        if (sort.by === 'by Name') {
            listMail = listMail.sort((mB, mE) => {
                if (mB.date > mE.date) return sort.value
                else if (mB.date < mE.date) return -sort.value
                return 0
            })
        }
        let showMail = listMail.map((item, index) => {
            return <MailItem
                item={item}
                key={index}
                match={this.props.match}
                history={this.props.history}
                deleteRestoreMail={this.deleteRestoreMail}
                routeChange={this.routeChange}
            />
        })
        return (
            <ListMail listMail={listMail}>
                <Search onClick={this.onClick} />
                <Divider />
                <Sort handleSort={this.handleSort} />
                <Divider />
                {showMail.length > 0 ? showMail : <Typography variant="h6" align="center" gutterBottom>
                    {formatMessage(messages.messageContent)}
                </Typography>}
            </ListMail>
        );
    }

    onClick = search => {
        this.setState({
            search: search
        })
    }

    handleSort = (sortBy, value) => {
        this.setState({
            sort: {
                by: sortBy,
                value: value
            }
        })
    }

    routeChange = id => {
        this.props.readMail(id);
        setTimeout(() => {
            const { match, history } = this.props;
            let path = (match.url === '/') ? `/inbox/${id}` : `${match.url}/${id}`;
            history.push(path);
        }, 10);
    }

    deleteRestoreMail = id => {
        this.props.deleteRestore(id)
    }

    componentDidMount() {
        this.props.getAllMailTrash()
    }
}


const mapStateToProps = (state) => ({
    mail: state.mail
})

const mapDispatchToProps = (dispatch, props) => {
    return {
        getAllMailTrash: () => {
            dispatch(getAllMailTrash())
        },
        deleteRestore: id => {
            dispatch(deleteRestore(id))
        },
        readMail: id => {
            dispatch(readMail(id))
        }
    }
}

TrashContainer = injectIntl(TrashContainer)

export default connect(mapStateToProps, mapDispatchToProps)(TrashContainer);