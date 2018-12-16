import React, { Component } from "react";
import { Container, Table } from "semantic-ui-react";
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
class ClusterOverview extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		axios
			.get("http://localhost:8000/api/v1/cluster/info")
			.then(response => {
				// console.log(response.data);
				this.setState({ ...response.data.clusterInfo });
				const startedOn = response.data.clusterInfo.startedOn;
				this.setState({ startedOn: timeConvert(startedOn) });
				// this.setState({ ...response.data.clusterMetrics });
			})
			.catch(error => {
				alert("loading error");
			});
	}
	render() {
		return (
			<Container style={{ marginTop: "1em", marginBottom: "4em" }}>
				<h4>Cluster Overview</h4>
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
							<Table.Cell>{this.state.id}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell collapsing>
								<b>ResourceManager State</b>
							</Table.Cell>
							<Table.Cell>{this.state.state}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell collapsing>
								<b>ResourceManager HA state</b>
							</Table.Cell>
							<Table.Cell>{this.state.haState}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell collapsing>
								<b>ResourceManager HA zookeeper connection state</b>
							</Table.Cell>
							<Table.Cell>{this.state.haZooKeeperConnectionState}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell collapsing>
								<b>ResourceManager RMStateStore</b>
							</Table.Cell>
							<Table.Cell>{this.state.rmStateStoreName}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell collapsing>
								<b>ResourceManager started on</b>
							</Table.Cell>
							<Table.Cell>{this.state.startedOn}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell collapsing>
								<b>ResourceManager version</b>
							</Table.Cell>
							<Table.Cell>
								{this.state.resourceManagerBuildVersion +
									" on " +
									this.state.resourceManagerVersionBuiltOn}
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell collapsing>
								<b>Hadoop version</b>
							</Table.Cell>
							<Table.Cell>
								{this.state.hadoopBuildVersion +
									" on " +
									this.state.hadoopVersionBuiltOn}
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</Container>
		);
	}
}

export default ClusterOverview;
