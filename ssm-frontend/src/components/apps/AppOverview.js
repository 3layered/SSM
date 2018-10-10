import React, { Component } from "react";
import { Container, Table, Header } from "semantic-ui-react";

class AppOverview extends Component {
  render(){
    return(
      <Container style={{ marginTop: "3em", marginBottom: "3em" }}>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="2">Application Overview</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Header as='h4'>
                  <Header.Content>
                    User
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>hyeonwoo</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4'>
                  <Header.Content>
                    Name
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>grep-search</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4'>
                  <Header.Content>
                    Application Type
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>MAPREDUCE</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4'>
                  <Header.Content>
                    Application Tags
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4'>
                  <Header.Content>
                    Application Priority
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>0 (Higher Integer value indicates highrt priority)</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4'>
                  <Header.Content>
                    Application State
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>FINISHED</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4'>
                  <Header.Content>
                    Queue
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>default</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4'>
                  <Header.Content>
                    FinalStatus Reported by AM
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>FAILED</Table.Cell>
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
                    Elapsed
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>4mins, 32sec</Table.Cell>
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
                    Log Aggregation Status
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>DISABLED</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4'>
                  <Header.Content>
                    Diagnostics
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
                    Unmanaged Application
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>false</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4'>
                  <Header.Content>
                    Application Node Label expression
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{"<Not set>"}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4'>
                  <Header.Content>
                    AM Container Node Label expression
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{"<DEFAULT_PARTITION>"}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

export default AppOverview
