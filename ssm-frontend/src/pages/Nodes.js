import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import {
	ClusterMetric,
	ClusterNodeMetric,
	SchedulerMetric,
	NodesList,
	NodeLabels
} from "../components/nodes";

class Nodes extends Component {
	render() {
		return (
			<Container style={{ marginTop: "3em", marginBottom: "5em" }}>
				<ClusterMetric />
				<ClusterNodeMetric />
				<SchedulerMetric />
				<NodesList />
				<NodeLabels />
			</Container>
		);
	}
}

export default Nodes;
