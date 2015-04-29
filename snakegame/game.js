var tiles = new Array(45);
		for (var k = 0; k < 45; k++)
		{
			tiles[k] = new Array(45);
		}
		
		function create_board(){
			
			var board = document.getElementById("snakegame");
			var tileNew = document.createElement('div');
			tileNew.className = "tiles";
			var tileToAppend;
			
			
			for( var i = 2; i<42;i++)
			{
				for(var j = 2; j<42; j++)
				{
					if( (i*1+j*1) %2 === 0)
					{	
						tileToAppend = tileNew.cloneNode(true);
						tileToAppend.id = "tile_"+i+"_"+j+"";
						tileToAppend.style.backgroundColor = "rgba(215,215,215,1.00)";
						board.appendChild(tileToAppend);
						
						//board.innerHTML += "<div id = \"tile_"+i+"_"+j+"\" class = \"tiles\" style = \"background-color:rgba(215,215,215,1.00);\"></div>";
					
					}
					
					if( (i*1+j*1) %2 === 1)
					{
						tileToAppend = tileNew.cloneNode(true);
						tileToAppend.id = "tile_"+i+"_"+j+"";
						tileToAppend.style.backgroundColor = "rgba(205,205,205,1.00)";
						board.appendChild(tileToAppend);
						
						//board.innerHTML += "<div id = \"tile_"+i+"_"+j+"\" class = \"tiles\" style = \"background-color:rgba(205,205,205,1.00);\"></div>";
						
					}
				
				}
				
				
			}
			
		}
		
		
		
		function get_tiles()
		{
			for(var i = 2; i<42; i++)
			{
				for(var j = 2; j<42; j++)
				{
					tiles[j][i] = document.getElementById("tile_"+i+"_"+j+"");
					
				}
			}
			
			
			
		}
		
		
		
		
		
		var snake = {
			xBody : ["9", "10", "11" , "12"] ,
			yBody : ["9" , "9" , "9", "9"] , 
			speed : 50

			
		};
		
		var length = 3 ;
		var map = 1;
		
		var xPoint = Math.round(Math.random()*20000000 % 39 + 2);
		var yPoint = Math.round(Math.random()*20000000 % 39 + 2);
							
		var pause_game = 0;
		var last_direction = "R";
		
		var stopgame ;
		var wallColor ; 
		var difficulty = 1;
		var score = 0;
		var requiredScore;
		var lives = 3;
		var okCoord = 1;
		var restart = 0;
		var canShowPauseMenu = 3;
		audiotrack = 1;
		
		function game_manager()
		{
			
				
			if( (snake.xBody[0]*1 + snake.yBody[0]*1)%2 === 0)
			{
				tiles[ snake.xBody[0] ][ snake.yBody[0] ].setAttribute("style" , "height: 15px; width: 15px; background-color:rgba(215,215,215,1.00);; float:left; padding:0px; margin:0px;" );				
			}
			
			else
			
			{
				tiles[ snake.xBody[0] ][ snake.yBody[0] ].setAttribute("style" , "height: 15px; width: 15px; background-color:rgba(205,205,205,1.00);; float:left; padding:0px; margin:0px;" );
				
			}
			
				
			if(direction === 'L')
			{
				//snake.xCoordHead--;
				
				snake.xBody.push(snake.xBody[length]*1 -1);
				snake.yBody.push(snake.yBody[length]*1)
				
				snake.xBody.shift();
				snake.yBody.shift();
				
				last_direction = "L";
				
				
				if(snake.xBody[length] == 1)
				{	
					snake.xBody[length] = 41;
		
				}
				
			
				
				
				
			}
			
			if(direction === 'R')
			{
				//snake.xCoordHead++;
				
				snake.xBody.push(snake.xBody[length]*1 +1);
				snake.yBody.push(snake.yBody[length]*1)
				snake.xBody.shift();
				snake.yBody.shift();
				
				last_direction = "R";
				
				if(snake.xBody[length] == 42)
				{	
					snake.xBody[length] = 2;
		
				}
				
			}
			
			if(direction === 'U')
			{
				//snake.yCoordHead--;
				
				snake.xBody.push(snake.xBody[length]*1)
				snake.yBody.push(snake.yBody[length]*1 -1);
				snake.xBody.shift();
				snake.yBody.shift();
				
				last_direction = "U";
				
				if(snake.yBody[length] == 1)
				{
					if(gameMode == "rush")
					{
						
						snake.yBody[length] = 37;
					
					}	
					
					else{
						snake.yBody[length] = 41;	
					}
					
		
				}
				
			}
			
			if(direction === 'D')
			{
				//snake.yCoordHead++;
				snake.xBody.push(snake.xBody[length]*1)
				snake.yBody.push(snake.yBody[length]*1 +1);
				snake.xBody.shift();
				snake.yBody.shift();
				
				last_direction = "D";
				
				if (gameMode == "rush")
				{
					if(snake.yBody[length] == 38) 
					{
						snake.yBody[length] = 2;
					}
					
				}
				
				else
				{
					
					if(snake.yBody[length] == 42)
					{	
						snake.yBody[length] = 2;
					}	
					
				}
				
				
			}
			
			
			if(map !== 1)
			{
				
				if (tiles[ snake.xBody[length] ][ snake.yBody[length ] ].style.backgroundColor === wallColor.style.backgroundColor)
				{
					if(requiredScore > 0)
					{
						if(lives>1)
						{
							lives--;
							resetGame();
							stopGame();
							direction = "R";
							setStartingPosition();
							setTimeout(function(){startCampaign(difficulty);} , 50);
							direction = "R";
							
						}
						
						else
						{
							show_menu(8);
							canShowPauseMenu = 3;
							game_over = 1;
							stopGame();
							drawMap(map);
							
						}
						
					}
					
					else
					{
						show_menu(8);
						canShowPauseMenu = 3;
						game_over = 1;
						stopGame();
						drawMap(map);
					}
				}
				
			}
			
			for ( var i = 0 ; i <= length ; i++)
			{
				tiles[ snake.xBody[i] ][ snake.yBody[i] ].setAttribute("style" , "height: 13px; width: 13px; background-color:rgba(160,160,160,1.00); z-index = 2; float:left; padding:0px; margin:0px; border: 1px solid rgba(50,50,50,1.00);" );
				
			}
			
			
			//Culoare food
			tiles[xPoint][yPoint].setAttribute("style" , "height: 15px; width: 15px; background-color:rgba(100,100,100,1.00); float:left; padding:0px; margin:0px;" );
			
			//background-color:rgba(150,150,150,1.00); float:left; padding:0px; margin:0px; border: 3px solid rgba(100,100,100,1.00)" );
			
			if(snake.xBody[length] == xPoint && snake.yBody[length] == yPoint)
			{
				//stergere food !important
				tiles[xPoint][yPoint].setAttribute("style" , "height: 13px; width: 13px; background-color:rgba(160,160,160,1.00); float:left; padding:0px; margin:0px; border: 1px solid rgba(50,50,50,1.00);" );
				snake.xBody.unshift(snake.xBody[length]);
				snake.yBody.unshift(snake.yBody[length]);
				length++;
				//tim = 4;
				tim = 7;
				
				if(gameMode !== "rush")
				{	
					score++;
				}
				
				else{
					
					score+=multiplierRush;
					document.getElementById("timer").style.backgroundColor = "rgba(100,0,255,0.15)";
						
				}
				if(gameMode === "rush")
				{	
					
					foodCounterRush++;
					
					var progres = document.getElementById("progressSquare").cloneNode(true);
					progres.style.display = "block";
					
					document.getElementById("rushLevelCounterBottom").appendChild(progres);
					
					if(foodCounterRush == 3)
					{
						if (multiplierRush <3)
						{	
							multiplierRush++;
						}
						
						foodCounterRush = 0;
						
					}
					
					

					
				}
			
				
				if(map !==1)
				{
					do
					{
						xPoint = Math.round(Math.random()*20000000 % 39 + 2);
						yPoint = Math.round(Math.random()*20000000 % 39 + 2);
					}while(tiles[xPoint][yPoint].style.backgroundColor == wallColor.style.backgroundColor);
				}
				
				else
				{	
					if(gameMode = "rush")
					{
						xPoint = Math.round(Math.random()*20000000 % 34 + 2);
						yPoint = Math.round(Math.random()*20000000 % 34 + 2);
						
					}
					
					else
					{	
						xPoint = Math.round(Math.random()*20000000 % 39 + 2);
						yPoint = Math.round(Math.random()*20000000 % 39 + 2);	
					}
					
				}
				
				tiles[xPoint][yPoint].setAttribute("style" , "height: 15px; width: 15px; background-color:rgba(160,160,160,1.00); float:left; padding:0px; margin:0px;" );
				
			}
			
			
			
			for(i = 1 ; i< length ; i++)
			{
				if(snake.xBody[length] == snake.xBody[i] && snake.yBody[length] == snake.yBody[i])
				{
					if(requiredScore > 0)
					{
						if(lives>1)
						{
							lives--;
							resetGame();
							stopGame();
							direction = "R";
							setTimeout(function(){startCampaign(difficulty);} , 200);
							direction = "R";
						}
						
						else
						{
							show_menu(8);
							canShowPauseMenu = 3;
							game_over = 1;
							stopGame();
							drawMap(map);
							
						}
						
					}
					
					else
					{
						show_menu(8);
						canShowPauseMenu = 3;
						game_over = 1;
						stopGame();
						drawMap(map);
					}
					
				}
			}
			
			if(requiredScore >0)
			{
				
				document.getElementById("scoreboard").innerHTML = "Score : " + score + " / " + requiredScore + " &nbsp &nbsp &nbsp Lives : " + lives;
				
				if(score == requiredScore)
				{
					restart = 0;
					map++;
					stopGame();
					resetGame();
					score = 0;
					setStartingPosition();
					setTimeout(function(){startCampaign(difficulty);} , 200);
					
					if(map == 6)
					{
						document.getElementById("header_game_over_menu").style.backgroundImage = "url(images/You-Win-.png)";
						stopGame();
						resetGame();
						show_menu(8);
						canShowPauseMenu = 3;
						
						
					}
	
				}
				
			}
			
			else
			{
				document.getElementById("scoreboard").innerHTML = "Score : " + score;
			}
			
			
			document.getElementById("console_text").innerHTML = "Snake X : " + snake.xBody + "<br>Snake Y : " + snake.yBody + "<br><br> Length : " + length + " Map : " + map;
				
			
		}
		
		function drawMap(map)
		{
				
			
				if (map === 2)
				{
					for(var i = 2 ;i<42 ; i++)
					{
						tiles[2][i].style.backgroundColor = "#4B4B4B";
						tiles[41][i].style.backgroundColor = "#4B4B4B";
						tiles[i][2].style.backgroundColor = "#4B4B4B";
						tiles[i][41].style.backgroundColor = "#4B4B4B";
						
						
						
					}
					
					wallColor = tiles[2][3];
				
				}
				
				
				if (map === 3)
				{
					//vertical
					for( var i = 2 ; i<=18; i++)
					{
						tiles[2][i].style.backgroundColor = "#4B4B4B";
						tiles[41][i].style.backgroundColor = "#4B4B4B";
						
						tiles[i][2].style.backgroundColor = "#4B4B4B";
						tiles[i][41].style.backgroundColor = "#4B4B4B";

					}


					
					for( var i = 25 ; i<=41; i++)
					{
						tiles[2][i].style.backgroundColor = "#4B4B4B";
						tiles[41][i].style.backgroundColor = "#4B4B4B";
						
						
						tiles[i][2].style.backgroundColor = "#4B4B4B";
						tiles[i][41].style.backgroundColor = "#4B4B4B";

					}
					
					for( var i = 3 ; i<=16; i++)
					{
						
						tiles[i][16].style.backgroundColor = "#4B4B4B";
						tiles[i][27].style.backgroundColor = "#4B4B4B";
						
						
						
					}
					
					for( var i = 27 ; i<=40; i++)
					{
						
						tiles[i][16].style.backgroundColor = "#4B4B4B";
						tiles[i][27].style.backgroundColor = "#4B4B4B";
						
					}
					
					tiles[16][3].style.backgroundColor = "#4B4B4B";
					tiles[27][3].style.backgroundColor = "#4B4B4B";
					tiles[16][4].style.backgroundColor = "#4B4B4B";
					tiles[27][4].style.backgroundColor = "#4B4B4B";
					tiles[16][5].style.backgroundColor = "#4B4B4B";
					tiles[27][5].style.backgroundColor = "#4B4B4B";
					tiles[16][6].style.backgroundColor = "#4B4B4B";
					tiles[27][6].style.backgroundColor = "#4B4B4B";
					
					tiles[16][12].style.backgroundColor = "#4B4B4B";
					tiles[27][12].style.backgroundColor = "#4B4B4B";
					tiles[16][13].style.backgroundColor = "#4B4B4B";
					tiles[27][13].style.backgroundColor = "#4B4B4B";
					tiles[16][14].style.backgroundColor = "#4B4B4B";
					tiles[27][14].style.backgroundColor = "#4B4B4B";
					tiles[16][15].style.backgroundColor = "#4B4B4B";
					tiles[27][15].style.backgroundColor = "#4B4B4B";
					
					tiles[16][28].style.backgroundColor = "#4B4B4B";
					tiles[27][28].style.backgroundColor = "#4B4B4B";
					tiles[16][29].style.backgroundColor = "#4B4B4B";
					tiles[27][29].style.backgroundColor = "#4B4B4B";
					tiles[16][30].style.backgroundColor = "#4B4B4B";
					tiles[27][30].style.backgroundColor = "#4B4B4B";
					tiles[16][31].style.backgroundColor = "#4B4B4B";
					tiles[27][31].style.backgroundColor = "#4B4B4B";
					
					tiles[16][37].style.backgroundColor = "#4B4B4B";
					tiles[27][37].style.backgroundColor = "#4B4B4B";
					tiles[16][38].style.backgroundColor = "#4B4B4B";
					tiles[27][38].style.backgroundColor = "#4B4B4B";
					tiles[16][39].style.backgroundColor = "#4B4B4B";
					tiles[27][39].style.backgroundColor = "#4B4B4B";
					tiles[16][40].style.backgroundColor = "#4B4B4B";
					tiles[27][40].style.backgroundColor = "#4B4B4B";
					
					wallColor = tiles[27][40];	
								
				
				}
				
				if (map === 4)
				{
					
					for(i = 2 ; i<=16 ; i++)
					{
						tiles[i][2].style.backgroundColor = "#4B4B4B";
						tiles[i][41].style.backgroundColor = "#4B4B4B";
						
						tiles[2][i].style.backgroundColor = "#4B4B4B";
						tiles[41][i].style.backgroundColor = "#4B4B4B";
					}
					
					for(i = 27; i<=41 ; i++)
					{
						
						tiles[i][2].style.backgroundColor = "#4B4B4B";
						tiles[i][41].style.backgroundColor = "#4B4B4B";
						
						tiles[2][i].style.backgroundColor = "#4B4B4B";
						tiles[41][i].style.backgroundColor = "#4B4B4B";
						
					}
					
					
					for(i = 3; i<=11 ; i++)
					{
						
						tiles[i][8].style.backgroundColor = "#4B4B4B";
						tiles[i][35].style.backgroundColor = "#4B4B4B";
						
					}
					
					
					for(i = 32; i<=40 ; i++)
					{
						
						tiles[i][8].style.backgroundColor = "#4B4B4B";
						tiles[i][35].style.backgroundColor = "#4B4B4B";
						
					}
		
					tiles[21][21].style.backgroundColor = "#4B4B4B";
					tiles[21][22].style.backgroundColor = "#4B4B4B";
					tiles[22][21].style.backgroundColor = "#4B4B4B";
					tiles[22][22].style.backgroundColor = "#4B4B4B";
					
					
					
					var j = 29;
					
					for(i = 14; i<=29 ; i++)
					{
						
						tiles[i][i].style.backgroundColor = "#4B4B4B";
						tiles[i][j].style.backgroundColor = "#4B4B4B";
						
						j--;
						
					
					}
					
					wallColor = tiles[2][2];
						
				}
				
				if(map === 5)
				{
					for(i = 2 ; i<=16 ; i++)
					{
						tiles[2][i].style.backgroundColor = "#4B4B4B"
						tiles[41][i].style.backgroundColor = "#4B4B4B"
						
					}
					
					for(i = 22 ; i<=41 ; i++)
					{
						tiles[2][i].style.backgroundColor = "#4B4B4B"
						tiles[41][i].style.backgroundColor = "#4B4B4B"
						
					}
					
					//pi
					
					for (i = 14 ; i<=29 ; i++)
					{
						tiles[i][5].style.backgroundColor = "#4B4B4B";
					}
					
					for(i = 6 ; i<=13 ; i++)
					{
						tiles[18][i].style.backgroundColor = "#4B4B4B";
						tiles[25][i].style.backgroundColor = "#4B4B4B";
						
					}
					
					tiles[18][14].style.backgroundColor = "#4B4B4B";
					tiles[18][15].style.backgroundColor = "#4B4B4B";
					tiles[18][16].style.backgroundColor = "#4B4B4B";
					
					tiles[26][14].style.backgroundColor = "#4B4B4B";
					tiles[26][15].style.backgroundColor = "#4B4B4B";
					tiles[26][16].style.backgroundColor = "#4B4B4B";
					
					//sigma
					
					for(i = 15 ; i<=27 ; i++)
					{
						tiles[i][22].style.backgroundColor = "#4B4B4B";
						tiles[i][38].style.backgroundColor = "#4B4B4B";	
					}
					
					var k = 23;
					var j = 37;
					for (i =16 ; i<=23 ; i++)
					{
						tiles[i][j].style.backgroundColor = "#4B4B4B";
						tiles[i][k].style.backgroundColor = "#4B4B4B";
						
						k++;
						j--;	
						
					}
					
					tiles[17][23].style.backgroundColor = "#4B4B4B";
					tiles[17][37].style.backgroundColor = "#4B4B4B";
					
					tiles[27][23].style.backgroundColor = "#4B4B4B";
					tiles[27][24].style.backgroundColor = "#4B4B4B";	
					tiles[27][36].style.backgroundColor = "#4B4B4B";
					tiles[27][37].style.backgroundColor = "#4B4B4B";
					
					//tiles[22][30].style.backgroundColor = "#4B4B4B";
								
					wallColor = tiles[2][2];
					
				}
	
		}
		
		
		
		
		
		
		
		//var myVar = setInterval(function(){myTimer()}, 1000;
		//clearInterval(myVar);
		
		function startQuickPlay()
		{
			gameMode = "quick";
			stopgame = 0;
			canShowPauseMenu = 1;
			drawMap(map);
			requiredScore  = -1;
			stopgame = window.setInterval(function(){game_manager();}, snake.speed);
			
		}
		
		function startCampaign(diff)
		{
			
			canShowPauseMenu = 1;
			gameMode = "campaign";
			
			switch(diff)
			{
				case 1 :
				snake.speed = 75;
				requiredScore  = 10;
				difficulty = 1;
				break;
				
				case 2 :
				snake.speed = 75;
				requiredScore  = 15;
				difficulty = 2;
				break;
				
				case 3 :
				snake.speed = 50;
				requiredScore  = 10;
				difficulty = 3;
				break;
				
				case 4 :
				snake.speed = 50;
				requiredScore  = 20;
				lives = 1;
				difficulty = 4;
				break;
								
			}
			stopgame = 0;
			hide_menu(6);
			drawMap(map);
			
			stopgame = window.setInterval(function(){game_manager();}, snake.speed);
			
			
		}
		
		
		//var tim = 1*4;
		var tim = 1*7;
		var gameMode;
		var multiplierRush = 1;
		var foodCounterRush = 0;
		
		function startRush(){
			
			gameMode = "rush";
			stopgame = 0;
			canShowPauseMenu = 1;
			document.getElementById("timer").style.display = "block";
			snake.speed = 40;
			stopgame = window.setInterval(function(){game_manager();}, snake.speed);	
			timerStopVar = window.setInterval(function(){timer();} , 100);
			document.getElementById("scoreboard").style.visibility = "visible";
			
			
		}
		
		function timer(){
			
			if(tim > 0)
			{

				tim = 1*tim - 1*0.1;
				tim = Math.round(tim*10)/10;
				tim = tim.toFixed(1);
				document.getElementById("timer").innerHTML = tim;
				document.getElementById("timer").style.backgroundColor = "rgba(51,0,255,0.1)"
				
				if(tim < 1 && tim >= 0)
				{	
					document.getElementById("timer").style.color = "rgba(204,0,0,0.4)";
					
				}
				
				else{
					
					document.getElementById("timer").style.color = "rgba(102,102,102,0.4)";
					
				}
			}
			
			else{
				
				document.getElementById("timer").style.backgroundColor = "rgba(255,0,0,0.1)"
				multiplierRush = 1;
				foodCounterRush = 0;
				
					
			}
			
			document.getElementById("multiplier").innerHTML = multiplierRush + "X";
			
				
		}
		
		
		function stopGame()
		{
			//snake.speed= 1000;
			clearInterval(stopgame);
			if(gameMode == "rush")
			{	
				document.getElementById("timer").style.visibility = "hidden";
				clearInterval(timerStopVar);
				
				
			}
			
		}
		
		function resumeGame()
		{
			if(requiredScore >0)
			{
				startCampaign();
			}
			
			else if(gameMode == "rush")
			{
				startRush();
				document.getElementById("timer").style.visibility = "visible";
				
					
			}
			
			else
			{
				startQuickPlay();
			}
			
			
	
			
		}
		
		
		function resetGame()
		{
			
			//remove old snake
			for( var i = 0 ; i<=length ; i++)
			{
				if( (snake.xBody[i]*1 + snake.yBody[i])%2 == 0)
				{
					tiles[ snake.xBody[i] ][ snake.yBody[i] ].setAttribute("style" , "height: 15px; width: 15px; background-color:rgba(215,215,215,1.00); float:left; padding:0px; margin:0px; border:0px;" );
				}
				
				
				else
				{
					tiles[ snake.xBody[i] ][ snake.yBody[i] ].setAttribute("style" , "height: 15px; width: 15px; background-color:rgba(205,205,205,1.00); float:left; padding:0px; margin:0px; border:0px;" );
					
				}
				
				
			}
			
			//revove food
			
			if( (xPoint*1 + yPoint*1)%2 == 0)
			{
				tiles[xPoint][yPoint].setAttribute("style" , "height: 15px; width: 15px; background-color:rgba(215,215,215,1.00); float:left; padding:0px; margin:0px;" );
			}
			
			else
			{
				tiles[xPoint][yPoint].setAttribute("style" , "height: 15px; width: 15px; background-color:rgba(205,205,205,1.00); float:left; padding:0px; margin:0px;" );
				
			}
			
			for(i=2 ; i<=41 ; i++)
			{
				
				for(j = 2 ; j<=41; j++)
				{
					if( (i*1 + j*1)%2 == 0 )
					{
						tiles[i][j].style.backgroundColor = "rgba(215,215,215,1.00)";
						
					}
					
					else
					{
						tiles[i][j].style.backgroundColor = "rgba(205,205,205,1.00)";
						
					}
					
					
				}
				
				
			}
			
			length = 3;
			
			
		
			snake.xBody = ["9", "10", "11" , "12"];
			snake.yBody = ["9" , "9" , "9", "9"];
	
			score = 0;
			direction = "R";
			var last_direction = "R";
			
			
			xPoint = 20;
			yPoint = 16;
			
			
			if(requiredScore > 0)
			{
				if(restart == 1)
				{
					map = 1;
					lives = 3;
					restart = 0;
				}
			}
			
		}
		
		
	
		
		
		
		
		
			var direction = 'R';
			
						
			document.onkeydown = function(key){
					
			
			  switch (key.keyCode)
			  { 
			  
			  	//wasd
			  	
				case 87:
				if(last_direction != 'D')
				direction = 'U';
				break;
				
				case 83:
				if(last_direction != 'U')
				direction = 'D';
				break;
				
				case 65:
				if(last_direction != 'R')
				direction = 'L';
				break;
				
				case 68:
				if(last_direction != 'L')
				direction = 'R';
				break;
				
				
				
				//arrows
				case 37:
				if(last_direction != 'R')
				direction = 'L';
				break;
				
				case 38:
				if(last_direction != 'D')
				direction = 'U';
				break;
				
				case 39:
				if(last_direction != 'L')
				direction = 'R';
				break;
				
				case 40:
				if(last_direction != 'U')
				direction = 'D';
				break;
				
				case 27:
				
				//canShowPauseMenu = 0 se poate ascunde pause menu
				//canShowPauseMenu = 1 se poate afisa pause manu
				//canShowPauseMenu = 3 nu se poate afisa pause menu
				
				if(canShowPauseMenu === 1)
				{
					canShowPauseMenu = 0;
					show_menu(2);
					
					stopGame();
					
				}
				
				else if(canShowPauseMenu === 0)
				{
					canShowPauseMenu = 1;
					hide_menu(2);
					resumeGame();
					
				}
				break;
				
				case 32:
				if(document.getElementById("game_over_menu").style.visibility === "visible")
				{
					canShowPauseMenu = 3;
					restart = 1; 
					resetGame();
					hide_menu(8);
					setStartingPosition();
					game_over = 0;
					resumeGame();
				}
				
				break
					
			  }
			  
			  
			}
			
		
		
		function hide_menu(menu)
	 	 {
			 
			 if(menu == 1)
			 {
				 document.getElementById("start_game_menu").style.visibility = "hidden";
			 }
			 
			 
			 if(menu == 2)
			 {
				 document.getElementById("pause_game_menu").style.visibility = "hidden"; 
			 }
			 
			 if(menu == 3)
			 { 
				 document.getElementById("quick_play_menu").style.visibility = "hidden"; 
			 }
			 
			  if(menu == 4)
			 { 
				 document.getElementById("options_menu").style.visibility = "hidden"; 
			 }
			 
			 if(menu == 5)
			 { 
				 document.getElementById("options_menu_ingame").style.visibility = "hidden"; 
			 }
			 
			 if(menu == 6)
			 { 
				 document.getElementById("campaign_menu").style.visibility = "hidden"; 
			 }
			 
			 if(menu == 7)
			 { 
				 document.getElementById("scoreboard").style.visibility = "hidden"; 
			 }
			 
			  if(menu == 8)
			 { 
				 document.getElementById("game_over_menu").style.visibility = "hidden";
				 document.getElementById("header_game_over_menu").style.backgroundImage = "url(images/Game-Over-.png)";
			 }
			 
		  
	 	 }
		  
		function show_menu(menu)
		{
			if(menu == 1)
			{
				document.getElementById("start_game_menu").style.visibility = "visible";	
			}
			
			
			 if(menu == 2)
			 {	 
				 document.getElementById("pause_game_menu").style.visibility = "visible"; 
			 }
			 
			  if(menu == 3)
			 {	 
				 document.getElementById("quick_play_menu").style.visibility = "visible";
			 }
			 
			  if(menu == 4)
			 { 
				 document.getElementById("options_menu").style.visibility = "visible"; 
			 }
			 
			  if(menu == 5)
			 { 
				 document.getElementById("options_menu_ingame").style.visibility = "visible"; 
			 }
			 
			 if(menu == 6)
			 { 
				 document.getElementById("campaign_menu").style.visibility = "visible"; 
			 }
			 
			  if(menu == 7)
			 { 
				 document.getElementById("scoreboard").style.visibility = "visible"; 
			 }
			 
			  if(menu == 8)
			 { 
				 document.getElementById("game_over_menu").style.visibility = "visible"; 
			 }
			
		}
		
		
		function hide_loading_screen()
	{
		document.getElementById("loading").style.visibility = "hidden";
		playMenuSound();
	}
		
		
	
	function get_options()
	{	
		var indexSpeed = document.getElementById("speed_option").selectedIndex;
		
		switch(indexSpeed)
		{
			case 0:
			snake.speed = 200; 
			break;
				
			case 1:	
			snake.speed = 75;
			break;			
			
			case 2:	
			snake.speed = 50;
			break;
			
			case 3:	
			snake.speed = 25;
			break;			
				
		}
		
	}
	
	function setStartingPosition()
	{
		if(map == 5)
		{
			
			snake.xBody = ["9", "10", "11" , "12"];
			snake.yBody = ["19" , "19" , "19", "19"];
			
			
		}
		
	}
	
	function displayInformation(n)
	{
		switch(n)
		{
			case 1 :
			document.getElementById("campaignsettings").innerHTML = "Score : 10 <br>Lives : 3 <br>Speed : Medium";
			break;
			
			
			case 2 :
			document.getElementById("campaignsettings").innerHTML = "Score : 15 <br>Lives : 3 <br>Speed : Medium";
			break;
			
			
			
			case 3 :
			document.getElementById("campaignsettings").innerHTML = "Score : 10 <br>Lives : 3 <br>Speed : Fast";
			break;
			
			
			
			case 4 :
			document.getElementById("campaignsettings").innerHTML = "Score : 20 <br>Lives : 1 <br>Speed : Fast";
			break;
			
		}
		
		
	}
	
	
	
	function playMenuSound()
	{
		if(document.getElementById("soundOption1").innerHTML === "Enabled")
		{
			switch(audiotrack)
			{
				case 1:
				document.getElementById("menu_sound1").play();
				break;
				
				case 2:
				document.getElementById("menu_sound2").play();
				break;
				
				case 3:
				document.getElementById("menu_sound3").play();
				break;
				
				case 4:
				document.getElementById("menu_sound4").play();
				break;
				
				
			}
		
		}
		
	}
	
	
	function stopMenuSound()
	{
		
		switch(audiotrack)
		{
			case 1:
			document.getElementById("menu_sound1").load();
			document.getElementById("menu_sound1").pause();
			break;
			
			case 2:
			document.getElementById("menu_sound2").load();
			document.getElementById("menu_sound2").pause();
			break;
			
			case 3:
			document.getElementById("menu_sound3").load();
			document.getElementById("menu_sound3").pause();
			break;
			
			case 4:
			document.getElementById("menu_sound4").load();
			document.getElementById("menu_sound4").pause();
			break;
		}
		
		if(audiotrack <4)
		{
			audiotrack++;
		}
		
		else
		{
			audiotrack = 1;
			
		}
		
		
	}
	
	function toggleSound(){
	
		if(document.getElementById("soundOption1").innerHTML === "Enabled")
		{
			document.getElementById("soundOption1").innerHTML = "Disabled";
			document.getElementById("soundOption2").innerHTML = "Disabled";
			stopMenuSound();
		}
		
		else
		{
			document.getElementById("soundOption1").innerHTML = "Enabled";
			document.getElementById("soundOption2").innerHTML = "Enabled";
			playMenuSound();
			
		}
	}
	
	function toggleConsole(){
	
		if(document.getElementById("consoleOption1").innerHTML === "Enabled")
		{
			document.getElementById("consoleOption1").innerHTML = "Disabled";
			document.getElementById("consoleOption2").innerHTML = "Disabled";
			
			document.getElementById("console").style.visibility = "hidden";
		}
		
		else
		{
			document.getElementById("consoleOption1").innerHTML = "Enabled";
			document.getElementById("consoleOption2").innerHTML = "Enabled";
			
			document.getElementById("console").style.visibility = "visible";
			
		}
	}
		
		