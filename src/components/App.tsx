
import React from 'react';
import styles from './App.module';

class App extends React.PureComponent {
	render() {
		return (
			<div>
				<h1 className={styles.red}>Hello World!</h1>
			</div>
		);
	}
}

export default App;