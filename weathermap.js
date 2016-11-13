var SCREENSIZEX = 900;	 // 900 / 360 = 2.5 pixel per degree			// size of screenX in pixels, i.e. width
var SCREENSIZEY = 450;	// 450 / 180 = 2.5	pixel per degree		// size of screenY in pixels, i.e. height
var midX = SCREENSIZEX/2;
var midY = SCREENSIZEY/2;
var pixelsPerLAT =  SCREENSIZEY / 180; // scale factor

//var symbolSize = 128; 		// the size of each symbol in pixels, implied a square sizze, so 64 means 64px X by 64px Y // can be a different size than tileszie, but then have to scale
var symbolSize = 64;
//var mapPath = "./img/wm/Cooridnates_900x450_Earth_EX_001.png";	// map image location or path  // NO GRID
var mapPath = "./img/wm/Cooridnates_900x450_Earth_land_vg_v2.png";	// map image location or path  // NO GRID




//var mapPath = "./img/wm/Cooridnates_900x450_Earth_EX_000.png";	// map image location or path  // 
var mapImage = new Image(); // map to image

var numbersPath = "./img/wm/Cooridnates_900x450_Earth_EX_2_av0.png";
var numbersImage = new Image();

var coordsCursorPath = "./img/la/X_Red_64_V00.png";
var coordsCursorImage = new Image();


var tileSize = 64; // the tilesize to draw the symbols in game, for incase symbols are a larger size than the tiles...

// geolocation data
var latitudeCount = 180;
var longitudeCount = 360;

// temperature drawing
var temperatureR;
var temperatureG;
var temperatureB;
var temperatureA;
var tempColor;
var gridOpacity;


// weather data
// for  360 x data and 180 y, so 360*180 = 64800 datapoints
var temperatures = [];
// makes a 2 d array in create temperatures function

// temps in celsius, points		//										RANGE
var TEMP_DANGERCOLD = -28;		// DANGER cold is below					 			-28 and below								MAGENTa						255, 0, 255
var TEMP_EXTREMECOLD = -21;		// EXTREMECOLD is between DANGERCOLD and VERYCOLD	-28 to -21									purple						128, 0, 255
var TEMP_VERYCOLD =  0;			// VERCOLD is between EXTREMECOLD and FREEZING		-21 to 0									blue						0, 0, 255
var TEMP_FREEZING = 0;			// FREEZING is 0 and below				 			0				
var TEMP_COLD = 7;				// cold is between FREEZING and COLD				0 to 7																	0, 128, 255
var TEMP_COOL = 15;				// cool is beteween COLD and TEMPERATe	 			8 to 15										cyan - or green-blue		0, 255, 255
var TEMP_TEMPERATE = 20;		// temperatee is between COOL and IDEAL 			16 to 20									light green					0, 255, 128
var TEMP_IDEAL = 25;			// ideal is between temperate and WARM 				21 to 25									green						0, 255, 0
var TEMP_WARM = 32;				// warm is between IDEAL and HOT					26 to 32									yellow						255, 255, 0
var TEMP_HOT = 37;				// HOT is between WARM and VERY HOT					33 to 37									Orange						255, 128, 0
var TEMP_VERYHOT = 54; // NUMB UNECES?			// VERY HOT is between hot and DANGERHOT  37 to 54 								ORANGE RED					255, 64, 0
var TEMP_DANGERHOT = 54	;		// TOO HOT is greater than very hot      			54 and above								RED							255, 0, 0
 


 
 
 
 
 
// user variables
//var mouseX = event.clientX;     // Get the horizontal coordinate
//var mouseY = event.clientY;     // Get the vertical coordinate
var mouseX;    // Get the horizontal coordinate
var mouseY;   // Get the vertical coordinate
//var mouseCoords = "X coords: " + x + ", Y coords: " + y;
var mouseCoords;

var playerSize = 0;
 var playerSizeMAX = 135;
var playerLat = 0;	// is 0 to 179		TODO: check if is north or south and convert to 0to90, right now 0 to 90 is north, 91 to 180 is south
var playerLon = 0;	// is 0 to 360		'' east or west
var playerCoords; 
 
var flipLat; 

 
 
