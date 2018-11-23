import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ssmReducer from './reducers';
import "semantic-ui-css/semantic.min.css";


const store = createStore(ssmReducer);

const Root = () => (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
