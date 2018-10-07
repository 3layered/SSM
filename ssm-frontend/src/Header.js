import React, { Component } from "react";
import { Menu, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Header extends Component {
	render() {
		return (
			<Menu inverted>
				<Container>
					<Menu.Item as={Link} to="/" header>
						SSM
					</Menu.Item>
					<Menu.Item as={Link} to="/apps">
						Apps
					</Menu.Item>
					<Menu.Item as={Link} to="/fop">
						FoP
					</Menu.Item>
					<Menu.Item as={Link} to="/metric">
						Metric
					</Menu.Item>
					<Menu.Item as={Link} to="/nodes">
						Nodes
					</Menu.Item>
					<Menu.Item as={Link} to="/login">
						Login
					</Menu.Item>
				</Container>
			</Menu>
		);
	}
}

export default Header;
