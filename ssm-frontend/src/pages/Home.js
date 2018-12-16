import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import {
	ClusterMetric,
	ClusterNodeMetric,
	SchedulerMetric,
	ClusterOverview,
	NodesList,
	NodeLabels
} from "../components/nodes";

class Home extends Component {
	render() {
		return (
			<Container style={{ marginTop: "3em", marginBottom: "3em" }}>
				<ClusterMetric />
				<ClusterNodeMetric />
				<SchedulerMetric />
				<ClusterOverview />
				<NodesList />
				<NodeLabels />
			</Container>
		);
	}
}

export default Home;
