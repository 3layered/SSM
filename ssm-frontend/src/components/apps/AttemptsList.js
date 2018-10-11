import React, { Component } from "react";
import { Container, Table, Menu, Icon, Search } from "semantic-ui-react";
import { Link } from "react-router-dom";

class AttemptsList extends Component {
  render(){
    return(
      <Container style={{ marginTop: "3em", overflow: "auto" }}>
        <Search />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Attempt ID</Table.HeaderCell>
              <Table.HeaderCell>Started</Table.HeaderCell>
              <Table.HeaderCell>Node</Table.HeaderCell>
              <Table.HeaderCell>Logs</Table.HeaderCell>
              <Table.HeaderCell>Nodes Blacklisted by the app</Table.HeaderCell>
              <Table.HeaderCell>Nodes Blacklisted by the system</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Link to="/apps/detail/attempt">appattempt_1539176653200_0001_000001</Link>
              </Table.Cell>
              <Table.Cell>Wed Oct 10 22:14:16 +0900 2018</Table.Cell>
              <Table.Cell>{"http://hyeonwoo-VirtualBox:8042"}</Table.Cell>
              <Table.Cell>Logs</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>0</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Link to="/apps/detail/attempt">appattempt_1539176653200_0001_000001</Link>
              </Table.Cell>
              <Table.Cell>Wed Oct 10 22:14:16 +0900 2018</Table.Cell>
              <Table.Cell>{"http://hyeonwoo-VirtualBox:8042"}</Table.Cell>
              <Table.Cell>Logs</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>0</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Link to="/apps/detail/attempt">appattempt_1539176653200_0001_000001</Link>
              </Table.Cell>
              <Table.Cell>Wed Oct 10 22:14:16 +0900 2018</Table.Cell>
              <Table.Cell>{"http://hyeonwoo-VirtualBox:8042"}</Table.Cell>
              <Table.Cell>Logs</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>0</Table.Cell>
            </Table.Row>
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='6'>
                <Menu floated='left' pagination>
                  <Menu.Item as='a' icon>
                    <Icon name='chevron left' />
                  </Menu.Item>
                  <Menu.Item as='a'>1</Menu.Item>
                  <Menu.Item as='a'>2</Menu.Item>
                  <Menu.Item as='a'>3</Menu.Item>
                  <Menu.Item as='a'>4</Menu.Item>
                  <Menu.Item as='a' icon>
                    <Icon name='chevron right' />
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

export default AttemptsList;
