precision mediump float;

varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;

// attribute mat4 projectionMatrix;
// attribute mat4 modelViewMatrix;
// attribute vec3 position;
// attribute vec3 normal;
// attribute vec2 uv;

void main() {
  vUv = uv;
  vPos = position;
  vNormal = normal;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}