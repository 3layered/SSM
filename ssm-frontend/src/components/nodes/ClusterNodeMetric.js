import React, { Component } from "react";
import { Container, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";

class ClusterNodeMetric extends Component {
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
								<Link to="/nodes">2</Link>
							</Table.Cell>
							<Table.Cell>
								<Link to="/nodes">0</Link>
							</Table.Cell>
							<Table.Cell>
								<Link to="/nodes">0</Link>
							</Table.Cell>
							<Table.Cell>
								<Link to="/nodes">0</Link>
							</Table.Cell>
							<Table.Cell>
								<Link to="/nodes">0</Link>
							</Table.Cell>
							<Table.Cell>
								<Link to="/nodes">0</Link>
							</Table.Cell>
							<Table.Cell>
								<Link to="/nodes">0</Link>
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</Container>
		);
	}
}

export default ClusterNodeMetric;
