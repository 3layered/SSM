import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import {
	AppsList
} from "../components/apps";

class Apps extends Component {
	render() {
		return (
			<Container style={{ marginTop: "10em" }}>
				Apps Page
				<AppsList />
			</Container>
		);
	}
}

export default Apps;
