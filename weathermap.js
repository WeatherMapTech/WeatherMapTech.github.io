var SCREENSIZEX = 900;	 // 900 / 360 = 2.5 pixel per degree			// size of screenX in pixels, i.e. width
var SCREENSIZEY = 450;	// 450 / 180 = 2.5	pixel per degree		// size of screenY in pixels, i.e. height
var player;							// the player object to draw.... TO DO: with pointer


//var symbolSize = 128; 		// the size of each symbol in pixels, implied a square sizze, so 64 means 64px X by 64px Y // can be a different size than tileszie, but then have to scale
var symbolSize = 64;
var mapPath = "./img/wm/Cooridnates_900x450_Earth_EX_000.png";	// map image location or path
var mapImage = new Image(); // map to image
var tileSize = 64; // the tilesize to draw the symbols in game, for incase symbols are a larger size than the tiles...



// Initialize function
 var initialize = function() {
        // Set up the screen canvas
        var screen = document.createElement("canvas");
        screen.width = SCREENSIZEX;
        screen.height = SCREENSIZEY;
        screenCtx = screen.getContext("2d");
        document.getElementById("weathermap-js-container").appendChild(screen);
		mapImage.src = mapPath;
        //  TODO: Set up the back buffer if necessary
       // backBuffer = document.createElement("canvas");
       // backBuffer.width = SCREENSIZEX;
        //backBuffer.height = SCREENSIZEY;
        //backBufferCtx = backBuffer.getContext("2d");
        // TODO Create the player or user selection...
         player = {x: 1, y: 2};
		 
		 
	
		 console.log("Initialized");
		 

		 
    };
  
   // Rendering functions
  // function to draw player TODO: !!!
  function renderPlayer() {
    screenCtx.beginPath();
   // screenCtx.arc(player.x * 64 + 32, player.y * 64 + 32, 30, 0, Math.PI * 2); // draws a circle
    screenCtx.fill();
  }

  
  // drawing goes here
  function render(time)
  {
	  //console.log("RENDER");
	  screenCtx.clearRect(0,0, screen.width, screen.height);	// clear canvas
	  
	  // render bg map image
	  screenCtx.drawImage(mapImage,0,0);
	  
	  // renderPlayer();

  };
  

  
  // update function, calculations go here
  function update(time)
  {
	  //console.log("UPDATE");
  };
  

// Wait for the window to load to begin the simulation sequence
window.onload = function() {
	var gameTime = 0
	initialize();
	
  // move to update? .... nvm seems fine
  // Event handler for key events
  window.onkeydown = function(event) {
    switch(event.keyCode) {
      case 37: // left 
        if(true)
		{
			player.x -= 1;
			console.log("Left key down");
		}
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
  window.requestAnimationFrame(loop);
  
};