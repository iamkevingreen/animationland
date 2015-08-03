var PIXI = require('../vendor/pixi.js');


'use strict';

var home = module.exports = {
  dom: {
    content: document.querySelector('.content'),
  },
  init: function() {
    if (home.dom.content) {
      this.render();
    }
  },
  render: function() {
    this.pixiStage();
  },
  pixiStage: function() {
    var content = home.dom.content;

    var rendererOptions = {
        antialiasing:false,
        transparent:false,
        resolution:1
    }

    //Create the renderer
    var renderer = PIXI.autoDetectRenderer(
      256, 256, rendererOptions
    );

    renderer.view.style.position = "absolute"
    renderer.view.style.display = "block";
    renderer.autoResize = true;
    renderer.resize(window.innerWidth, window.innerHeight);

    //Add the canvas to the HTML document
    content.appendChild(renderer.view);

    //Create a container object called the `stage`
    var stage = new PIXI.Container();

    PIXI.loader
      .add("assets/images/antler.png")
      .load(setup);

    function setup() {

      var antler = new PIXI.Sprite.fromImage("assets/images/antler.png");
      stage.addChild(antler);
      console.log(antler);
      //Tell the `renderer` to `render` the `stage`
      renderer.render(stage);
    }



    window.addEventListener("resize", function(e, here) {
      renderer.resize(window.innerWidth, window.innerHeight);
    });

  }

};
