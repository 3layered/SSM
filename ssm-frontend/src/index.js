import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";

const Root = () => (
	// <Provider store={store}>
	<BrowserRouter>
		<App />
	</BrowserRouter>
	// </Provider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
