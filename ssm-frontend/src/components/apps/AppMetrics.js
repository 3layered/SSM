import React, { Component } from "react";
import { Container, Table, Header } from "semantic-ui-react";

class AppMetrics extends Component {
  render(){
    return(
      <Container style={{marginTop: "3em", marginBottom: "3em"}}>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="2">Application Metrics</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Header as='h4'>
                <Header.Content>
                  Total Resource Preempted
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{"<memory:0, VCores:0>"}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as='h4'>
                <Header.Content>
                  Total Number of Non-AM Containers Preempted
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>0</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as='h4'>
                <Header.Content>
                  Total Number of AM Containers Preempted
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>0</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as='h4'>
                <Header.Content>
                  Resource Preempted from Current Attempt
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{"<memory:0, VCores:0>"}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as='h4'>
                <Header.Content>
                  Number of Non-AM Containers Preempted from Current Attempt
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>0</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as='h4'>
                <Header.Content>
                  Aggregate Resource Allocation
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>1759813 MB-seconds, 1426 vcore-seconds</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as='h4'>
                <Header.Content>
                  Aggregate Preempted Resource Allocation
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>0 MB-seconds, 0 vcore-seconds</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
    )
  }
}

export default AppMetrics
