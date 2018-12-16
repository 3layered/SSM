import React, { Component } from "react";
import { Menu, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { doUpdateAppList, doUpdateDependencyList } from "./actions";
import axios from "axios";

class Header extends Component {
	constructor(props) {
		super(props);
		this.pollAppList();
	}
	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	async pollAppList() {
		const server_url = "http://localhost:8088";
		const backend_app_url = "http://localhost:8000/api/v1/applications/";
		const backend_dependency_url =
			"http://localhost:8000/api/v1/applications/dependency/";
		const header = { "Content-Type": "application/json" };
		while (true) {
			axios
				.post(backend_app_url, { url: server_url }, header)
				.then(response => {
					if (response.data["apps"]) {
						const appList = response.data["apps"]["app"];
						this.props.updateAppList(appList);
					}
				})
				.catch(error => {
					if (!error.response) {
					} else if (error.response.status === 404) {
					}
				});
			axios
				.get(backend_dependency_url)
				.then(response => {
					if (response.data["dependencies"]) {
						const dependencyList = response.data["dependencies"];
						this.props.updateDependencyList(dependencyList);
						// console.log(JSON.stringify(dependencyList))
					}
				})
				.catch(error => {
					if (!error.response) {
					} else if (error.response.status === 404) {
					}
				});
			await this.sleep(3000);
		}
	}
	render() {
		return (
			<Menu inverted>
				<Container>
					<Menu.Item as={Link} to="/" header>
						SSM
					</Menu.Item>

					<Menu.Item as={Link} to="/apps">
						Applications
					</Menu.Item>
					{/* <Menu.Item as={Link} to="/fop">
						FoP
					</Menu.Item>

					<Menu.Item as={Link} to="/register">
						Register
					</Menu.Item> */}
					{/* <Menu.Item as={Link} to="/environment">
						Environment
					</Menu.Item>
					<Menu.Item as={Link} to="/executors">
						Executors
					</Menu.Item>
					<Menu.Item as={Link} to="/stages">
						Stages
					</Menu.Item> */}
					<Menu.Item as={Link} to="/streaming">
						Streaming
					</Menu.Item>
					<Menu.Item as={Link} to="/detail">
						Detail
					</Menu.Item>
				</Container>
			</Menu>
		);
	}
}

let mapStateToProps = state => {
	return {
		appList: state.appListReducer.appList,
		dependencyList: state.appListReducer.dependencyList
	};
};

let mapDispatchToProps = dispatch => {
	return {
		updateAppList: appList => dispatch(doUpdateAppList(appList)),
		updateDependencyList: dependencyList =>
			dispatch(doUpdateDependencyList(dependencyList))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);

// export default Header;
