import React, { Component } from "react";
import { Container, Divider } from "semantic-ui-react";
import { RegisterApp, AppList } from "../components/register";
import { RegisterFailoverPlan, DependencyList } from "../components/failover";

class Apps extends Component {
	render() {
		return (
			<Container style={{ marginTop: "3em", marginBottom: "5em" }}>
				<Divider />
				<RegisterApp />
				<Divider />
				<AppList />
				<Divider />
				<DependencyList />
			</Container>
		);
	}
}

export default Apps;
