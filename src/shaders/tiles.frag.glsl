precision mediump float;

varying vec3 vPos;
varying vec2 vUv;

void main() {
  vec3 color = vec3(vUv.x, vUv.y, 0.75);

  vec2 st = vUv * 20.0;
  st = floor(st);

  if(mod(st.x + st.y, 2.0) == 0.0) {
    color = vec3(0.9);
  } else {
    color = vec3(0.25);
  }

  gl_FragColor = vec4(color, 1.0); 
}
