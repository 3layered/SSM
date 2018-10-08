import React, { Component } from "react";
import { Container, Table, Icon } from "semantic-ui-react";

class ClusterOverview extends Component {
	render() {
		return (
			<Container style={{ marginTop: "1em", marginBottom: "4em" }}>
				<Table celled striped>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell colSpan="3">Cluster Overview</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						<Table.Row>
							<Table.Cell collapsing>
								<b>Cluster ID</b>
							</Table.Cell>
							<Table.Cell>1539000686631</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell collapsing>
								<b>ResourceManager State</b>
							</Table.Cell>
							<Table.Cell>STARTED</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell collapsing>
								<b>dummy</b>
							</Table.Cell>
							<Table.Cell>dummy</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell collapsing>
								<b>dummy</b>
							</Table.Cell>
							<Table.Cell>dummy</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell collapsing>
								<b>dummy</b>
							</Table.Cell>
							<Table.Cell>dummy</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell collapsing>
								<b>dummy</b>
							</Table.Cell>
							<Table.Cell>dummy</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</Container>
		);
	}
}

export default ClusterOverview;
