import React, { Component } from "react";
import { Container, Table } from "semantic-ui-react";
import { BatchTable, Chart } from "../components/streaming";
import axios from "axios";
import { appID } from "./config";

class Stages extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		axios
			.get("http://localhost:8000/api/v1/applications/" + appID + "/stages")
			.then(response => {
				const data = response.data[0];
				this.setState({ ...data });
				axios
					.get(
						"http://localhost:8000/api/v1/applications/" +
							appID +
							"/stages/" +
							data.stageId
					)
					.then(response => {
						console.log(response.data);
					});
			})
			.catch(error => {
				alert("statistics error");
			});
	}
	render() {
		const stage = this.state;
		return stage.stageId ? (
			<Container style={{ marginTop: "3em" }}>
				<h1> Most recent stage : {stage.stageId} </h1>
				<Table celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell> Duration</Table.HeaderCell>
							<Table.HeaderCell> Tasks: Succeeded/Total </Table.HeaderCell>
							<Table.HeaderCell> Shuffle Read</Table.HeaderCell>
							<Table.HeaderCell> Shuffle Write </Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<Table.Row>
							<Table.Cell>
								{stage.executorSummary["3"]
									? stage.executorSummary["3"].taskTime
									: "N/A"}{" "}
								ms
							</Table.Cell>
							<Table.Cell>
								{stage.numCompleteTasks + "/" + stage.numTasks}
							</Table.Cell>
							<Table.Cell>{stage.shuffleReadBytes / 1024} KB</Table.Cell>
							<Table.Cell>{stage.shuffleWriteBytes / 1024} KB</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</Container>
		) : null;
	}
}

export default Stages;
