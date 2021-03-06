import React, { Component } from "react";
import ReactDOM from "react-dom";
import PointerLock from "react-pointerlock";

class Test extends Component {
  constructor() {
    super();

    this.state = { x: 50, y: 50 };

    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentDidMount() {
    this.canvasDraw();
  }

  componentDidUpdate() {
    this.canvasDraw();
  }

  onMouseMove(movement) {
    const canvas = ReactDOM.findDOMNode(this.refs.canvas);
    let x = this.state.x + movement.x;
    let y = this.state.y + movement.y;

    if (x > canvas.clientWidth + 20) {
      x = 0;
    }

    if (y > canvas.clientHeight + 20) {
      y = 0;
    }

    if (x < -15) {
      x = canvas.clientWidth;
    }

    if (y < -15) {
      y = canvas.clientHeight;
    }

    this.setState({ x: x, y: y });
  }

  canvasDraw() {
    const canvas = ReactDOM.findDOMNode(this.refs.canvas);
    const context = canvas.getContext("2d");

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    context.fillStyle = "#F9F903";
    context.beginPath();
    context.arc(this.state.x, this.state.y, 20, 0, Math.PI * 2, true);
    context.fill();
  }

  render() {
    return (
      <div className="app">
        <h1>Pointer lock demo</h1>
        <p>
          This demo demonstrates usage of the pointer lock API. Click on the
          canvas area and your mouse will directly control the ball inside the
          canvas, not your mouse pointer. You can press escape to return to the
          standard expected state.
        </p>

        <h2>X Position: {this.state.x}</h2>
        <h2>Y Position: {this.state.y}</h2>

        <PointerLock onMouseMove={this.onMouseMove}>
          <canvas width="640px" height="369px" ref="canvas" />
        </PointerLock>
      </div>
    );
  }
}

export default Test;
