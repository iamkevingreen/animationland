var PIXI = require('../vendor/pixi.js');

'use strict';

var home = module.exports = {
  dom: {
    body: document.querySelector('body'),
    content: document.querySelector('.content'),
  },
  init: function() {
    if (home.dom.body) {
      this.render();
    }
  },
  render: function() {
    this.pixiStage();
  },
  pixiStage: function() {
    var content = home.dom.content;
    //Create the renderer
    var renderer = PIXI.autoDetectRenderer(256, 256);

    //Add the canvas to the HTML document
    content.appendChild(renderer.view);

    //Create a container object called the `stage`
    var stage = new PIXI.Container();

    //Tell the `renderer` to `render` the `stage`
    renderer.render(stage);
  }
};
