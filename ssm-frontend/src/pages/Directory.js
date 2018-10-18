import React, { Component } from "react"
import { Container } from "semantic-ui-react"
import { DirectoryList } from "../components/directory"
class Directory extends Component {
  render(){
    return(
      <Container>
        <DirectoryList/>
      </Container>
    )
  }
}

export default Directory
