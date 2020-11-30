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
  function content(){
    if(props.value == "signin"){
      return (<Nav type="signin"/>);
    }
    else{
      return (<Nav type="signup"/>);
    }
  }
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
        size="medium"
        dimmer={dimmer}
        open={open}
        onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
      >
        {content()}
      </Modal>
    </div>
  )
}

export default ModalExampleDimmer