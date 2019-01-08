import * as THREE from "three";

const createFlooring = function() {
  let geometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
  geometry.rotateX(-Math.PI / 2);
  geometry.rotateY(-Math.PI / 2);
  let floorTexture = new THREE.TextureLoader().load(
    "images/textures/wood-texture1.jpg"
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

  return mesh;
};

export default createFlooring;
