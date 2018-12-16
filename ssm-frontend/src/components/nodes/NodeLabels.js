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
class NodeLabels extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		axios
			.get("http://localhost:8000/api/v1/cluster/apps")
			.then(response => {
				let labels = [];
				response.data.apps.app.map(app => {
					if (app.state !== "RUNNING") return;
					let resourceInfo = app.resourceInfo.resourceUsagesByPartition[0];
					let name = resourceInfo.partitionName;
					name = name ? name : "DEFAULT_PARTITION";
					let exist = false,
						idx;
					labels.map((label, i) => {
						if (label.name === name) {
							exist = true;
							idx = i;
						}
					});

					if (exist) {
						let l = labels[idx];
						labels[idx] = {
							numActive: l.numActive + 1
						};
						return;
					}

					let memory = 0,
						vcores = 0,
						numActive = 1,
						type = "Exclusive Partition";
					if (name === "DEFAULT_PARTITION") type = "Exclusive Partition";

					let r = resourceInfo;
					memory =
						r.used.memory +
						r.reserved.memory +
						r.pending.memory +
						r.amUsed.memory +
						r.amLimit.memory +
						r.userAmLimit.memory;
					vcores =
						r.used.vCores +
						r.reserved.vCores +
						r.pending.vCores +
						r.amUsed.vCores +
						r.amLimit.vCores +
						r.userAmLimit.vCores;

					let label = { name, type, numActive, memory, vcores };
					labels.push(label);
				});
				this.setState({ labels });
			})
			.catch(error => {
				alert("loading error");
			});
	}
	render() {
		return (
			<Container style={{ marginTop: "1em" }}>
				<h4>Node Labels</h4>
				<Table celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Label Name</Table.HeaderCell>
							<Table.HeaderCell>Label Type</Table.HeaderCell>
							<Table.HeaderCell>Num Of Active NMs</Table.HeaderCell>
							<Table.HeaderCell>Total Resource</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{this.state.labels
							? this.state.labels.map((label, idx) => (
									<Table.Row key={idx}>
										<Table.Cell>{label.name}</Table.Cell>
										<Table.Cell>{label.type}</Table.Cell>
										<Table.Cell>{label.numActive}</Table.Cell>
										<Table.Cell>
											{"Memory :" + label.memory + " vCores : " + label.vcores}
										</Table.Cell>
									</Table.Row>
							  ))
							: null}
					</Table.Body>
				</Table>
			</Container>
		);
	}
}

export default NodeLabels;
