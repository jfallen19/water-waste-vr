/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var vertexShader = '\n  precision mediump float;\n\n  varying vec2 vUv;\n\n  void main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n  }\n';

var fragmentShader = '\n  precision mediump float;\n\n  varying vec2 vUv;\n  uniform float active;\n  uniform float progress;\n\n  void main() {\n    vec2 st = vUv * 2.0 - 1.0;\n\n    float pA = TWO_PI / 100.0 * progress;\n\n    vec4 baseColor = vec4(0.85, 0.85, 0.85, 1.0); //* (1.0 - active) + vec4(0.55, 0.25, 0.75, 1.0) * active;\n    vec4 progressColor = vec4(0.75, 0.75, 0.8, 1.0);\n    vec4 color = vec4(0.0);\n\n    color += baseColor * (1.0 - smoothstep(0.25, 0.45, distance(st, vec2(0.0))));\n\n    float a = abs(atan(st.y,st.x) - PI);\n    float smoothDist;\n    if(a < pA) {\n      smoothDist = smoothstep(0.45, 0.65, distance(st, vec2(0.0)));\n      color = max(progressColor * (1.0 - smoothDist), color);\n    }\n\n    gl_FragColor = color;\n  }\n';

var INCREMENT_SPEED = 1.0;
var DECREMENT_SPEED = 5.0;

