precision mediump float;

varying vec3 vPos;
varying vec2 vUv;
varying vec3 vNormal;

uniform sampler2D waterNormal;
uniform float time;

void main() {
  vec3 color = vec3(0.1, 0.1, 0.75);
  vec3 wn = texture2D(waterNormal, vUv).xyz * 2.0 - 1.0;

  float l = 0.25 * max(0.0, dot(wn, vec3(0.8, 0.7, 0.35)));

  float alpha = 0.35 + 0.65 * step(0.1, l);

  gl_FragColor = vec4(color, 0.35); 
}
