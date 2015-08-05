var PIXI = require('../vendor/pixi.js');
var Sketch = require('../vendor/sketch.js');
require('../vendor/p5.js');

'use strict';

var home = module.exports = {
  dom: {
    content: document.getElementById('container'),
  },
  init: function() {
    if (home.dom.content) {
      this.render();
    }
  },
  render: function() {
    // this.pixiStage();
    // this.sketchStage();
    this.processing();
  },
  processing: function() {
    var setup = function() {

    }
  },

  sketchStage: function() {
      // ----------------------------------------
      // Particle
      // ----------------------------------------
      function Particle( x, y, radius ) {
          this.init( x, y, radius );
      }
      Particle.prototype = {
          init: function( x, y, radius ) {
              this.alive = true;
              this.radius = radius || 5;
              this.wander = 0.45;
              this.theta = random( TWO_PI );
              this.drag = 0.42;
              this.color = '#fff';
              this.x = x || 0.0;
              this.y = y || 0.0;
              this.vx = 0.0;
              this.vy = 0.0;
          },
          move: function() {
              this.x += this.vx;
              this.y += this.vy;
              this.vx *= this.drag;
              this.vy *= this.drag;
              this.theta += random( -0.5, 0.5 ) * this.wander;
              this.vx += sin( this.theta ) * 0.1;
              this.vy += cos( this.theta ) * 0.1;
              this.radius *= 0.96;
              this.alive = this.radius > 0.5;
          },
          draw: function( ctx ) {
              ctx.beginPath();
              ctx.arc( this.x, this.y, this.radius, 0, TWO_PI );
              ctx.fillStyle = this.color;
              ctx.fill();
          }
      };
      // ----------------------------------------
      // Example
      // ----------------------------------------
      var MAX_PARTICLES = 680;
      var COLOURS = [ '#24bad6', '#b5e7e2', '#1c1d14', '#1c0f04', '#140900', '#2b0c0c', '#292305' ];
      var particles = [];
      var pool = [];
      var demo = Sketch.create({
          container: document.getElementById( 'container' )
      });
      demo.setup = function() {
          // Set off some initial particles.
          var i, x, y;
          for ( i = 0; i < 20; i++ ) {
              x = ( demo.width * 0.5 ) + random( -100, 100 );
              y = ( demo.height * 0.5 ) + random( -100, 100 );
              demo.spawn( x, y );
          }
          setInterval(function() {
            var particle, theta, force, touch, max, i, j, n;
            for ( i = 0, n = 50; i < n; i++ ) {
                touch = 300, max = random( 1, 1 );
                for ( j = 0; j < max; j++ ) {
                  demo.spawn( random(2000), random(2000) );
                }
            }
            console.log('loop');
          }, 400);
      };


      demo.spawn = function( x, y ) {
          if ( particles.length >= MAX_PARTICLES )
              pool.push( particles.shift() );
          particle = pool.length ? pool.pop() : new Particle();
          particle.init( x, y, random( 5, 10 ) );
          particle.wander = random( 0.5, 2.0 );
          particle.color = random( COLOURS );
          particle.drag = random( 0.9, 1 );
          theta = random( TWO_PI );
          force = random( 2, 8 );
          particle.vx = sin( theta ) * force;
          particle.vy = cos( theta ) * force;
          particles.push( particle );
      };
      demo.update = function() {
          var i, particle;
          for ( i = particles.length - 1; i >= 0; i-- ) {
              particle = particles[i];
              if ( particle.alive ) particle.move();
              else pool.push( particles.splice( i, 1 )[0] );
          }
      };
      demo.draw = function() {
          demo.globalCompositeOperation  = 'lighter';
          for ( var i = particles.length - 1; i >= 0; i-- ) {
              particles[i].draw( demo );
          }

      };
      // demo.mousemove = function() {
      //     var particle, theta, force, touch, max, i, j, n;
      //     for ( i = 0, n = demo.touches.length; i < n; i++ ) {
      //         touch = demo.touches[i], max = random( 1, 4 );
      //         for ( j = 0; j < max; j++ ) {
      //           demo.spawn( touch.x, touch.y );
      //         }
      //     }
      // };
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

      antler.position.set(96, 75);
      antler.scale.set(1.3, 1.3);

      antler.rotation = .5;

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
