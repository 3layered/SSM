import React, { Component } from "react"
import { Container, List } from "semantic-ui-react"
import axios from "axios";

class DirectoryList extends Component {
  constructor(props) {
		super(props);
		this.state = {};
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
		axios
			.get(
				"http://127.0.0.1:50070/webhdfs/v1/?op=LISTSTATUS"
			)
			.then(response => {
				this.setState({'data': response.data});
			})
			.catch(error => {
				alert(error);
			});
	}
  render(){
    return(
      <Container>
        <List>
          <List.Item>
            <List.Icon name='folder' />
            <List.Content>
              <List.Header>src</List.Header>
              <List.Description>Source files for project</List.Description>
              <List.List>
                <List.Item>
                  <List.Icon name='folder' />
                  <List.Content>
                    <List.Header>site</List.Header>
                    <List.Description>Your sites theme</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='folder' />
                  <List.Content>
                    <List.Header>themes</List.Header>
                    <List.Description>Packaged theme files</List.Description>
                    <List.List>
                      <List.Item>
                        <List.Icon name='folder' />
                        <List.Content>
                          <List.Header>default</List.Header>
                          <List.Description>Default packaged theme</List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon name='folder' />
                        <List.Content>
                          <List.Header>my_theme</List.Header>
                          <List.Description>
                            Packaged themes are also available in this folder
                          </List.Description>
                        </List.Content>
                      </List.Item>
                    </List.List>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='file' />
                  <List.Content>
                    <List.Header>theme.config</List.Header>
                    <List.Description>Config file for setting packaged themes</List.Description>
                  </List.Content>
                </List.Item>
              </List.List>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='folder' />
            <List.Content>
              <List.Header>dist</List.Header>
              <List.Description>Compiled CSS and JS files</List.Description>
              <List.List>
                <List.Item>
                  <List.Icon name='folder' />
                  <List.Content>
                    <List.Header>components</List.Header>
                    <List.Description>Individual component CSS and JS</List.Description>
                  </List.Content>
                </List.Item>
              </List.List>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='file' />
            <List.Content>
              <List.Header>semantic.json</List.Header>
              <List.Description>Contains build settings for gulp</List.Description>
            </List.Content>
          </List.Item>
        </List>
      </Container>
    )
  }
}

export default DirectoryList
