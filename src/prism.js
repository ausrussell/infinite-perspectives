import React, { Component } from "react";
import * as THREE from "three";
// import * as files from "./files.js";

class Prism extends Component {
  constructor(props) {
    super(props);
    // console.log("files", files);
    this.rotateConst = 0.01;
    this.prismLength = 8;
    this.prismWidth = 8;

    let shape = new THREE.Shape();
    shape.moveTo(-this.prismWidth, -this.prismLength);
    shape.lineTo(-this.prismLength, this.prismWidth);
    shape.lineTo(this.prismLength, this.prismWidth);
    shape.lineTo(-this.prismWidth, -this.prismLength);

    let extrudeSettings = {
      depth: 100
    };

    // let prismGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    let prismGeometry = new THREE.BoxGeometry(10, 10, 20, 1, 1, 2); //shape, extrudeSettings

    let prismMaterial = new THREE.MeshLambertMaterial({
      color: Math.random() * 0xffffff,

      wireframe: true
    });
    let mesh = new THREE.Mesh(prismGeometry, prismMaterial);
    mesh.position.z = this.randomInRange(10, 20);
    mesh.position.x = this.randomInRange(-35, -20);
    mesh.position.y = this.randomInRange(10, 20);
    // this.scene.add(tri);
    this.mesh = mesh;
    this.createPicturePrism();
    return this;
  }
  createPicturePrism() {
    let picturePrismWidth = this.prismWidth * 1.1,
      picturePrismLength = this.prismLength * 1.1;
    let shape = new THREE.Shape();
    shape.moveTo(-this.prismWidth, -this.prismLength);
    shape.lineTo(-this.prismLength, this.prismWidth);
    shape.lineTo(this.prismLength, this.prismWidth);
    shape.lineTo(-this.prismWidth, -this.prismLength);

    let extrudeSettings = {
      depth: 100
    };
    var loader = new THREE.TextureLoader();
    let prismGeometry = new THREE.PlaneGeometry(10, 10); //(20, 30, 30); //new THREE.SphereGeometry(50, 20, 20); //shape, extrudeSettings); //new THREE.PlaneGeometry(10, 10);PlaneGeometry

    let imgSrc = "images/mum_breakfast.jpg";
    var tex = new THREE.TextureLoader().load(imgSrc, tex => {
      tex.needsUpdate = true;
      pictureMesh.scale.set(1, tex.image.height / tex.image.width, 1.0);
    });
    // tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    // tex.repeat.set(2, 2);
    // debugger;

    // this.mesh.geometry.vertices[0];
    let prismMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      map: tex
      // wireframe: true
    });
    let pictureMesh = new THREE.Mesh(prismGeometry, prismMaterial);
    // pictureMesh.rotateY(Math.PI / 2);
    // pictureMesh.position.x = this.mesh.position.x + 18;
    //
    pictureMesh.position.x = this.mesh.position.x + 1;
    pictureMesh.position.y = this.mesh.position.y;
    pictureMesh.position.z = this.mesh.position.z;
    // pictureMesh.position.z = this.mesh.position.z;
    this.pictureMesh = pictureMesh;
    let meshVertices = this.mesh.geometry.vertices;
    this.pictureMesh.geometry.vertices[0] = meshVertices[0];
    this.pictureMesh.geometry.vertices[1] = meshVertices[1];
    this.pictureMesh.geometry.vertices[2] = meshVertices[3];
    this.pictureMesh.geometry.vertices[3] = meshVertices[4];
    this.pictureMesh.geometry.verticesNeedUpdate = true;

    console.log("this.mesh", this.mesh);
    console.log("this.pictureMesh", this.pictureMesh);
  }
  randomInRange(from, to) {
    let x = Math.random() * (to - from);
    return x + from;
  }
  add(scene) {
    scene.add(this.mesh);
    scene.add(this.pictureMesh);
  }
  rotate() {
    // debugger;
    this.mesh.rotateZ(this.rotateConst);
    this.pictureMesh.rotateZ(this.rotateConst);
    // this.pictureMesh.rotateX(this.rotateConst);
    // this.pictureMesh.rotateY(this.rotateConst);
  }
}

export default Prism;
