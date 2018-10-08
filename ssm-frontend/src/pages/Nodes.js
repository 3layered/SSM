import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import {
	ClusterMetric,
	ClusterNodeMetric,
	SchedulerMetric,
	NodesList
} from "../components/nodes";

class Nodes extends Component {
	render() {
		return (
			<Container style={{ marginTop: "3em" }}>
				Nodes page
				<ClusterMetric />
				<ClusterNodeMetric />
				<SchedulerMetric />
				<NodesList />
			</Container>
		);
	}
}

export default Nodes;
