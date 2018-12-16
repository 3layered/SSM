import React, { Component } from "react";
import { Container, Table, Dropdown } from "semantic-ui-react";
import axios from "axios";
import { connect } from "react-redux";

class Environment extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	input = (event, data) => {
		this.setState({ appID: data.value });
		axios
			.get(
				"http://localhost:8000/api/v1/applications/" +
					data.value +
					"/environment"
			)
			.then(response => {
				this.setState(response.data);
			})
			.catch(error => {
				alert("environment error");
				this.setState({});
			});
	};
	render() {
		var content = [];
		var key = 0;
		for (var infoTitle in this.state) {
			if (infoTitle === "appID") continue;
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
			<Container style={{ marginTop: "3em", marginBottom: "5em" }}>
				<h1>Environment</h1>
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
				{content}
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
)(Environment);
// export default Environment;
