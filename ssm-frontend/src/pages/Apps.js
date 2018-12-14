import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { AppsList } from "../components/apps";

class Apps extends Component {
	render() {
		return (
			<Container style={{ marginTop: "3em", marginBottom: "5em" }}>
				<AppsList />
			</Container>
		);
	}
}

export default Apps;
