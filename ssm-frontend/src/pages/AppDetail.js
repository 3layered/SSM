import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import {
	AppOverview,
  AppMetrics,
  AttemptsList
} from "../components/apps";

class AppDetail extends Component {
	render() {
		return (
			<Container style={{ marginTop: "10em" }}>
				App Detail Page
				<AppOverview />
        <AppMetrics />
        <AttemptsList />
			</Container>
		);
	}
}

export default AppDetail;
