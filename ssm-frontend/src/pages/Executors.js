import React, { Component } from "react";
import { Container, Table } from "semantic-ui-react";
import { BatchTable, Chart } from "../components/streaming";
import axios from "axios";
import { appID } from "./config";

class Executors extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		axios
			.get(
				"http://localhost:8000/api/v1/applications/" + appID + "/allexecutors"
			)
			.then(response => {
				this.setState({ executors: response.data });
			})
			.catch(error => {
				alert("statistics error");
			});
	}
	render() {
		return (
			<Container style={{ marginTop: "3em" }}>
				<h1> Executors </h1>

				{this.state.executors ? (
					<Table celled>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell> Executor ID</Table.HeaderCell>
								<Table.HeaderCell> Status </Table.HeaderCell>
								<Table.HeaderCell> Active Tasks </Table.HeaderCell>
								<Table.HeaderCell> Failed Tasks </Table.HeaderCell>
								<Table.HeaderCell> Complete Tasks </Table.HeaderCell>
								<Table.HeaderCell> Total Tasks </Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{this.state.executors.map((exec, i) => (
								<Table.Row key={i}>
									<Table.Cell>{exec.id}</Table.Cell>
									<Table.Cell>
										{exec.isActive ? "Active" : "Inactive"}
									</Table.Cell>
									<Table.Cell>{exec.activeTasks}</Table.Cell>
									<Table.Cell>{exec.failedTasks}</Table.Cell>
									<Table.Cell>{exec.completedTasks}</Table.Cell>
									<Table.Cell>{exec.totalTasks}</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table>
				) : null}
			</Container>
		);
	}
}

export default Executors;
