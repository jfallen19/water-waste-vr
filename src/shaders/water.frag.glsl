precision mediump float;

varying vec3 vPos;
varying vec2 vUv;
varying vec3 vNormal;

uniform sampler2D waterNormal;
uniform float time;

void main() {
  vec3 color = vec3(0.1, 0.1, 0.75);
  float l = 0.25 * max(0.0, dot(vNormal, vec3(0.8, 0.7, 0.35)));

  gl_FragColor = vec4(color, 0.35); 
}
