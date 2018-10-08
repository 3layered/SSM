import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import {
	ClusterMetric,
	ClusterNodeMetric,
	SchedulerMetric,
	ClusterOverview
} from "../components/nodes";

class Home extends Component {
	render() {
		return (
			<Container style={{ marginTop: "3em" }}>
				SSM HOME
				<ClusterMetric />
				<ClusterNodeMetric />
				<SchedulerMetric />
				<ClusterOverview />
			</Container>
		);
	}
}

export default Home;
