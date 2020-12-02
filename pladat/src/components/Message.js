import React from "react";
import { Message } from "semantic-ui-react";

const MessageExampleNegative = (props) => (
  <Message negative>
    <Message.Header>{props.message}</Message.Header>
  </Message>
);

export default MessageExampleNegative;
