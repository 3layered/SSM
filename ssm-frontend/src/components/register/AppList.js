import React, { Component } from "react";
import { Table, Button, Container, Progress } from "semantic-ui-react";
import axios from "axios";
import { doUpdateAppList } from "../../actions";
import connect from "react-redux/es/connect/connect";

class AppList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			appList: [],
			yarnServerRunning: true
		};

		this.onRefreshAppList = this.onRefreshAppList.bind(this);
		this.kill = this.kill.bind(this);
		this.renderTable = this.renderTable.bind(this);
		this.renderTableHeader = this.renderTableHeader.bind(this);
		this.renderHeaderRow = this.renderHeaderRow.bind(this);
		this.renderTableBody = this.renderTableBody.bind(this);
		this.renderBodyRow = this.renderBodyRow.bind(this);
	}
	onRefreshAppList() {
		const server_url = "http://localhost:8088";
		const backend_url = "http://localhost:8000/api/v1/applications/";
		const header = { "Content-Type": "application/json" };
		axios
			.post(backend_url, { url: server_url }, header)
			.then(response => {
				if (response.data["apps"]) {
					const appList = response.data["apps"]["app"];
					this.props.updateAppList(appList);
				}
			})
			.catch(error => {
				if (!error.response) {
				} else if (error.response.status === 404) {
					this.setState({ yarnServerRunning: false });
				}
			});
	}
	kill(appID) {
		const backend_url =
			"http://localhost:8000/api/v1/applications/kill/" + appID + "/";

		axios
			.post(backend_url)
			.then(response => {
				if (response.data["state"]) this.onRefreshAppList();
			})
			.catch(error => console.log(error));
	}
	resubmit(appID) {
		const backend_url =
			"http://localhost:8000/api/v1/applications/submit/" + appID + "/";

		axios
			.post(backend_url)
			.then(response => {
				// if (response.data['state']) this.onRefreshAppList();
			})
			.catch(error => console.log(error));
	}
	renderTable() {
		let appListCopy = this.props.appList;

		appListCopy.sort((a, b) => {
			return a["id"] > b["id"] ? -1 : 1;
		});
		return (
			<Table celled style={{ textAlign: "center" }}>
				{this.renderTableHeader()}
				{this.renderTableBody(appListCopy)}
			</Table>
		);
	}
	renderTableHeader() {
		return <Table.Header>{this.renderHeaderRow()}</Table.Header>;
	}
	renderHeaderRow() {
		return (
			<Table.Row>
				<Table.HeaderCell>ID</Table.HeaderCell>
				<Table.HeaderCell>User</Table.HeaderCell>
				<Table.HeaderCell>App Name</Table.HeaderCell>
				<Table.HeaderCell>State</Table.HeaderCell>
				<Table.HeaderCell>Progress</Table.HeaderCell>
				<Table.HeaderCell>Action</Table.HeaderCell>
			</Table.Row>
		);
	}
	renderTableBody(appList) {
		return (
			<Table.Body>
				{appList.map((appInfo, i) => {
					// if (appInfo['name'] != 'SUBMIT') {
					return this.renderBodyRow(appInfo);
					// }
				})}
			</Table.Body>
		);
	}
	renderBodyRow(appInfo) {
		return (
			<Table.Row key={appInfo["id"]}>
				<Table.Cell>{appInfo["id"]}</Table.Cell>
				<Table.Cell>{appInfo["user"]}</Table.Cell>
				<Table.Cell>{appInfo["name"]}</Table.Cell>
				<Table.Cell>{appInfo["state"]}</Table.Cell>
				<Table.Cell>
					<Progress percent={appInfo["progress"]} indicating />
				</Table.Cell>
				{appInfo["state"] !== "KILLED" &&
				appInfo["state"] !== "FINISHED" &&
				appInfo["state"] !== "FAILED" ? (
					<Button onClick={() => this.kill(appInfo["id"])}>Kill</Button>
				) : appInfo["state"] !== "FAILED" ? (
					<Button onClick={() => this.resubmit(appInfo["id"])}>Resubmit</Button>
				) : (
					<Table.Cell> </Table.Cell>
				)}
			</Table.Row>
		);
	}

	render() {
		return (
			<Container style={{ marginTop: "3em", marginBottom: "3em" }}>
				<div>
					<h3 align="center">Application list</h3>
					<Container textAlign="right">
						<Button onClick={this.onRefreshAppList}> Refresh </Button>
					</Container>
					{this.state.yarnServerRunning ? (
						<div> {this.renderTable()} </div>
					) : (
						<h4 align="center">Yarn Resource Manager is not responding!</h4>
					)}
				</div>
			</Container>
		);
	}
}

let mapStateToProps = state => {
	return {
		appList: state.appListReducer.appList
	};
};

let mapDispatchToProps = dispatch => {
	return {
		updateAppList: appList => dispatch(doUpdateAppList(appList))
	};
};

AppList = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppList);

export default AppList;
