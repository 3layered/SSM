import React, { Component } from "react";
import { Container, Table, Header } from "semantic-ui-react";

class AttemptOverview extends Component {
  render(){
    return(
      <Container style={{ marginTop: "3em", marginBottom: "3em" }}>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="2">Application Attempt Overview</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Header as='h4'>
                  <Header.Content>
                    Application Attempt State
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>FINISHED</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4'>
                  <Header.Content>
                    Started
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>Wed Oct 10 22:14:15 +0900 2018</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4'>
                  <Header.Content>
                    Elapsede
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>4mins, 32sec</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4'>
                  <Header.Content>
                    AM Container
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>container_1539176653200_0001_01_000001</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4'>
                  <Header.Content>
                    Node
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>hyeonwoo-VirtualBox:41291</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4'>
                  <Header.Content>
                    Tracking URL
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>History</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4'>
                  <Header.Content>
                    Diagnostics Info
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                Task failed task_1539176653200_0001_m_000000
                job failed as tasks failed. failedMaps:1 failedReduces:0
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4'>
                  <Header.Content>
                    Nodes Blacklisted by the application
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell> - </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4'>
                  <Header.Content>
                    Nodes Blacklisted by the system
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell> - </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

export default AttemptOverview
