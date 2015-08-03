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

    //Aliases
    var Container = PIXI.Container,
        autoDetectRenderer = PIXI.autoDetectRenderer,
        loader = PIXI.loader,
        Sprite = PIXI.Sprite;

    var rendererOptions = {
        antialiasing:false,
        transparent:false,
        resolution:1
    }

    //Create the renderer
    var renderer = autoDetectRenderer(
      256, 256, rendererOptions
    );

    renderer.view.style.position = "absolute"
    renderer.view.style.display = "block";
    renderer.autoResize = true;
    renderer.resize(window.innerWidth, window.innerHeight);

    //Add the canvas to the HTML document
    content.appendChild(renderer.view);

    //Create a container object called the `stage`
    var stage = new Container();

    loader
      .add("antlerImage", "assets/images/antler.png", {}, imageAssetsLoaded)
      .on("progress", loadProgressHandler)
      .load(setup);

    function imageAssetsLoaded() {
      console.log('All images are loaded');
    }

    function loadProgressHandler(loader, resource) {
      console.log('loading: ' +resource.url);
      console.log('loading: ' +loader.progress +'%');
    }

    function setup() {

      var antler = new Sprite(PIXI.loader.resources.antlerImage.texture);

      antler.x = 96;
      antler.y = 96;

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