AFRAME.registerComponent('custom-cursor', {
  init: function init() {
    var _this = this;

    this.progress = { value: 0 };

    this.geometry = new THREE.PlaneBufferGeometry(0.005, 0.005, 1, 1);
    this.material = new THREE.ShaderMaterial({
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
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
    });

    var cursorMesh = new THREE.Mesh(this.geometry, this.material);
    this.el.object3D.add(cursorMesh);

    this.tween = new AFRAME.TWEEN.Tween(this.progress);

    this.el.addEventListener('mouseleave', function (e) {
      if (e.detail.intersectedEl.getAttribute('classname') != 'target') {
        return;
      }
      _this.progress.value = 0;
      _this.material.uniforms.progress.value = _this.progress.value;
      _this.tween.stop();
    });

    this.el.addEventListener('mouseenter', function (e) {
      if (e.detail.intersectedEl.getAttribute('classname') != 'target') {
        return;
      }
      _this.tween.to({ value: 100.0 }, 500).onUpdate(function () {
        _this.material.uniforms.progress.value = _this.progress.value;
      }).start();
    });
  }
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tilesFrag = __webpack_require__(7);

var _tilesFrag2 = _interopRequireDefault(_tilesFrag);

var _passrawVert = __webpack_require__(6);

var _passrawVert2 = _interopRequireDefault(_passrawVert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

AFRAME.registerComponent('floor-tiles', {
  init: function init() {
    this.el.object3D.children[0].material = new THREE.ShaderMaterial({
      fragmentShader: _tilesFrag2.default,
      vertexShader: _passrawVert2.default,
      side: THREE.DoubleSide,
      transparent: false
    });
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('target', {
  schema: {
    level: { type: 'number' },
    textId: { type: 'string' }
  },
  init: function init() {
    this.el.addEventListener('click', function (evt) {
      var waterEl = document.getElementById('water');
      var level = this.getAttribute('target').level;

      waterEl.components.water.setLevel(level);

      var textId = this.components.target.data.textId;

      var textEl = document.getElementById(textId);

      var obj = { opacity: 0.0 };

      this.sceneEl.emit('text-hide-all', {}, false);

      var tween = new AFRAME.TWEEN.Tween(obj).to({ opacity: 1.0 }, 700).onUpdate(function () {
        textEl.setAttribute('text', obj);
      }).start();
    });
  }
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('text-auto-hide', {
  init: function init() {
    var self = this.el;

    var hide = function hide() {
      this.setAttribute('text', { opacity: 0.0 });
    };

    hide = hide.bind(this.el);

    this.el.sceneEl.addEventListener('text-hide-all', hide);
  }
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _waterVert = __webpack_require__(9);

var _waterVert2 = _interopRequireDefault(_waterVert);

var _waterFrag = __webpack_require__(8);

var _waterFrag2 = _interopRequireDefault(_waterFrag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

AFRAME.registerComponent('water', {
  init: function init() {
    this.level = -0.5;
    this.geometry = new THREE.PlaneBufferGeometry(3, 3, 18, 18);

    // debugger;

    // let normalTex = new THREE.ImageLoader().load('/assets/water.jpg');
    // normalTex.minFilter = THREE.NearestFilter;
    // normalTex.magFilter = THREE.NearestFilter;
    // normalTex = THREE.ImageUtils.loadTexture('/assets/water.jpg');

    this.material = new THREE.ShaderMaterial({
      fragmentShader: _waterFrag2.default,
      vertexShader: _waterVert2.default,
      defines: {
        PI: 3.1415926536,
        TWO_PI: 6.2831853072
      },
      uniforms: {
        time: { type: 'f', value: 0.0 },
        height: { type: 'f', value: this.level },
        waterNormal: { type: 't', value: null }
      },
      transparent: true,
      side: THREE.FrontSide
    });

    var mesh = new THREE.Mesh(this.geometry, this.material);

    this.el.object3D.add(mesh);
  },
  setLevel: function setLevel(newLevel) {
    var _this = this;

    // this.level = level;
    var obj = { level: this.level };

    var tween = new AFRAME.TWEEN.Tween(obj).to({ level: newLevel }, 500).onUpdate(function () {
      _this.material.uniforms.height.value = obj.level;
    }).onComplete(function () {
      _this.level = newLevel;
    }).start();
  },
  tick: function tick(t) {
    this.material.uniforms.time.value = t * 0.001;
  }
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);
__webpack_require__(0);
__webpack_require__(4);
__webpack_require__(1);
__webpack_require__(3);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "precision mediump float;\n\nvarying vec2 vUv;\nvarying vec3 vPos;\nvarying vec3 vNormal;\n\n// attribute mat4 projectionMatrix;\n// attribute mat4 modelViewMatrix;\n// attribute vec3 position;\n// attribute vec3 normal;\n// attribute vec2 uv;\n\nvoid main() {\n  vUv = uv;\n  vPos = position;\n  vNormal = normal;\n  \n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}"

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "precision mediump float;\n\nvarying vec3 vPos;\nvarying vec2 vUv;\n\nvoid main() {\n  vec3 color = vec3(vUv.x, vUv.y, 0.75);\n\n  vec2 st = vUv * 20.0;\n  st = floor(st);\n\n  if(mod(st.x + st.y, 2.0) == 0.0) {\n    color = vec3(0.9);\n  } else {\n    color = vec3(0.25);\n  }\n\n  gl_FragColor = vec4(color, 1.0); \n}\n"

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "precision mediump float;\n\nvarying vec3 vPos;\nvarying vec2 vUv;\nvarying vec3 vNormal;\n\nuniform sampler2D waterNormal;\nuniform float time;\n\nvoid main() {\n  vec3 color = vec3(0.1, 0.1, 0.75);\n  float l = 0.25 * max(0.0, dot(vNormal, vec3(0.8, 0.7, 0.35)));\n\n  gl_FragColor = vec4(color, 0.35); \n}\n"

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "precision mediump float;\n\nvarying vec2 vUv;\nvarying vec3 vPos;\nvarying vec3 vNormal;\n\nuniform float time;\nuniform float height;\n\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute(vec3 x) {\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nfloat snoise(vec2 v) {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n  // First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n  // Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n  // Permutations\n  i = mod289(i); // Avoid truncation effects in permutation\n  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))\n    + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n  // Gradients: 41 points uniformly over a line, mapped onto a diamond.\n  // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n  // Normalise gradients implicitly by scaling m\n  // Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n  // Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\n\nvoid main() {\n  vUv = uv;\n  vPos = position;\n  \n  float s_time = time / 10.0;\n\n  float noise_current = snoise(uv + s_time);\n  float noise_next = snoise(uv + vec2(0.05) + s_time);\n\n  vNormal = normal; //vec3();\n  vec3 pos = position + normal * 0.25 * abs(vec3(noise_current)) + vec3(0.0, 0.0, height);\n  \n  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );\n}"

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map