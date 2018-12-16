import React, { Component } from "react";
import { Container, Table } from "semantic-ui-react";
import axios from "axios";

class ClusterMetric extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		axios
			.get("http://localhost:8000/api/v1/cluster/metrics")
			.then(response => {
				this.setState({ ...response.data.clusterMetrics });
			})
			.catch(error => {
				alert("loading error");
			});
	}

	render() {
		return (
			<Container style={{ marginTop: "1em" }}>
				<h4>Cluster Metric</h4>
				<Table celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Apps Submited</Table.HeaderCell>
							<Table.HeaderCell>Apps Pending</Table.HeaderCell>
							<Table.HeaderCell>Apps Running</Table.HeaderCell>
							<Table.HeaderCell>Apps Completed</Table.HeaderCell>
							<Table.HeaderCell>Containers Running</Table.HeaderCell>
							<Table.HeaderCell>Memory Used</Table.HeaderCell>
							<Table.HeaderCell>Memory Total</Table.HeaderCell>
							<Table.HeaderCell>Memory Reserved</Table.HeaderCell>
							<Table.HeaderCell>VCores Used</Table.HeaderCell>
							<Table.HeaderCell>VCores Total</Table.HeaderCell>
							<Table.HeaderCell>VCores Reserved</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						<Table.Row>
							<Table.Cell>{this.state.appsSubmitted}</Table.Cell>
							<Table.Cell>{this.state.appsPending}</Table.Cell>
							<Table.Cell>{this.state.appsRunning}</Table.Cell>
							<Table.Cell>
								{this.state.appsCompleted + this.state.appsFailed}
							</Table.Cell>
							<Table.Cell>{this.state.containersAllocated}</Table.Cell>
							<Table.Cell>{this.state.allocatedMB} MB</Table.Cell>
							<Table.Cell>{this.state.totalMB} GB</Table.Cell>
							<Table.Cell>{this.state.reservedMB} MB</Table.Cell>
							<Table.Cell>{this.state.allocatedVirtualCores}</Table.Cell>
							<Table.Cell>{this.state.totalVirtualCores}</Table.Cell>
							<Table.Cell>{this.state.reservedVirtualCores}</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</Container>
		);
	}
}

export default ClusterMetric;
