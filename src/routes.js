import React from 'react';
import Dashboard from './containers/dashboard/DashboardContainer';
import ComposeContainer from './containers/compose/ComposeContainer';
import InboxContainer from './containers/inbox/InboxContainer';
import DraftsContainer from './containers/drafts/DraftsContainer';
import SentContainer from './containers/sent/SentContainer';
import TrashContainer from './containers/trash/TrashContainer';
import SpamContainer from './containers/spam/SpamContainer';
import MailContentContainer from './containers/mail-content/MailContentContainer';

const routes = [
    {
        path: '/',
        exact: true,
        main: ({match, history}) => <Dashboard><InboxContainer match={match} history={history} /></Dashboard>
    }, {
        path: '/compose',
        exact: true,
        main: ({match, history}) => <Dashboard><ComposeContainer match={match} history={history} /></Dashboard>
    }, {
        path: '/drafts',
        exact: true,
        main: () => <Dashboard><DraftsContainer /></Dashboard>
    }, {
        path: '/sent',
        exact: true,
        main: ({match, history}) => <Dashboard><SentContainer match={match} history={history} /></Dashboard>
    }, {
        path: '/trash',
        exact: true,
        main: ({match, history}) => <Dashboard><TrashContainer match={match} history={history} /></Dashboard>
    }, {
        path: '/spam',
        exact: true,
        main: () => <Dashboard><SpamContainer /></Dashboard>
    }, {
        path: '/inbox/:id',
        exact: false,
        main: ({match, history}) => <Dashboard><MailContentContainer match={match} history={history} /></Dashboard>
    }, {
        path: '/sent/:id',
        exact: false,
        main: ({match, history}) => <Dashboard><MailContentContainer match={match} history={history} /></Dashboard>
    }, {
        path: '/trash/:id',
        exact: false,
        main: ({match, history}) => <Dashboard history={history}><MailContentContainer match={match} history={history} /></Dashboard>
    }
]

export default routes;