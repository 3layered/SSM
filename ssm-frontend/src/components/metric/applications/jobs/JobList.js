import React, { Component } from "react";
import { Container, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";

class JobList extends Component {
    render() {
        return (
            <Container style={{marginTop: "1em"}}>
                <h4> Job List </h4>
                <ul>
                    <li> User: hadoop </li>
                    <li> Total Uptime: 1.8 min </li>
                    <li> Scheduling Mode: FIFO </li>
                    <li>
                        <Link to="/metric/applications/jobs">Completed Jobs</Link>: 1
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
                            <Table.HeaderCell> Tasks (for all stages): Succeeded/Total </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Link to="/metric/applications/jobs/stages"> 0 </Link>
                            </Table.Cell>
                            <Table.Cell>
                                collect at /home/hadoop/MySparkApp.scala:40 <br/>
                                <Link to="/metric/applications/jobs/stages">collect at /home/hadoop/MySparkApp.scala:40 </Link>
                            </Table.Cell>
                            <Table.Cell> 2018-10-09 09:12:59 </Table.Cell>
                            <Table.Cell> 5 s </Table.Cell>
                            <Table.Cell> 2/2 </Table.Cell>
                            <Table.Cell> 9/9 </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Container>
        );
    }
}

export default JobList