AFRAME.registerComponent('text-auto-hide', {
  init: function () {
    var self = this.el;

    let hide = function() {
      this.setAttribute('text', {opacity: 0.0});
    };

    hide = hide.bind(this.el);

    this.el.sceneEl.addEventListener('text-hide-all', hide)
  }
});

