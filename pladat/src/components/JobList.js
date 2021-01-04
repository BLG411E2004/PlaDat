import React, { Component } from "react";
import HideJob from "./JobHide";

export default class JobList extends Component {
  state = {
    jobArray: [
      {
        id: 1,
        title: "Title 1",
      },
      {
        id: 2,
        title: "Title 2",
      },
      {
        id: 3,
        title: "Title 3",
      },
      {
        id: 4,
        title: "Title 4",
      },
      {
        id: 5,
        title: "Title 5",
      },
    ],
  };

  hideHandler = (id) => {
    this.setState({
      jobArray: [...this.state.jobArray.filter((job) => job.id !== id)],
    });
  };

  render() {
    return (
      <div>
        <HideJob joblist={this.state.jobArray} hideHandler={this.hideHandler} />
      </div>
    );
  }
}
