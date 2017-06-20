const vertexShader = `
  precision mediump float;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;

const fragmentShader = `
  precision mediump float;

  varying vec2 vUv;
  uniform float active;
  uniform float progress;

  void main() {
    vec2 st = vUv * 2.0 - 1.0;

    float pA = TWO_PI / 100.0 * progress;

    vec4 baseColor = vec4(0.75, 0.75, 0.75, 1.0); //* (1.0 - active) + vec4(0.55, 0.25, 0.75, 1.0) * active;
    vec4 progressColor = vec4(0.85, 0.85, 0.85, 1.0);
    vec4 color = vec4(0.0);

    color += baseColor * (1.0 - smoothstep(0.25, 0.45, distance(st, vec2(0.0))));

    float a = abs(atan(st.y,st.x) - PI);
    float smoothDist;
    if(a < pA) {
      smoothDist = smoothstep(0.45, 0.65, distance(st, vec2(0.0)));
      color = max(progressColor * (1.0 - smoothDist), color);
    }

    gl_FragColor = color;
  }
`;

const INCREMENT_SPEED = 1.0;
const DECREMENT_SPEED = 5.0;

AFRAME.registerComponent('custom-cursor', {
  init: function () {
    this.progress = {value: 0};

    this.geometry = new THREE.PlaneBufferGeometry( 0.005, 0.005, 1, 1 );
    this.material = new THREE.ShaderMaterial( {
      fragmentShader,
      vertexShader,
      defines: {
        PI: 3.1415926536,
        TWO_PI: 6.2831853072
      },
      uniforms: {
        active: { type: 'f', value: 0.0 },
        progress: { type: 'f', value: 0.0 }
      },
      transparent: true,
      side: THREE.FrontSide
    } );
    
    let cursorMesh = new THREE.Mesh( this.geometry, this.material );
    this.el.object3D.add(cursorMesh);

    this.tween = new AFRAME.TWEEN.Tween(this.progress);

    this.el.addEventListener('mouseleave', e => {
      if(e.detail.intersectedEl.getAttribute('classname') != 'target') {
        return;
      }
      this.progress.value = 0;
      this.material.uniforms.progress.value = this.progress.value;
      this.tween.stop();
    });

    this.el.addEventListener('mouseenter', e => {
      if(e.detail.intersectedEl.getAttribute('classname') != 'target') {
        return;
      }
      this.tween.to({value: 100.0}, 500)
      .onUpdate(() => {
        this.material.uniforms.progress.value = this.progress.value;
      })
      .start();
    });
  }
});
