import React, { Component } from "react";
import { Container, Table } from "semantic-ui-react";

class ContainerMetrics extends Component {
  render(){
    return(
      <Container style={{marginTop: "3em", marginBottom: "3em"}}>
        <Table definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Node Local Request</Table.HeaderCell>
              <Table.HeaderCell>Rack Local Request</Table.HeaderCell>
              <Table.HeaderCell>Off Switch Request</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>Num Node Local Containers (Satisfied by)</Table.Cell>
              <Table.Cell>10</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Num Rack Local Containers (Satisfied by)</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Num Off Switch Containers (Satisfied by)</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>21</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
    </Container>
    )
  }
}

export default ContainerMetrics
