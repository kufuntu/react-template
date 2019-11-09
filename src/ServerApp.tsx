import React from 'react';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import { Router } from './Router';
import { Request } from 'express';

interface AppProps {
	req: Request;
	store: any;
}

class App extends React.Component<AppProps> {
	render() {
		return (
			<Provider store={this.props.store}>
				<StaticRouter location={this.props.req.url} context={{}}>
					<Router />
				</StaticRouter>
			</Provider>
		);
	}
}

export default App;