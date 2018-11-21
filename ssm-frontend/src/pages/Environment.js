import React, { Component } from "react";
import { Container, Table } from "semantic-ui-react";
import axios from "axios";
import { appID } from "./config";

class Environment extends Component {
	constructor(props) {
		super(props);
		axios
			.get(
				"http://localhost:8000/api/v1/applications/" + appID + "/environment"
			)
			.then(response => {
				this.setState(response.data);
			})
			.catch(error => {
				alert("environment error");
			});
	}
	render() {
		var content = [];
		var key = 0;
		for (var infoTitle in this.state) {
			var info = this.state[infoTitle];
			if (Array.isArray(info)) {
				content.push(
					<div key={key}>
						<h2>{infoTitle}</h2>
						<Table celled>
							<Table.Body>
								{info.map((row, i) => {
									return (
										<Table.Row key={i}>
											<Table.Cell>{row[0]}</Table.Cell>
											<Table.Cell>{row[1]}</Table.Cell>
										</Table.Row>
									);
								})}
							</Table.Body>
						</Table>
					</div>
				);
			} else {
				var rows = [];
				var i = 0;
				for (var rowTitle in info) {
					rows.push(
						<Table.Row key={i}>
							<Table.Cell>{rowTitle}</Table.Cell>
							<Table.Cell>{info[rowTitle]}</Table.Cell>
						</Table.Row>
					);
				}
				content.push(
					<div key={key}>
						<h2>{infoTitle}</h2>
						<Table celled>
							<Table.Body>{rows}</Table.Body>
						</Table>
					</div>
				);
			}
			key += 1;
		}
		return (
			<Container style={{ marginTop: "3em" }}>
				<h1>Environment</h1>
				{content}
			</Container>
		);
	}
}

export default Environment;
