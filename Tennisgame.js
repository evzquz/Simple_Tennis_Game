<br>
<canvas id="gameCanvas" width="800"
height="600"></canvas>


<script>

var canvas;
var canvasContext;
var ballx = 50;
var ballSpeedx = 15;
var bally = 50;
var ballSpeedy = 4;
  
 var player1Score = 0;
 var player2Score = 0;
const WINNING_SCORE = 3;
    var showingWinScreen = false;
    
var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;
    

function calculateMousePos(evt){
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return{
    x:mouseX,
    y:mouseY
  }
};

function handleMouseClick(evt){
    if(showingWinScreen){
        player1Score =0;
        player2Score = 0;
        showingWinScreen = false;
    }
}

  window.onload = function(){

          canvas = document.getElementById('gameCanvas');
          canvasContext = canvas.getContext('2d');
          
          var framesPerSecond = 30;
          setInterval(function(){
            moveEverything();
            drawEverything();
          }, 1000/framesPerSecond);
      
      canvas.addEventListener('mousedown', handleMouseClick);
          
          canvas.addEventListener('mousemove', function(evt){
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
          });
        
  function computerMovement(){
      var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
    if (paddle2Y < bally-35){
      paddle2Y += 6;
    } else if (paddle2Y > bally+35){
      paddle2Y -= 6;
    }
  }
          
  
  function moveEverything(){
      if(showingWinScreen){
          return;
      }
    computerMovement();
    
          ballx += ballSpeedx;
          bally += ballSpeedy;
          
          if(ballx < 0){
            if(bally > paddle1Y &&
            bally < paddle1Y+PADDLE_HEIGHT){
              ballSpeedx = -ballSpeedx;
                
                var deltaY = bally - (paddle1Y+PADDLE_HEIGHT/2);
                ballSpeedy = deltaY*0.35;
            } else {
                player2Score++; // must be BEFORE ball reset
                ballReset();

            }
          }
          if(ballx > canvas.width){
            if(bally > paddle2Y &&
            bally < paddle2Y+PADDLE_HEIGHT){
              ballSpeedx = -ballSpeedx;
                var deltaY = bally - (paddle2Y+PADDLE_HEIGHT/2);
                ballSpeedy = deltaY*0.35;
            } else {
                player1Score++; // must be BEFORE ball reset
                ballReset();

            }          }
          
          if(bally < 0){
          ballSpeedy = -ballSpeedy;
          }
          if(bally > canvas.height){
            ballSpeedy = -ballSpeedy;
          }
  }
  
  function ballReset(){
      if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE){
        
          showingWinScreen = true;
      }
      
    ballSpeedx = -ballSpeedx;
    ballx = canvas.width/2;
    bally = canvas.height/2;
    
  }
  
  function drawNet(){
      for(var i=0; i<canvas.height;i+=40){
          colorRect(canvas.width/2-1, i, 2, 20, 'white');
      }
  }
  
  function drawEverything(){
          
          // next line blanks out the screen with black
          colorRect(0,0,canvas.width, canvas.height, 'black');
      
      
            if(showingWinScreen){
            canvasContext.fillStyle = 'white';

                 if(player1Score >= WINNING_SCORE) {
                 canvasContext.fillText("LEFT PLAYER WON!", 350, 200) }
                 
                else if(player2Score >= WINNING_SCORE){
                canvasContext.fillText("RIGHT PLAYER WON!", 350, 200)}
                     
             canvasContext.fillText("click to continue", 350, 500)

          return;
            }
      
          drawNet();
      
          // this is the left player paddle
    colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'red');
          // this is the right player paddle
          colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,10,PADDLE_HEIGHT,'blue');
          // next line draws the ball
          colorCircle(ballx, bally,PADDLE_THICKNESS,'green');
      
      canvasContext.fillText(player1Score, 100, 100);
      canvasContext.fillText(player2Score, canvas.width-100, 100);

  }
  function colorCircle(centerX, centerY, radius, drawColor){
          canvasContext.fillStyle = drawColor;
          canvasContext.beginPath();
          canvasContext.arc(centerX,centerY,radius,0,Math.PI*2, true);
          canvasContext.fill();
  }
  function colorRect(leftX, topY, width, height, drawColor){
          canvasContext.fillStyle = drawColor;
          canvasContext.fillRect(leftX,topY,width,height);
  }
  };
  
  
</script>