import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { initStore } from './store';
import { Router } from './Router';

const { store, history } = initStore();

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<Router />
				</ConnectedRouter>
			</Provider>
		);
	}
}

export default App;