import React, { Component } from "react";
import { Container, Table, Menu, Icon, Progress, Search } from "semantic-ui-react";
import { Link } from "react-router-dom";

class AppsList extends Component {
  render(){
    return(
      <Container style={{ marginTop: "3em", overflow: "auto" }}>
        <Search />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>User</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Application Type</Table.HeaderCell>
              <Table.HeaderCell>Queue</Table.HeaderCell>
              <Table.HeaderCell>Application Priority</Table.HeaderCell>
              <Table.HeaderCell>StartTime</Table.HeaderCell>
              <Table.HeaderCell>FinishTime</Table.HeaderCell>
              <Table.HeaderCell>State</Table.HeaderCell>
              <Table.HeaderCell>FinalStatus</Table.HeaderCell>
              <Table.HeaderCell>Running Contatiners</Table.HeaderCell>
              <Table.HeaderCell>Allocated CPU VCores</Table.HeaderCell>
              <Table.HeaderCell>Allocated Memory MB</Table.HeaderCell>
              <Table.HeaderCell>% of Queue</Table.HeaderCell>
              <Table.HeaderCell>% of Cluster</Table.HeaderCell>
              <Table.HeaderCell>Progress</Table.HeaderCell>
              <Table.HeaderCell>Tracking UI</Table.HeaderCell>
              <Table.HeaderCell>Blacklisted Nodes</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Link to="/apps/detail">application_1539176653200_0001</Link>
              </Table.Cell>
              <Table.Cell>hyeonwoo</Table.Cell>
              <Table.Cell>grep-search</Table.Cell>
              <Table.Cell>MAPREDUCE</Table.Cell>
              <Table.Cell>default</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>Wed Oct 10 22:14:15 +0900 2018</Table.Cell>
              <Table.Cell>Wed Oct 10 22:18:48 +0900 2018</Table.Cell>
              <Table.Cell>FINISHED</Table.Cell>
              <Table.Cell>FAILED</Table.Cell>
              <Table.Cell>N/A</Table.Cell>
              <Table.Cell>N/A</Table.Cell>
              <Table.Cell>N/A</Table.Cell>
              <Table.Cell>0.0</Table.Cell>
              <Table.Cell>0.0</Table.Cell>
              <Table.Cell>
                <Progress percent={35} indicating />
              </Table.Cell>
              <Table.Cell>History</Table.Cell>
              <Table.Cell>0</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Link to="/apps/detail">application_1539176653200_0001</Link>
              </Table.Cell>
              <Table.Cell>hyeonwoo</Table.Cell>
              <Table.Cell>grep-search</Table.Cell>
              <Table.Cell>MAPREDUCE</Table.Cell>
              <Table.Cell>default</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>Wed Oct 10 22:14:15 +0900 2018</Table.Cell>
              <Table.Cell>Wed Oct 10 22:18:48 +0900 2018</Table.Cell>
              <Table.Cell>FINISHED</Table.Cell>
              <Table.Cell>FAILED</Table.Cell>
              <Table.Cell>N/A</Table.Cell>
              <Table.Cell>N/A</Table.Cell>
              <Table.Cell>N/A</Table.Cell>
              <Table.Cell>0.0</Table.Cell>
              <Table.Cell>0.0</Table.Cell>
              <Table.Cell>
                <Progress percent={65} indicating />
              </Table.Cell>
              <Table.Cell>History</Table.Cell>
              <Table.Cell>0</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Link to="/apps/detail">application_1539176653200_0001</Link>
              </Table.Cell>
              <Table.Cell>hyeonwoo</Table.Cell>
              <Table.Cell>grep-search</Table.Cell>
              <Table.Cell>MAPREDUCE</Table.Cell>
              <Table.Cell>default</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>Wed Oct 10 22:14:15 +0900 2018</Table.Cell>
              <Table.Cell>Wed Oct 10 22:18:48 +0900 2018</Table.Cell>
              <Table.Cell>FINISHED</Table.Cell>
              <Table.Cell>FAILED</Table.Cell>
              <Table.Cell>N/A</Table.Cell>
              <Table.Cell>N/A</Table.Cell>
              <Table.Cell>N/A</Table.Cell>
              <Table.Cell>0.0</Table.Cell>
              <Table.Cell>0.0</Table.Cell>
              <Table.Cell>
                <Progress percent={100} indicating />
              </Table.Cell>
              <Table.Cell>History</Table.Cell>
              <Table.Cell>0</Table.Cell>
            </Table.Row>
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='18'>
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

export default AppsList;
