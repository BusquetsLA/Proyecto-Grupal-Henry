import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import theme from './temaConfig';
import store from './redux/store';

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</ThemeProvider>
	</Provider>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
