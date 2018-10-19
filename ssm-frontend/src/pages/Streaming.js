import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import {} from "../components/nodes";
import axios from "axios";

class StreamingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		axios
			.get(
				"http://localhost:8000/api/v1/applications/local-1539514587599/streaming/statistics/"
			)
			.then(response => {
				this.setState(response.data);
			})
			.catch(error => {
				alert("error");
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
			avgTotalDelay
		} = this.state;
		// } = this.props;
		return (
			<Container style={{ marginTop: "3em" }}>
				<h1> Streaming Statistics </h1>
				<h2>
					{" "}
					Running batches of <b>{batchDuration} msec</b> since{" "}
					<b>{startTime}</b> (<b>{numTotalCompletedBatches}</b> completed
					batches, <b>{numReceivedRecords}</b> records){" "}
				</h2>
			</Container>
		);
	}
}

export default StreamingPage;
