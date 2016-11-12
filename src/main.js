//var tilemap = require('./tilemap.js');
//var tilemapData = require('../tilemaps/example_tilemap.js');
//var CircuitSymbols = require('./circuitSymbols.js'); // the class, the one for ... 
//var CircuitData = require('./circuitData.js');		// the class, the one for caling the constructor
//var circuitdata;									// the current data

var SCREENSIZEX = 640;				// size of screenX in pixels, i.e. width
var SCREENSIZEY = 640;				// size of screenY in pixels, i.e. height
var player;							// the player object to draw.... CURRENTLY BAD.. just draws circle


//var symbolSize = 128; 		// the size of each symbol in pixels, implied a square sizze, so 64 means 64px X by 64px Y
var symbolSize = 64;
var symbolsPath = "./img/SC/ELEC/Electrical_1024_V001a4_03.png"; 	// the path where the symbols tileset is found

var tileSize = 64; // the tilesize to draw the symbols in game, for incase symbols are a larger size than the tiles...

/*
var circuitOffsetsX = 	[0,64,128,192, 256,320,384,448, 0,64,128,192, 256,320,384,448, 0,64,128,192, 256,320,384,448, 0,64,128,192, 256,320,384,448,
						 0,64,128,192, 256,320,384,448, 0,64,128,192, 256,320,384,448, 0,64,128,192, 256,320,384,448, 0,64,128,192, 256,320,384,448 ];
						 
var circuitOffsetsY = 	[0,0,0,0, 0,0,0,0, 64,64,64,64, 64,64,64,64, 128,128,128,128, 128,128,128,128, 192,192,192,192, 192,192,192,192,
						256,256,256,256, 256,256,256,256 ,320,320,320,320, 320,320,320,320, 384,384,384,384, 384,384,384,384, 448,448,448,448, 448,448,448,448];
*/

// 1000 for resistor means 1000 ohm resistance
// .001 for capacitor means 1 miliFarad
// 12 for voltage source means 12 Volts
// 0 for wire means ideal wire, i.e. no loss calculated
// 0 for empty, means ignore this tile really....

// 8x8 data.....
//var circuitTypes = 			[0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,];
//var circuitOrientations =	[0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,];
//var circuitValues = 		[0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,];


// Initialize function
 var initialize = function() {
        // Set up the screen canvas
        var screen = document.createElement("canvas");
        screen.width = SCREENSIZEX;
        screen.height = SCREENSIZEY;
        screenCtx = screen.getContext("2d");
        document.getElementById("weathermap-js-container").appendChild(screen);

        //  TODO: Set up the back buffer
       // backBuffer = document.createElement("canvas");
       // backBuffer.width = SCREENSIZEX;
        //backBuffer.height = SCREENSIZEY;
        //backBufferCtx = backBuffer.getContext("2d");
        // Create the player ...
         player = {x: 1, y: 2};
		 
		 
		 
		 
		 // Circuit Data 
		 //circuitData = new CircuitData(symbolsPath, symbolSize, tileSize, circuitX, circuitY, circuitTypes, circuitOrientations, circuitValues);		// create the circuit data object
		 //circuitData.printData();
		 
		 //printCircuitTypes();
		 //printCircuitOrientations();
		 //printCircuitValues();
		 //printCircuitData();
		 
    };
  
    
// Debug Functions
// DO NOT USE THESE, USE circuitData.printData(); to get the circuit data that is in the object
//var printCircuitTypes = function()
//{
//	for (var i = 0; i < circuitSize; i ++)
//	{
//		console.log("CT["+i+"] = " + circuitTypes[i]);
//	}
//};	


	



// Rendering functions
  // function to draw player
  function renderPlayer() {
    screenCtx.beginPath();
    screenCtx.arc(player.x * 64 + 32, player.y * 64 + 32, 30, 0, Math.PI * 2);
    screenCtx.fill();
  }

  
  // drawing goes here
  function render(time)
  {
	  //console.log("RENDER");
	 // renderPlayer();
	// screenCtx.clearRect(0,0, screen.width, screen.height);
	  //circuitData.render(screenCtx);
  };
  
  function renderOnce()
  {
	  	 // circuitData.render(screenCtx);
  }
  
  // update function, calculations go gere
  function update(time)
  {
	  //console.log("UPDATE");
	  // calculation
  };
  

// Wait for the window to load to begin the simulation sequence
window.onload = function() {
	var gameTime = 0
	initialize();
  
  // move to UPDATE ?
  // Event handler for key events
  window.onkeydown = function(event) {
    switch(event.keyCode) {
      case 37: // left 
        if(true)
          player.x -= 1;
        event.preventDefault();
        break;
      case 38: // up
        if(true)
          player.y -= 1;
        event.preventDefault();
        break;
      case 39: // right
        if(true)
          player.x += 1;
        event.preventDefault();
        break;
      case 40: // down
        if(true)
          player.y += 1;
        event.preventDefault();
        break;
    }
	
	// MOVE TO RENDER
    // Redraw the map & player
   // tilemap.render(screenCtx);
    //renderPlayer();
  }
  
  // function to loop 
    function loop(newTime) {
    var elapsedTime = (newTime - gameTime) / 1000;
    gameTime = newTime;
	//console.log ("loop:gameTime = " + gameTime);
	//console.log("loop:elapsedTime = " + elapsedTime);
    update(elapsedTime);
    render(elapsedTime);
    window.requestAnimationFrame(loop);
  }
 // renderOnce();
  window.requestAnimationFrame(loop);
  
};