import React, { Component } from 'react';
import routes from './routes';
import { Route, Switch } from 'react-router-dom';
import { HashRouter } from 'react-router-dom'
// theme
import 'typeface-roboto';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import { Provider } from 'react-redux';
// i18n
import { IntlProvider, addLocaleData } from 'react-intl';
import viLocaleData from 'react-intl/locale-data/vi';
import translations from './i18n/locales/translations';
// store & auth
import history from './history';
import store from './store';
import jwt_decode from 'jwt-decode';
import LoginContainer from './containers/login/LoginContainer';
import NotFound from './components/not-found/NotFound';
import SignupContainer from './containers/sign-up/SignupContainer';
import { setCurrentUser, logoutUser } from './actions';

addLocaleData(viLocaleData);

const locale = window.location.search.replace('?locale=', '') || 'en'

const messages = translations[locale];

const theme = createMuiTheme({
	typography: {
		useNextVariants: true,
	},
	palette: {
		primary: teal,
		secondary: {
			main: '#ff5722',
		},
	},
});

if (localStorage.jwtToken) {
	const auth = localStorage.jwtToken;
	const token = auth.split(' ')[1];
	const decoded = jwt_decode(token);
	store.dispatch(setCurrentUser(decoded))

	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		window.location.href = '/login'
	}
}

class App extends Component {

	renderContent = (routes) => {
		let result = null;
		if (routes.length > 0) {
			result = routes.map((route, index) => {
				return <Route
					key={index}
					path={route.path}
					exact={route.exact}
					render={route.main}
				/>
			});
		}
		return result;
	}

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<IntlProvider locale={locale} key={locale} messages={messages}>
					<Provider store={store}>
						<HashRouter history={history}>
							<Switch>
								{this.renderContent(routes)}
								<Route path='/login' render={({history}) => <LoginContainer history={history} />} />
								<Route path='/signup' render={({history}) => <SignupContainer history={history} />} />
								<Route path='' render={() => <NotFound />} />
							</Switch>
						</HashRouter >
					</Provider>
				</IntlProvider>
			</MuiThemeProvider>
		);
	}
}

export default App;
