import React, { Component } from "react";
import { Container, Table, Menu, Icon, Search } from "semantic-ui-react";
import { Link } from "react-router-dom";

class ContinaersList extends Component {
  render(){
    return(
      <Container style={{ marginTop: "3em", overflow: "auto" }}>
        <Search />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Container ID</Table.HeaderCell>
              <Table.HeaderCell>Node</Table.HeaderCell>
              <Table.HeaderCell>Container Exit Status</Table.HeaderCell>
              <Table.HeaderCell>Logs</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                container_1539176653200_0001_000001
              </Table.Cell>
              <Table.Cell>{"http://hyeonwoo-VirtualBox:8042"}</Table.Cell>
              <Table.Cell>FINISHED</Table.Cell>
              <Table.Cell>Logs</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                container_1539176653200_0001_000001
              </Table.Cell>
              <Table.Cell>{"http://hyeonwoo-VirtualBox:8042"}</Table.Cell>
              <Table.Cell>FINISHED</Table.Cell>
              <Table.Cell>Logs</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                container_1539176653200_0001_000001
              </Table.Cell>
              <Table.Cell>{"http://hyeonwoo-VirtualBox:8042"}</Table.Cell>
              <Table.Cell>FINISHED</Table.Cell>
              <Table.Cell>Logs</Table.Cell>
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

export default ContinaersList;
