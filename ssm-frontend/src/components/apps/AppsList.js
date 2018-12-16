import React, { Component } from "react";
import { Container, Table, Progress } from "semantic-ui-react";
import axios from "axios";
const timeConvert = timestamp => {
	// var a = new Date(timestamp * 1000);
	var a = new Date(timestamp);
	var months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	var sec = a.getSeconds();
	var time =
		date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
	return time;
};
class AppsList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		axios
			.get("http://localhost:8000/api/v1/cluster/apps")
			.then(response => {
				this.setState({
					apps: response.data.apps.app.sort((a, b) => {
						return a["id"] < b["id"] ? -1 : 1;
					})
				});
				// console.log(response.data.apps.app);
			})
			.catch(error => {
				alert("loading error");
			});
	}
	render() {
		return (
			<Container style={{ marginTop: "3em", overflow: "auto" }}>
				<h4>Application List</h4>
				<Table celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>ID</Table.HeaderCell>
							<Table.HeaderCell>User</Table.HeaderCell>
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.HeaderCell>Application Type</Table.HeaderCell>
							<Table.HeaderCell>Queue</Table.HeaderCell>
							<Table.HeaderCell>Application Priority</Table.HeaderCell>
							<Table.HeaderCell>StartTime</Table.HeaderCell>
							<Table.HeaderCell>FinishTime</Table.HeaderCell>
							<Table.HeaderCell>State</Table.HeaderCell>
							<Table.HeaderCell>FinalStatus</Table.HeaderCell>
							<Table.HeaderCell>Running Contatiners</Table.HeaderCell>
							<Table.HeaderCell>Allocated CPU VCores</Table.HeaderCell>
							<Table.HeaderCell>Allocated Memory MB</Table.HeaderCell>
							<Table.HeaderCell>% of Queue</Table.HeaderCell>
							<Table.HeaderCell>% of Cluster</Table.HeaderCell>
							<Table.HeaderCell>Progress</Table.HeaderCell>
							<Table.HeaderCell>Tracking UI</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{this.state.apps
							? this.state.apps
									.map((app, idx) => (
										<Table.Row key={idx}>
											<Table.Cell>{app.id}</Table.Cell>
											<Table.Cell>{app.user}</Table.Cell>
											<Table.Cell>{app.name}</Table.Cell>
											<Table.Cell>{app.applicationType}</Table.Cell>
											<Table.Cell>{app.queue}</Table.Cell>
											<Table.Cell>{app.priority}</Table.Cell>
											<Table.Cell>{timeConvert(app.startedTime)}</Table.Cell>
											<Table.Cell>
												{app.finishedTime
													? timeConvert(app.finishedTime)
													: "N/A"}
											</Table.Cell>
											<Table.Cell>{app.state}</Table.Cell>
											<Table.Cell>{app.finalStatus}</Table.Cell>
											<Table.Cell>{app.runningContainers}</Table.Cell>
											<Table.Cell>{app.allocatedVCores}</Table.Cell>
											<Table.Cell>{app.allocatedMB}</Table.Cell>
											<Table.Cell>{app.queueUsagePercentage}</Table.Cell>
											<Table.Cell>{app.clusterUsagePercentage}</Table.Cell>
											<Table.Cell>
												<Progress percent={app.progress} indicating />
											</Table.Cell>
											<Table.Cell>
												<a href={app.trackingUrl}>{app.trackingUI}</a>
											</Table.Cell>
										</Table.Row>
									))
									.reverse()
							: null}
					</Table.Body>
				</Table>
			</Container>
		);
	}
}

export default AppsList;
