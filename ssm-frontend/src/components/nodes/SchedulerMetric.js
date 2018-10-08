import React, { Component } from "react";
import { Container, Table } from "semantic-ui-react";

class SchedulerMetric extends Component {
	render() {
		return (
			<Container style={{ marginTop: "1em" }}>
				<h4>Scheduler Metric</h4>
				<Table celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Scheduler Type</Table.HeaderCell>
							<Table.HeaderCell>Scheduling Resource Type</Table.HeaderCell>
							<Table.HeaderCell>Minimum Allocation</Table.HeaderCell>
							<Table.HeaderCell>Maximum Allocation</Table.HeaderCell>
							<Table.HeaderCell>
								Maximum Cluster Application Priority
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						<Table.Row>
							<Table.Cell>Capacity Scheduler</Table.Cell>
							<Table.Cell>[MEMORY]</Table.Cell>
							<Table.Cell>{"<memory:32, vCores:1>"}</Table.Cell>
							<Table.Cell>{"<memory:1792, vCores:2>"}</Table.Cell>
							<Table.Cell>0</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</Container>
		);
	}
}

export default SchedulerMetric;
