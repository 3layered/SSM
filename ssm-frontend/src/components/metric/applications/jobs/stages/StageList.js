import React, { Component } from "react";
import { Container, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";

class StageList extends Component {
    render() {
        return (
            <Container style={{marginTop: "1em"}}>
                <h4> Details for Job 0 </h4>
                <ul>
                    <li> Status: SUCCEEDED </li>
                    <li>
                        <Link to="/metric/applications/jobs/stages"> Completed Stages</Link>: 2
                    </li>
                </ul>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell> Job ID </Table.HeaderCell>
                            <Table.HeaderCell> Description </Table.HeaderCell>
                            <Table.HeaderCell> Submitted </Table.HeaderCell>
                            <Table.HeaderCell> Duration </Table.HeaderCell>
                            <Table.HeaderCell> Stages: Succeeded/Total </Table.HeaderCell>
                            <Table.HeaderCell> Tasks: Succeeded/Total </Table.HeaderCell>
                            <Table.HeaderCell> Input </Table.HeaderCell>
                            <Table.HeaderCell> Output </Table.HeaderCell>
                            <Table.HeaderCell> Shuffle Read </Table.HeaderCell>
                            <Table.HeaderCell> Shuffle Write </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell> 1 </Table.Cell>
                            <Table.Cell>
                                <Link to="/metric/applications/jobs/stages/detail">collect at /home/hadoop/MySparkApp.scala:40 </Link>
                            </Table.Cell>
                            <Table.Cell> 2018-10-09 09:12:59 </Table.Cell>
                            <Table.Cell> 2 s </Table.Cell>
                            <Table.Cell> 8/8 </Table.Cell>
                            <Table.Cell> </Table.Cell>
                            <Table.Cell> </Table.Cell>
                            <Table.Cell> 455.0 B</Table.Cell>
                            <Table.Cell> </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell> 0 </Table.Cell>
                            <Table.Cell>
                                <Link to="/metric/applications/jobs/stages/detail">reduceByKey at /home/hadoop/MySparkApp.scala:40 </Link>
                            </Table.Cell>
                            <Table.Cell> 2018-10-09 09:12:59 </Table.Cell>
                            <Table.Cell> 4 s </Table.Cell>
                            <Table.Cell> 1/1 </Table.Cell>
                            <Table.Cell> </Table.Cell>
                            <Table.Cell> </Table.Cell>
                            <Table.Cell> </Table.Cell>
                            <Table.Cell> 455.0 B </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Container>
        );
    }
}

export default StageList