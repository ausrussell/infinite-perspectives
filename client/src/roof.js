import * as THREE from "three";

const createDomeRoof = function() {
  let domeGeometry = new THREE.SphereGeometry(
    100,
    15,
    15,
    0,
    Math.PI,
    0,
    -Math.PI / 2
  ); //, Math.PI, Math.PI
  let domeTexture = new THREE.TextureLoader().load("images/textures/crate.jpg");
  domeTexture.wrapS = domeTexture.wrapT = THREE.RepeatWrapping;
  domeTexture.repeat.set(12, 12);
  let domeMaterial = new THREE.MeshPhongMaterial({ map: domeTexture });
  let dome = new THREE.Mesh(domeGeometry, domeMaterial);
  dome.material.side = THREE.DoubleSide;
  return dome;
  // this.scene.add(dome);
};

export default createDomeRoof;
