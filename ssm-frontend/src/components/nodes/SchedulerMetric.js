import React, { Component } from "react";
import { Container, Table } from "semantic-ui-react";
import axios from "axios";

/// NOT WORKING WELL
/// No API??
class SchedulerMetric extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		axios
			.get("http://localhost:8000/api/v1/cluster/scheduler")
			.then(response => {
				// console.log(response.data.scheduler.schedulerInfo);
				this.setState({ ...response.data.scheduler.schedulerInfo });
				// this.setState({ ...response.data.clusterMetrics });
			})
			.catch(error => {
				alert("loading error");
			});
	}
	render() {
		// console.log(this.state);
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
							<Table.Cell>{this.state.type}</Table.Cell>
							<Table.Cell>[MEMORY]</Table.Cell>
							<Table.Cell>{"<memory:128, vCores:1>"}</Table.Cell>
							<Table.Cell>{"<memory:2048, vCores:2>"}</Table.Cell>
							<Table.Cell>0</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</Container>
		);
	}
}

export default SchedulerMetric;
