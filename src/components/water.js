import vertexShader from '../shaders/water.vert.glsl';
import fragmentShader from '../shaders/water.frag.glsl';

AFRAME.registerComponent('water', {
  init: function () {
    this.level = -0.5;
    this.geometry = new THREE.PlaneBufferGeometry( 3, 3, 18, 18 );


    // debugger;

    let normalTex = new THREE.ImageLoader().load('/assets/water.jpg');
    normalTex.minFilter = THREE.NearestFilter;
    normalTex.magFilter = THREE.NearestFilter;
    normalTex = THREE.ImageUtils.loadTexture('/assets/water.jpg');

    this.material = new THREE.ShaderMaterial( {
      fragmentShader,
      vertexShader,
      defines: {
        PI: 3.1415926536,
        TWO_PI: 6.2831853072
      },
      uniforms: {
        time: { type: 'f', value: 0.0 },
        height: { type: 'f', value: this.level },
        waterNormal: { type: 't', value: normalTex }
      },
      transparent: true,
      side: THREE.FrontSide
    } );

    let mesh = new THREE.Mesh(this.geometry, this.material);

    this.el.object3D.add(mesh);
  },
  setLevel: function(newLevel) {
    // this.level = level;
    let obj = {level: this.level};

    let tween = new AFRAME.TWEEN.Tween(obj)
        .to({level: newLevel}, 500)
        .onUpdate(() => {
          this.material.uniforms.height.value = obj.level;
        })
        .onComplete(() => {
          this.level = newLevel;
        })
        .start();
  },
  tick: function(t) {
    this.material.uniforms.time.value = t * 0.001;
  }
});

