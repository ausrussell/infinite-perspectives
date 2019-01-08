import PointerLock from "react-pointerlock";

export default class InputManager {
  constructor(scene, domElement) {
    // debugger;
    this.domElement = domElement || document.body;
    console.log("this.domElement", this.domElement);
    // this.domElement.addEventListener(
    //   "mousedown",
    //   function() {
    //     console.log("mousedown");
    //   },
    //   false
    // );
    document.addEventListener("keydown", function(event) {
      // debugger;
      console.log("InputManager keydown", event.keycode, event);
      // scene.handleKeydown(event);
      switch (event.keyCode) {
        case 38: //up
        case 87: //w
          scene.handleKeydownDirection("FORWARD");
          break;
        case 37: //left
        case 65: //a
          scene.handleKeydownDirection("LEFT");
          break;
        case 40: //down
        case 83: //s
          scene.handleKeydownDirection("BACKWARD");
          break;
        case 39: //right
        case 68: //d
          scene.handleKeydownDirection("RIGHT");
          break;
      }
    });

    document.addEventListener(
      "keyup",
      function(event) {
        switch (event.keyCode) {
          case 38: // up
          case 87: // w
            scene.handleKeyupDirection("FORWARD", false);
            break;
          case 37: // left
          case 65: // a
            scene.handleKeyupDirection("LEFT", false);
            break;
          case 40: // down
          case 83: // s
            scene.handleKeyupDirection("BACKWARD", false);
            break;
          case 39: // right
          case 68: // d
            scene.handleKeyupDirection("RIGHT", false);
            break;
          case 32: // space
            break;
        }
      },
      false
    );
    // this.boundOnMouseDown = evt => this.onMouseDown(evt);
    // this.domElement.addEventListener("mousedown", this.boundOnMouseDown, false);
  }

  onPointerlockChange(event) {
    console.log("onPointerlockChange", event);
    if (document.pointerLockElement === this.domElement) {
      this.domElement.addEventListener(
        "mousemove",
        this.boundOnMouseMove,
        false
      );
      this.domElement.addEventListener("mouseup", this.boundOnMouseUp, false);
      this.isLocked = true;
    } else {
      this.domElement.removeEventListener(
        "mousemove",
        this.boundOnMouseMove,
        false
      );
      this.domElement.removeEventListener(
        "mouseup",
        this.boundOnMouseUp,
        false
      );
      this.isLocked = false;
    }
  }

  onPointerlockError(event) {
    console.error("PointerLockControls: Unable to use Pointer Lock API");
  }
}
