import React, { Component } from "react"
import { Container } from "semantic-ui-react"
import { DirectoryList } from "../components/directory"
class Directory extends Component {
  render(){
    return(
      <Container>
        <DirectoryList url={'localhost:50070'} setFile={console.log} />
      </Container>
    )
  }
}

export default Directory
