import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import Nav from "./Nav"



function exampleReducer(state, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { open: true, dimmer: action.dimmer }
    case 'CLOSE_MODAL':
      return { open: false }
    default:
      throw new Error()
  }
}

function ModalExampleDimmer(props) {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  })
  const { open, dimmer } = state
  return (
    <div>      
      <Button
        onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}
      >
        {props.title}
      </Button>

      <Modal
        closeIcon
        size="large"
        dimmer={dimmer}
        open={open}
        onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
      >
        <Nav></Nav>
      </Modal>
    </div>
  )
}

export default ModalExampleDimmer