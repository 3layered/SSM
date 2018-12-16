import React, { Component } from "react";
import { Container, Table, Icon, Menu } from "semantic-ui-react";
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
class NodesList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		axios
			.get("http://localhost:8000/api/v1/cluster/nodes")
			.then(response => {
				this.setState({ nodes: response.data.nodes.node });
			})
			.catch(error => {
				alert("loading error");
			});
	}
	render() {
		return (
			<Container style={{ marginTop: "1em" }}>
				<h4>Node List</h4>
				<Table celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Node Labels</Table.HeaderCell>
							<Table.HeaderCell>Rack</Table.HeaderCell>
							<Table.HeaderCell>Node State</Table.HeaderCell>
							<Table.HeaderCell>Node Address</Table.HeaderCell>
							<Table.HeaderCell>Node HTTP Address</Table.HeaderCell>
							<Table.HeaderCell>Last health-update</Table.HeaderCell>
							<Table.HeaderCell>Health-report</Table.HeaderCell>
							<Table.HeaderCell>Containers</Table.HeaderCell>
							<Table.HeaderCell>Mem Used</Table.HeaderCell>
							<Table.HeaderCell>Mem Avail</Table.HeaderCell>
							<Table.HeaderCell>VCores Used</Table.HeaderCell>
							<Table.HeaderCell>VCores Avail</Table.HeaderCell>
							<Table.HeaderCell>Version</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{this.state.nodes
							? this.state.nodes.map((node, idx) => (
									<Table.Row key={idx}>
										<Table.Cell>{node.amNodeLabelExpression}</Table.Cell>
										<Table.Cell>{node.rack}</Table.Cell>
										<Table.Cell>{node.state}</Table.Cell>
										<Table.Cell>{node.nodeHostName}</Table.Cell>
										<Table.Cell>{node.nodeHTTPAddress}</Table.Cell>
										<Table.Cell>
											{timeConvert(node.lastHealthUpdate)}
										</Table.Cell>
										<Table.Cell>{node.healthReport}</Table.Cell>
										<Table.Cell>{node.numContainers}</Table.Cell>
										<Table.Cell>{node.usedMemoryMB}</Table.Cell>
										<Table.Cell>{node.availMemoryMB}</Table.Cell>
										<Table.Cell>{node.usedVirtualCores}</Table.Cell>
										<Table.Cell>{node.availableVirtualCores}</Table.Cell>
										<Table.Cell>{node.version}</Table.Cell>
									</Table.Row>
							  ))
							: null}
					</Table.Body>
				</Table>
			</Container>
		);
	}
}

export default NodesList;
