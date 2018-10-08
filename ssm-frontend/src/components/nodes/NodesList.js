import React, { Component } from "react";
import { Container, Table, Icon, Menu } from "semantic-ui-react";

class NodesList extends Component {
	render() {
		return (
			<Container style={{ marginTop: "1em" }}>
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
						<Table.Row>
							<Table.Cell> </Table.Cell>
							<Table.Cell>/default-rack</Table.Cell>
							<Table.Cell>RUNNING</Table.Cell>
							<Table.Cell>
								ip-172-31-29-100.ap-northeast-2.compute.internal:8041
							</Table.Cell>
							<Table.Cell>
								ip-172-31-29-100.ap-northeast-2.compute.internal:8042
							</Table.Cell>
							<Table.Cell>Mon Oct 08 12:14:31 +0000 2018</Table.Cell>
							<Table.Cell> </Table.Cell>
							<Table.Cell>0</Table.Cell>
							<Table.Cell>0 B</Table.Cell>
							<Table.Cell>1.75 GB</Table.Cell>
							<Table.Cell>0</Table.Cell>
							<Table.Cell>2</Table.Cell>
							<Table.Cell>2.8.4-amzn-1</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell> </Table.Cell>
							<Table.Cell>/default-rack</Table.Cell>
							<Table.Cell>RUNNING</Table.Cell>
							<Table.Cell>
								ip-172-31-24-31.ap-northeast-2.compute.internal:8041
							</Table.Cell>
							<Table.Cell>
								ip-172-31-24-31.ap-northeast-2.compute.internal:8042
							</Table.Cell>
							<Table.Cell>Mon Oct 08 12:14:33 +0000 2018</Table.Cell>
							<Table.Cell> </Table.Cell>
							<Table.Cell>0</Table.Cell>
							<Table.Cell>0 B</Table.Cell>
							<Table.Cell>1.75 GB</Table.Cell>
							<Table.Cell>0</Table.Cell>
							<Table.Cell>2</Table.Cell>
							<Table.Cell>2.8.4-amzn-1</Table.Cell>
						</Table.Row>
					</Table.Body>

					<Table.Footer>
						<Table.Row>
							<Table.HeaderCell colSpan="3">
								<Menu floated="right" pagination>
									<Menu.Item as="a" icon>
										<Icon name="chevron left" />
									</Menu.Item>
									<Menu.Item as="a">1</Menu.Item>
									<Menu.Item as="a">2</Menu.Item>
									<Menu.Item as="a">3</Menu.Item>
									<Menu.Item as="a">4</Menu.Item>
									<Menu.Item as="a" icon>
										<Icon name="chevron right" />
									</Menu.Item>
								</Menu>
							</Table.HeaderCell>
						</Table.Row>
					</Table.Footer>
				</Table>
			</Container>
		);
	}
}

export default NodesList;
