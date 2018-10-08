import React, { Component } from "react";
import { Container, Table } from "semantic-ui-react";

class ClusterMetric extends Component {
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
							<Table.Cell>0</Table.Cell>
							<Table.Cell>0</Table.Cell>
							<Table.Cell>0</Table.Cell>
							<Table.Cell>0</Table.Cell>
							<Table.Cell>0</Table.Cell>
							<Table.Cell>0 B</Table.Cell>
							<Table.Cell>3.50 GB</Table.Cell>
							<Table.Cell>0 B</Table.Cell>
							<Table.Cell>0</Table.Cell>
							<Table.Cell>4</Table.Cell>
							<Table.Cell>0</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</Container>
		);
	}
}

export default ClusterMetric;
