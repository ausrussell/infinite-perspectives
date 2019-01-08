import * as THREE from "three";

// const Flaneur = function() {
class Flaneur extends THREE.Mesh {
  // THREE.mesh.apply(this, arguments);

  constructor(props) {
    super(props);
    this.rotation.order = "YXZ";
    this._aggregateRotation = new THREE.Vector3();
    this.cameraHeight = 40;
    this.velocity = new THREE.Vector3();
    this.acceleration = new THREE.Vector3(0, 0, 0); //0, -150, 0
    this.ambientFriction = new THREE.Vector3(-130, 0, -130); //-10, 0, -10
    this.ambientAirFriction = new THREE.Vector3(-2, 0, -2); //-0.5, 0, -0.5

    this.SPEED = 30;

    // this._aggregateRotation = new THREE.Vector3();

    this.moveDirection = {
      FORWARD: false,
      BACKWARD: false,
      LEFT: false,
      RIGHT: false
    };
  }

  update(delta) {
    // this.velocity = new THREE.Vector3();
    let halfAccel = new THREE.Vector3();
    let scaledVelocity = new THREE.Vector3();

    // Compute look vector
    var r = this._aggregateRotation
      // .multiply(this.inverseLook)
      // .multiply(this.mouseSensitivity)
      .multiplyScalar(delta)
      .add(this.rotation);
    if (this.constrainVerticalLook) {
      r.x = Math.max(Math.PI * -0.5, Math.min(Math.PI * 0.5, r.x));
    }
    if (!this.fly) {
      this.rotation.x = 0;
    }

    // Thrust
    if (this.moveDirection.FORWARD) this.velocity.z -= this.SPEED;
    if (this.moveDirection.LEFT) this.velocity.x -= this.SPEED;
    if (this.moveDirection.BACKWARD) this.velocity.z += this.SPEED;
    if (this.moveDirection.RIGHT) this.velocity.x += this.SPEED;

    // Move
    halfAccel.copy(this.acceleration).multiplyScalar(delta * 0.5);
    this.velocity.add(halfAccel);
    var squaredManhattanVelocity =
      this.velocity.x * this.velocity.x + this.velocity.z * this.velocity.z;
    if (squaredManhattanVelocity > this.SPEED * this.SPEED) {
      var scalar = this.SPEED / Math.sqrt(squaredManhattanVelocity);
      this.velocity.x *= scalar;
      this.velocity.z *= scalar;
    }
    scaledVelocity.copy(this.velocity).multiplyScalar(delta);
    this.translateX(scaledVelocity.x);
    this.translateZ(scaledVelocity.z);
    // this.position.y += scaledVelocity.y;
    this.velocity.add(halfAccel);

    // Ambient forces
    this.velocity.add(
      scaledVelocity.multiply(
        this.canJump ? this.ambientFriction : this.ambientAirFriction
      )
    );

    // Look
    this.rotation.set(r.x, r.y, r.z);
    this._aggregateRotation.set(0, 0, 0);
  }
}
// Flaneur.prototype = Object.create(THREE.Mesh.prototype);
// Flaneur.prototype.constructor = Flaneur;

export default Flaneur;