// Initialize function
 var initialize = function() {
        // Set up the screen canvas
        var screen = document.createElement("canvas");
        screen.width = SCREENSIZEX;
        screen.height = SCREENSIZEY;
        screenCtx = screen.getContext("2d");
        document.getElementById("weathermap-js-container").appendChild(screen);
		
		
		// Setup images
		mapImage.src = mapPath;
		numbersImage.src = numbersPath;
		coordsCursorImage.src = coordsCursorPath;
		 
		 
		 // Setup data structures
		 createTemperatures();
		 setExampleTemperatures();
		 //setCurrentTemperatures(); // TODO
		// temperatures[0][0] = 1;
		// temperatures[0][1] = 2;							// set a specific index
		// console.log("Temperatures(0,0) = " + temperatures[0][0] );		// print a specific index
		// console.log("Temperatures(0,1) = " + temperatures[0][1] );
		 //printTemperatures();
		 //console.log("Temperatures(0,1) = " + temperatures[0][1] );
	
		 console.log("Initialized");

		 
    };
  
  
  
  
  // creating data structures
  function createTemperatures()
  {
	  for (var i=0; i< longitudeCount ;i++) {
		  temperatures[i] = [latitudeCount];
	  }
	  
	  
	  // initialize all to 1?
	  for (var k=0; k< longitudeCount; k++) {
		  for (var j = 0; j < latitudeCount; j++)
		  {
			  temperatures[k][j] = 1;
		  }
	  }
  
	  
	  
  };

    
  // sets based off latitude
  // if latidue 0 to 45 make like 0
  // if latidue 46 to 90, and 91 to 135 make like = 32
  // if latitude 136 to 179 set like 1
  // in reality y 179 to 90 is SOUTH
  // y 0 to 90 is NORTH
  // 
  function setExampleTemperatures()
  {
	  // initialize all to 1?
	  for (var i=0; i< longitudeCount; i++) {
		  for (var j = 0; j < latitudeCount; j++)
		  {
			  // southern pole
			  if (j <=45)
			  {
				  temperatures[i][j] = 2;		// 2 should be COLD
			  }
			  else if (j <=135)
			  {
				  temperatures[i][j] = 23;		// 23 should be ideal
			  }
			  else
			  {
				  temperatures[i][j] = -60;		// -6 should be VERYCOLD
			  }
		  }
	  }
  }
  
  
   
  // TODO: get temperatures for all coordinates from an api, or file?
  function setCurrentTemperatures()
  {
	  var curTempFromAPI = 0;
	  // initialize all to 1?
	  for (var i=0; i< longitudeCount; i++) {
		  for (var j = 0; j < latitudeCount; j++)
		  {
			  // api call here
			  // should be like
			  // curTempFromAPI = GetWeather(i,j).main.temp
			  temperatures[i][j] = curTempFromAPI;		// 2 should be COLD


		  }
	  }
  }
  
  
  

  // Console Log Prings
  function printTemperatures()
  {
	   for (var i=0;i< longitudeCount ;i++) {
		   for (var j = 0; j < latitudeCount; j++)
		   {
			   console.log("Temperatures(" +i +", "+j +") = " + temperatures[i][j]);
		   }
	  }
  }
  
  

  
  
  // Weather calculations functions TODO:
  function convertCelsiusToFarenheit()
  {
	  
  }
  // etc..
  

  
   // Rendering functions
  
  // drawing goes here 
  // current implementation only 'renders' once,
  // todo: ON value changes, call render again
  
  
  function render(time)
  {
	  //console.log("RENDER");
	  screenCtx.clearRect(0,0, screen.width, screen.height);	// clear canvas
	  
	 // renderImages(); // atm wasn't working, because onload not being called...  now is vvvvvv   , on cleanup possible redo this functino
	 	  
		/*   works, but only for one render
		  
		  mapImage.onload = function() {
		  screenCtx.globalAlpha = 1;
		  screenCtx.drawImage(mapImage,0,0);  
		  renderTemperatures();
		  renderGrid();
	  
		  
	  };
	  numbersImage.onload = function() {
		  screenCtx.globalAlpha = 1;
		  screenCtx.drawImage(numbersImage,0,0);  
	  };

         */
		 
		 
	
		  
	
		  screenCtx.globalAlpha = 1;
		  screenCtx.drawImage(mapImage,0,0);  
		  renderTemperatures();
		  renderGrid();
	  


		  screenCtx.globalAlpha = 1;
		  screenCtx.drawImage(numbersImage,0,0);  
 
	 // render grid
 
  };
  
  
  
  
  
  
  
  
  function renderFirst(time)
  {
	  //console.log("RENDER");
	  screenCtx.clearRect(0,0, screen.width, screen.height);	// clear canvas
	  
	 // renderImages(); // atm wasn't working, because onload not being called...  now is vvvvvv   , on cleanup possible redo this functino
	 	  

		  mapImage.onload = function() {
		  screenCtx.globalAlpha = 1;
		  screenCtx.drawImage(mapImage,0,0);  
		  renderTemperatures();
		  renderGrid();
	  
		  
	  };
	  numbersImage.onload = function() {
		  screenCtx.globalAlpha = 1;
		  screenCtx.drawImage(numbersImage,0,0);  
	  };


 
  };
  

  
  // update function, calculations go here
  function update(time)
  {
	  //console.log("UPDATE");
  };
  

  
    // render bg map images
  function renderImages()
  {
	  screenCtx.globalAlpha = 1.0;
	  screenCtx.drawImage(mapImage,0,0);
	  screenCtx.globalAlpha = 0.5;
	  screenCtx.drawImage(numbersImage,0,0);
  };
  // drawing goes here
  function renderGrid()
  {
	  // Set width and colors
	  screenCtx.lineWidth = 4;
     // screenCtx.strokeStyle = '#ff0000';
	  //screenCTX.stroke-opacity :0.3; // CSS code
	  screenCtx.strokeStyle = 'rgba(255,0,0,.9)';
	  screenCtx.fillStyle = 'rgba(255,0,0,0.9)';
	  
	  screenCtx.beginPath();
	  screenCtx.moveTo(0, midY);
	  screenCtx.lineTo (SCREENSIZEX, midY); // 
	  screenCtx.stroke();
	  
	  screenCtx.beginPath();
	  screenCtx.moveTo(midX, 0);
	  screenCtx.lineTo (midX, SCREENSIZEY); // 
	  screenCtx.stroke();
	  
	  
	  

  };
  
  
 /* 
  // temps in celsius, points		//										RANGE
var TEMP_DANGERCOLD = -28;		// DANGER cold is below					 			-28 and below								MAGENTa						255, 0, 255
var TEMP_EXTREMECOLD = -21;		// EXTREMECOLD is between DANGERCOLD and VERYCOLD	-28 to -21									purple						128, 0, 255
var TEMP_VERYCOLD =  0;			// VERCOLD is between EXTREMECOLD and FREEZING		-21 to 0									blue						0, 0, 255
var TEMP_FREEZING = 0;			// FREEZING is 0 and below				 			0				
var TEMP_COLD = 7;				// cold is between FREEZING and COLD				0 to 7																	0, 128, 255
var TEMP_COOL = 15;				// cool is beteween COLD and TEMPERATe	 			8 to 15										cyan - or green-blue		0, 255, 255
var TEMP_TEMPERATE = 20;		// temperatee is between COOL and IDEAL 			16 to 20									light green					0, 255, 128
var TEMP_IDEAL = 25;			// ideal is between temperate and WARM 				21 to 25									green						0, 255, 0
var TEMP_WARM = 32;				// warm is between IDEAL and HOT					26 to 32									yellow						255, 255, 0
var TEMP_HOT = 37;				// HOT is between WARM and VERY HOT					33 to 37									Orange						255, 128, 0
var TEMP_VERYHOT = 54			// VERY HOT is between hot and DANGERHOT 			37 to 54 									ORANGE RED					255, 64, 0
var TEMP_DANGERHOT = 54			// TOO HOT is greater than very hot      			54 and above								RED							255, 0, 0
*/

