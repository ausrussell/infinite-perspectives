import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import Prism from "./prism";
import createDomeRoof from "./roof";
import createFlooring from "./Floor";
import Flaneur from "./Flaneur";
import InputManager from "./InputManager";
import PointerLock from "react-pointerlock";

const ArtFileNames = [];

class Scene extends Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
    this.prisms = [];
    this.rotateConst = 0.01;
    this.moveDelta = 0.2;
    this.clock = new THREE.Clock(false);
    this.INV_MAX_FPS = 1 / 60;
    this.frameDelta = 0;
  }

  processArtFileNames(json) {
    let fileNames = json;
    console.log("ArtFileNames", fileNames);

    let i = fileNames.length - 1;
    for (i; i >= 0; i--) {
      console.log("fileNames[i]", i, fileNames[i]);
      this.prisms[i] = new Prism({ file: fileNames[i] });
      this.prisms[i].add(this.scene);
    }
  }
  createPrism() {
    console.log("about  to fetch dir");
    fetch("/readdir")
      .then(res => res.json())
      .then(json => this.processArtFileNames(json));
  }

  addLights() {
    let light = new THREE.DirectionalLight({
      color: 0xffffff
    });
    light.position.y = 55;
    light.position.z = -5;
    let lightTarget = new THREE.Object3D();
    lightTarget.position.x = -25;
    lightTarget.position.z = -25;
    lightTarget.position.y = 2;
    light.target = lightTarget;
    let lightHelper = new THREE.DirectionalLightHelper(light, 5, 0x000000);

    this.scene.add(light);
    this.scene.add(lightTarget);

    this.scene.add(lightHelper);
    light = new THREE.AmbientLight({
      color: 0xffffff,
      intensity: 0.1
    });
    this.scene.add(light);

    light = new THREE.PointLight(0xffffff, 1, 0);

    // Specify the light's position
    light.position.set(1, 10, 1);

    // Add the light to the scene
    // this.scene.add(light);
  }

  handleKeydownDirection(direction) {
    console.log("handleKeydown");
    this.flaneur.moveDirection[direction] = true;
  }

  handleKeyupDirection(direction) {
    console.log("handleKeyup");
    this.flaneur.moveDirection[direction] = false;
  }

  handleMouseMove(event, x, y) {
    console.log("x,y", x, y);
    this.flaneur.rotate(y, x, 0);
  }

  initScene() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const geometry = new THREE.BoxGeometry(20, 21, 1);
    const material = new THREE.MeshLambertMaterial({ color: "#433F81" });

    // camera.position.y = 154;
    // camera.position.x = 0;
    camera.position.y = 5;

    this.scene = scene;

    renderer.setClearColor("#000000");
    renderer.setSize(width, height);

    this.camera = camera;
    this.renderer = renderer;
    this.material = material;

    this.flaneur = new Flaneur();
    this.flaneur.add(this.camera);
    this.scene.add(this.flaneur);
    this.addLights();
    this.createPrism();
    this.scene.add(createDomeRoof());
    this.scene.add(createFlooring());
    // new InputManager(this);
    console.log("this.renderer.domElement", this.renderer.domElement);
    this.inputManager = new InputManager(this, this.renderer.domElement);
    this.inputManager.setPointerLock(true);
    // this.scene.add();
  }

  componentDidMount() {
    this.initScene();

    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  animate() {
    // this.tri.rotateZ(this.rotateConst);
    this.prisms.forEach(p => p.rotate());

    // this.frameDelta += this.clock.getDelta();
    // while (this.frameDelta >= this.INV_MAX_FPS) {
    //   this.flaneur.update(this.INV_MAX_FPS);
    //   this.frameDelta -= this.INV_MAX_FPS;
    // }
    this.flaneur.update(this.INV_MAX_FPS);
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div>
        <div
          style={{ width: "100%", height: "1000px" }}
          ref={mount => {
            this.mount = mount;
          }}
        />
      </div>
    );
  }
}
export default Scene;
// ReactDOM.render(<Scene />, document.querySelector("#root"));
