import React, { Component } from "react";
import { Container, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

class ClusterNodeMetric extends Component {
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
				<h4>Cluster Node Metric</h4>
				<Table celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Active Nodes</Table.HeaderCell>
							<Table.HeaderCell>Decommisionning Nodes</Table.HeaderCell>
							<Table.HeaderCell>Decommissioned Nodes</Table.HeaderCell>
							<Table.HeaderCell>Lost Nodes</Table.HeaderCell>
							<Table.HeaderCell>Unhealty Nodes</Table.HeaderCell>
							<Table.HeaderCell>Rebooted Nodes</Table.HeaderCell>
							<Table.HeaderCell>Shutdown Nodes</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						<Table.Row>
							<Table.Cell>
								<Link to="/nodes">{this.state.activeNodes}</Link>
							</Table.Cell>
							<Table.Cell>
								<Link to="/nodes">{this.state.decommissioningNodes}</Link>
							</Table.Cell>
							<Table.Cell>
								<Link to="/nodes">{this.state.decommissionedNodes}</Link>
							</Table.Cell>
							<Table.Cell>
								<Link to="/nodes">{this.state.lostNodes}</Link>
							</Table.Cell>
							<Table.Cell>
								<Link to="/nodes">{this.state.unhealthyNodes}</Link>
							</Table.Cell>
							<Table.Cell>
								<Link to="/nodes">{this.state.rebootedNodes}</Link>
							</Table.Cell>
							<Table.Cell>
								<Link to="/nodes">{this.state.shutdownNodes}</Link>
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</Container>
		);
	}
}

export default ClusterNodeMetric;