// EXPENSIVE !!!!
  function renderTemperatures()
  {	 
	temperatureA = .5;
	screenCtx.lineWidth = pixelsPerLAT;

	var tempCur;
	  for (var i=0;i< longitudeCount ;i++) {


		  for (var j = 0; j < latitudeCount; j++)
		  {
			  screenCtx.beginPath();
			  screenCtx.moveTo(i*pixelsPerLAT, j*pixelsPerLAT - pixelsPerLAT);
			  tempCur = temperatures[i][j];
			  // if implementation starting from hot temperatures ... probably not ideal.... start at freezing and handle cases that way, i.e. start in middle so less chance of taking MORE case checks
			  if(tempCur >= TEMP_DANGERHOT)
			  {
				  temperatureR =  255;
				  temperatureG = 0;
				  temperatureB = 0;
			  }
			  else if (tempCur >= TEMP_HOT)
			  {
				  temperatureR =  255;
				  temperatureG = 64;
				  temperatureB = 0;
			  }
			  else if (tempCur >= TEMP_WARM)
			  {
				  temperatureR =  255;
				  temperatureG = 128;
				  temperatureB = 0;
			  }
			  else if (tempCur >= TEMP_IDEAL)
			  {
				  temperatureR =  255;
				  temperatureG = 255;
				  temperatureB = 0;
			  }
			  else if (tempCur >= TEMP_TEMPERATE)
			  {
				  temperatureR =  0;
				  temperatureG = 255;
				  temperatureB = 0;
			  }
			  else if (tempCur >= TEMP_COOL)
			  {
				  temperatureR =  0;
				  temperatureG = 255;
				  temperatureB = 128;
			  }
			  else if (tempCur >= TEMP_COLD)
			  {
				  temperatureR =  0;
				  temperatureG = 255;
				  temperatureB = 255;
			  }
			  else if (tempCur >= TEMP_FREEZING)
			  {
				  temperatureR =  0;
				  temperatureG = 128;
				  temperatureB = 255;
			  }
			  else if (tempCur >= TEMP_EXTREMECOLD)
			  {
				  temperatureR =  0;
				  temperatureG = 0;
				  temperatureB = 255;
			  }
			  else if (tempCur >= TEMP_DANGERCOLD)
			  {
				  temperatureR =  128;
				  temperatureG = 0;
				  temperatureB = 255;
			  }
			  else
			  {
				  temperatureR =  255;
				  temperatureG = 0;
				  temperatureB = 255;
			  }
			  
			  // change to better stroke style
			  tempColor = "rgba("+ temperatureR +","+temperatureG+","+temperatureB +","+temperatureA + ")";
			  //screenCtx.strokeStyle = 'rgba(255,0,0,0.2)';
			  screenCtx.strokeStyle = tempColor;
			  screenCtx.lineTo (i*pixelsPerLAT, j*pixelsPerLAT); // 


		  screenCtx.stroke();

		  }

	  }
  };
  
  
  function renderPlayerCoords()
  {
	  /* not working
	  coordsCursorImage.onload = function() {
		  screenCtx.globalAlpha = 1;
		  screenCtx.drawImage(coordsCursorImage, playerLon*pixelsPerLAT,playerLat*pixelsPerLAT);  
	  };
	  */
	  //render();
	  screenCtx.beginPath();
    screenCtx.arc(playerLon*pixelsPerLAT, playerLat*pixelsPerLAT, playerSize, 0, Math.PI * 2);
    screenCtx.fill();
	// currently just draws over.. need to rerender.... but is expensive atm

  };
  
  
  function increasePlayerDrawSize()
  {
	  if(playerSize < playerSizeMAX)
	  {
		  playerSize ++;
	  }
	  else
	  {
		  playerSize = 0;
	  }
  }
  
  
  
  
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
			console.log("Left key down");
			if(playerLon >=1)
			{
				playerLon -=1;
			}
			
			playerCoords = "LatitudeRAW: " + playerLat + ", LongitudeRAW: " + playerLon;
			console.log(playerCoords);
			increasePlayerDrawSize();
			renderPlayerCoords();
		}
        event.preventDefault();
        break;
      case 38: // up
        if(true)
		{
			console.log("UP key down");
			if(playerLat >=1)
			{
				playerLat -=1;
			}
			playerCoords = "LatitudeRAW: " + playerLat + ", LongitudeRAW: " + playerLon;
			console.log(playerCoords);
			//renderPlayerCoords();
		}
        event.preventDefault();
        break;
      case 39: // right
        if(true)
		{
			console.log("Right key down");
			if(playerLon <=(longitudeCount-1))
			{
				playerLon +=1;
			}
			playerCoords = "LatitudeRAW: " + playerLat + ", LongitudeRAW: " + playerLon;
			//renderPlayerCoords();
			//render();
		}
			
			
        event.preventDefault();
        break;
      case 40: // down
        if(true)
		{
			console.log("Down key down");
			if(playerLat <=(latitudeCount-1))
			{
				playerLat +=1;
			}
			playerCoords = "LatitudeRAW: " + playerLat + ", LongitudeRAW: " + playerLon;
			//renderPlayerCoords();
			//renderFirst();
		}
        event.preventDefault();
        break;
    }
	
  }
  
  window.onclick = function(event)
  {
	  
	  
  }
  update(0);
  renderFirst(0);
  //render(0);
  
  

  
};