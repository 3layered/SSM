import React, { Component } from "react";
import { Container, Table, Dropdown } from "semantic-ui-react";
import { BatchTable, Chart } from "../components/streaming";
import axios from "axios";
import { connect } from "react-redux";

class Stages extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	input = (event, data) => {
		this.setState({ appID: data.value });
		axios
			.get(
				"http://localhost:8000/api/v1/applications/" + data.value + "/stages"
			)
			.then(response => {
				const resdata = response.data[0];
				this.setState({ ...resdata });
				axios
					.get(
						"http://localhost:8000/api/v1/applications/" +
							data.value +
							"/stages/" +
							resdata.stageId
					)
					.then(response => {
						console.log(response.data);
					});
			})
			.catch(error => {
				alert("stage error");
			});
	};
	render() {
		const stage = this.state;
		return (
			<Container style={{ marginTop: "3em" }}>
				<h1>Stages</h1>
				<Dropdown
					placeholder="Select App ID"
					search
					selection
					options={this.props.appList
						.map(app => ({ text: app.id, value: app.id }))
						.reverse()}
					onChange={this.input}
					text={this.state.appID}
				/>
				{stage.stageId ? (
					<div>
						<h4> Most recent stage : {stage.stageId} </h4>
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
					</div>
				) : null}
			</Container>
		);
	}
}

let mapStateToProps = state => {
	return {
		appList: state.appListReducer.appList,
		dependencyList: state.appListReducer.dependencyList
	};
};
export default connect(
	mapStateToProps,
	null
)(Stages);
