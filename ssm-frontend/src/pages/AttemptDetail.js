import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import {
	AttemptOverview,
  ContainerMetrics,
  ContainersList
} from "../components/apps";

class AttemptDetail extends Component {
	render() {
		return (
			<Container style={{ marginTop: "10em" }}>
				App Detail Page
				<AttemptOverview />
        <ContainerMetrics />
        <ContainersList />
			</Container>
		);
	}
}

export default AttemptDetail;
