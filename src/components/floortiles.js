import fragmentShader from '../shaders/tiles.frag.glsl';
import vertexShader from '../shaders/passraw.vert.glsl';

AFRAME.registerComponent('floor-tiles', {
  init: function () {
    this.el.object3D.children[0].material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      side: THREE.DoubleSide,
      transparent: false
    });
  }
});

