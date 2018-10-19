import React, { Component } from "react";
import { Container, Table } from "semantic-ui-react";
import { BatchTable, Chart } from "../components/streaming";
import axios from "axios";

class StreamingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startTime: "",
			batchDuration: 0,
			numReceivers: 0,
			numActiveReceivers: 0,
			numInactiveReceivers: 0,
			numTotalCompletedBatches: 0,
			numRetainedCompletedBatches: 0,
			numActiveBatches: 0,
			numProcessedRecords: 0,
			numReceivedRecords: 0,
			avgInputRate: 0,
			avgSchedulingDelay: 0,
			avgProcessingTime: 0,
			avgTotalDelay: 0,
			completedBatches: [],
			activeBatches: []
		};
		const appID = "local-1539916952874";
		axios
			.get(
				"http://localhost:8000/api/v1/applications/" +
					appID +
					"/streaming/statistics/"
			)
			.then(response => {
				this.setState(response.data);
			})
			.catch(error => {
				alert("statistics error");
			});
		axios
			.get(
				"http://localhost:8000/api/v1/applications/" +
					appID +
					"/streaming/batches/"
			)
			.then(response => {
				const completedBatches = response.data.filter(
					batch => batch.status === "COMPLETED"
				);
				const activeBatches = response.data.filter(
					batch => batch.status !== "COMPLETED"
				);
				this.setState({ completedBatches, activeBatches });
			})
			.catch(error => {
				alert("batches error");
			});
	}
	render() {
		const {
			startTime,
			batchDuration,
			numReceivers,
			numActiveReceivers,
			numInactiveReceivers,
			numTotalCompletedBatches,
			numRetainedCompletedBatches,
			numActiveBatches,
			numProcessedRecords,
			numReceivedRecords,
			avgInputRate,
			avgSchedulingDelay,
			avgProcessingTime,
			avgTotalDelay,
			completedBatches,
			activeBatches
		} = this.state;
		const data = completedBatches
			.map(batch => ({
				startTime: batch.batchTime.substring(11, 19),
				inputRate: (batch.inputSize / (batch.batchDuration / 1000)).toFixed(2),
				schedulingDelay: batch.schedulingDelay,
				processingTime: batch.processingTime,
				totalDelay: batch.totalDelay
			}))
			.reverse();
		return (
			<Container style={{ marginTop: "3em" }}>
				<h1> Streaming Statistics </h1>
				<div>
					{" "}
					Running batches of <b>{batchDuration / 1000} sec</b> since{" "}
					<b>{startTime}</b> (<b>{numTotalCompletedBatches}</b> completed
					batches, <b>{numReceivedRecords}</b> records){" "}
				</div>

				<Table celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell> </Table.HeaderCell>
							<Table.HeaderCell> Timelines </Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<Table.Row>
							<Table.Cell>
								<b>Input Rate</b> <br /> Avg : {avgInputRate.toFixed(3)}
								records/sec
							</Table.Cell>
							<Table.Cell>
								<Chart data={data} x="startTime" y="inputRate" />
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<b>Scheduling Delay</b> <br />
								Avg : {avgSchedulingDelay}
								ms
							</Table.Cell>
							<Table.Cell>
								<Chart data={data} x="startTime" y="schedulingDelay" />
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<b>Processing Time</b> <br />
								Avg : {avgProcessingTime}
								ms
							</Table.Cell>
							<Table.Cell>
								<Chart data={data} x="startTime" y="processingTime" />
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<b>Total Delay</b> <br />
								Avg : {avgTotalDelay}
								ms
							</Table.Cell>
							<Table.Cell>
								<Chart data={data} x="startTime" y="totalDelay" />
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>

				<h2>Active Batches ({activeBatches.length}) </h2>
				<BatchTable batches={activeBatches} />
				<h2>Completed Batches ({completedBatches.length})</h2>
				<BatchTable batches={completedBatches} />
			</Container>
		);
	}
}

export default StreamingPage;
