import React, { Component } from 'react'
import { Menu, Dropdown, Item,Button,Segment } from 'semantic-ui-react'
import ModalDim from "./ModalDim";

export default class MenuExampleSecondaryPointing extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Segment inverted>

        
        <Menu pointing inverted secondary stackable size='large'>
        <Menu.Item>
          <img src='https://react.semantic-ui.com/logo.png' />
        </Menu.Item>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />          
          <Menu.Menu position='right'>
        <Dropdown item text='Language'>
          <Dropdown.Menu>
            <Dropdown.Item>English</Dropdown.Item>
            <Dropdown.Item>Russian</Dropdown.Item>
            <Dropdown.Item>Spanish</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item>
          <ModalDim title="Sign In"/>
        </Menu.Item>
        <Menu.Item>
        <ModalDim title="Sign Up"/>
        </Menu.Item>
      </Menu.Menu>
        </Menu>
        </Segment>
      </div>
    )
  }
}
