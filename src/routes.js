import React from 'react';
import DashboardContainer from './containers/dashboard/DashboardContainer';
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
        main: ({match, history}) => <DashboardContainer history={history}><InboxContainer match={match} history={history} /></DashboardContainer>
    }, {
        path: '/compose',
        exact: true,
        main: ({match, history}) => <DashboardContainer history={history}><ComposeContainer match={match} history={history} /></DashboardContainer>
    }, {
        path: '/drafts',
        exact: true,
        main: () => <DashboardContainer><DraftsContainer /></DashboardContainer>
    }, {
        path: '/sent',
        exact: true,
        main: ({match, history}) => <DashboardContainer history={history}><SentContainer match={match} history={history} /></DashboardContainer>
    }, {
        path: '/trash',
        exact: true,
        main: ({match, history}) => <DashboardContainer history={history}><TrashContainer match={match} history={history} /></DashboardContainer>
    }, {
        path: '/spam',
        exact: true,
        main: () => <DashboardContainer><SpamContainer /></DashboardContainer>
    }, {
        path: '/inbox/:id',
        exact: false,
        main: ({match, history}) => <DashboardContainer history={history}><MailContentContainer match={match} history={history} /></DashboardContainer>
    }, {
        path: '/sent/:id',
        exact: false,
        main: ({match, history}) => <DashboardContainer history={history}><MailContentContainer match={match} history={history} /></DashboardContainer>
    }, {
        path: '/trash/:id',
        exact: false,
        main: ({match, history}) => <DashboardContainer history={history}><MailContentContainer match={match} history={history} /></DashboardContainer>
    }
]

export default routes;