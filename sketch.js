var health;
var canvasID;


function preload()
{
	animationPreload();
}

function setup()
{
	createCanvas(800,600);
	frameRate(30);

	health = 300;
	canvasID = 0;

	animationSetup();
}

function draw()
{
	background(0,0,0);

	if (canvasID == -1)
	{
		gameOver();
	}
	else if (canvasID == 0)
	{
		animationDraw();
	}


}


// handles all game over code
function gameOver()
{
	textSize(32);
	fill(255,255,255);
	text("GAME OVER!",50,50);
	textSize(12);
}










