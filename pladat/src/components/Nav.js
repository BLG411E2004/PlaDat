import React, { Component } from 'react';
import { Input, Menu, Segment } from 'semantic-ui-react';
import SignUpFormCompany from "./SignUpFormCompany";
// import SignUpFormStudent from "./SignUpFormStudent";

export default class MenuExampleTabularOnTop extends Component {
  state = { activeItem: 'company' }
  content(){
    if(this.state.activeItem === 'company'){
      return (<SignUpFormCompany/>)
    }
    else{
      return (<SignUpFormCompany/>)
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu attached='top' tabular>
          <Menu.Item
            name='company'
            active={activeItem === 'company'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='student'
            active={activeItem === 'student'}
            onClick={this.handleItemClick}
          />
        </Menu>

        <Segment attached='bottom'>
          {this.content()}
        </Segment>
      </div>
    )
  }
}
