import React, { Component } from 'react'
import { Menu,Segment } from 'semantic-ui-react'
import ModalDimSignUp from "./ModalDimSignUp";
import ModalDimSignIn from "./ModalDimSignIn";



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
        <Menu.Item>
          <ModalDimSignIn title="Sign In"/>
        </Menu.Item>
        <Menu.Item>
          <ModalDimSignUp title="Sign Up"/>
        </Menu.Item>
      </Menu.Menu>
        </Menu>
        </Segment>
      </div>
    )
  }
}
