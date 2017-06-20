AFRAME.registerComponent('target', {
  schema: {
    level: {type: 'number'},
    textId: {type: 'string'}
  },
  init: function () {
    this.el.addEventListener('click', function (evt) {
      let waterEl = document.getElementById('water');
      let level = this.getAttribute('target').level;

      waterEl.components.water.setLevel(level);

      let {textId} = this.components.target.data;
      let textEl = document.getElementById(textId);
      

      let obj = {opacity: 0.0};

      this.sceneEl.emit('text-hide-all', {}, false);

      let tween = new AFRAME.TWEEN.Tween(obj)
          .to({opacity: 1.0}, 700)
          .onUpdate(() => {
            textEl.setAttribute('text', obj);
          })
          .start();

    });
  }
});

