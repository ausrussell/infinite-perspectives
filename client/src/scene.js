import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import Prism from "./prism";

const ArtFileNames = [];

class Scene extends Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
    this.prisms = [];
    this.rotateConst = 0.01;
  }

  createDomeRoof() {
    let domeGeometry = new THREE.SphereGeometry(
      100,
      15,
      15,
      0,
      Math.PI,
      0,
      -Math.PI / 2
    ); //, Math.PI, Math.PI
    let domeTexture = new THREE.TextureLoader().load(
      "images/rough-white-grunge-brick-wall-texture.jpg"
    );
    domeTexture.wrapS = domeTexture.wrapT = THREE.RepeatWrapping;
    domeTexture.repeat.set(12, 12);
    let domeMaterial = new THREE.MeshPhongMaterial({ map: domeTexture });
    let dome = new THREE.Mesh(domeGeometry, domeMaterial);
    dome.material.side = THREE.DoubleSide;
    this.scene.add(dome);
  }
  processArtFileNames(json) {
    let fileNames = json;
    console.log("ArtFileNames", fileNames);

    let i = fileNames.length;
    for (i; i > 0; i--) {
      this.prisms[i] = new Prism({ file: fileNames[i] });
      this.prisms[i].add(this.scene);
    }

    // this.prisms.forEach(p => p.add(this.scene));
  }
  createPrism() {
    console.log("about  to fetch dir");
    fetch("/readdir")
      .then(res => res.json())
      .then(json => this.processArtFileNames(json));
  }

  addFlooring() {
    let geometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    geometry.rotateX(-Math.PI / 2);
    geometry.rotateY(-Math.PI / 2);
    let floorTexture = new THREE.TextureLoader().load(
      "images/wood-texture1.jpg"
    );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(15, 40);
    let material = new THREE.MeshPhongMaterial({
      color: 0x996633,
      specular: 0x050505,
      shininess: 100,
      map: floorTexture,
      side: THREE.DoubleSide
    });
    let mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
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
    light.position.set(1, 1, 1);

    // Add the light to the scene
    // this.scene.add(light);
  }

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const geometry = new THREE.BoxGeometry(20, 21, 1);
    const material = new THREE.MeshLambertMaterial({ color: "#433F81" });
    const cube = new THREE.Mesh(geometry, material);
    camera.position.y = 14;
    camera.position.x = 0;
    camera.position.z = 50;
    cube.position.x = 50;
    this.scene = scene;
    this.scene.add(cube);

    renderer.setClearColor("#000000");
    renderer.setSize(width, height);

    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.cube = cube;
    this.addLights();
    this.createPrism();
    this.createDomeRoof();
    this.addFlooring();

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
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    // this.tri.rotateZ(this.rotateConst);
    this.prisms.forEach(p => p.rotate());

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div
        style={{ width: "100%", height: "1000px" }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}
export default Scene;
// ReactDOM.render(<Scene />, document.querySelector("#root"));
