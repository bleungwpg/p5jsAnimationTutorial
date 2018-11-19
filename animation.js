var question1;
var questionX;
var questionY;
var questionLength;
var questionHeight;
var megamanAnimation;
var megamanAnimationID;
var damageAnimationTime;
var runningAnimationSpeed;
var runningAnimationTime;
var numberOfAnswers;


var locked;
var lockDamageAnimation;


function animationPreload()
{
	// ---------------------------------------------------------------------------------------------------
	// Code relating to animated character
	// ---------------------------------------------------------------------------------------------------
	// speed of running animation
	runningAnimationSpeed = 6;
	megamanAnimationID = 0;
	megamanAnimation = new Array(3);

	megamanAnimation[0] = loadImage('https://bleungwpg.github.io/p5jsAnimationTutorial/images/UltraMegamanStandingR.png');
	megamanAnimation[1] = loadImage('https://bleungwpg.github.io/p5jsAnimationTutorial/images/UltraMegamanStandingRhurt.png');
	megamanAnimation[2] = loadImage('https://bleungwpg.github.io/p5jsAnimationTutorial/images/UltraMegamanRun1.png');
	megamanAnimation[3] = loadImage('https://bleungwpg.github.io/p5jsAnimationTutorial/images/UltraMegamanRun2.png');
	megamanAnimation[4] = loadImage('https://bleungwpg.github.io/p5jsAnimationTutorial/images/UltraMegamanRun3.png');
	megamanAnimation[5] = loadImage('https://bleungwpg.github.io/p5jsAnimationTutorial/images/UltraMegamanRun4.png');
	// ---------------------------------------------------------------------------------------------------



	
	// ---------------------------------------------------------------------------------------------------
	// Code relating to MC selection
	// ---------------------------------------------------------------------------------------------------
	// numberOfAnswers is how many multiple choice the player has
	numberOfAnswers = 5;
	// question image length
	questionLength = 126;
	// question image height
	questionHeight = 40;
	// MC answer X and Y values
	questionX = [100,100,100,100,100];
	questionY = [50,100,150,200,250];

	question1 = new Array(numberOfAnswers);

	question1[0] = loadImage('https://bleungwpg.github.io/p5jsAnimationTutorial/images/question1_button_answer.png');
	question1[1] = loadImage('https://bleungwpg.github.io/p5jsAnimationTutorial/images/question1_button_answer.png');
	question1[2] = loadImage('https://bleungwpg.github.io/p5jsAnimationTutorial/images/question1_button_answer.png');
	question1[3] = loadImage('https://bleungwpg.github.io/p5jsAnimationTutorial/images/question1_button_answer.png');
	question1[4] = loadImage('https://bleungwpg.github.io/p5jsAnimationTutorial/images/question1_button_answer.png');
	// ---------------------------------------------------------------------------------------------------

}


// setup animation default settings, you do not need to modify this
function animationSetup()
{
	locked = false;
	lockDamageAnimation = false;
}


// the main draw function for the animations
function animationDraw()
{

	showQuestions(question1);
	// isButtonClicked(corrrectChoice,nextcanvasID)
	isButtonClicked(0,0);
	

	manageMegamanAnimation();
	showHealth();

}

// shows your health bar and check if you are dead or not
function showHealth()
{
	fill(0,255,0);
	rect(300,30,health,25);
	fill(0,0,0);
	text(health,300+10,30+20)
	if (health <= 0)
	{
		canvasID = -1;
	}
}

function manageMegamanRunningAnimation()
{
	if (frameCount <= runningAnimationTime+runningAnimationSpeed*1/4)
	{
		image(megamanAnimation[2],300,100);
	}
	else if (frameCount >= runningAnimationTime+runningAnimationSpeed*1/4 && frameCount <= runningAnimationTime+runningAnimationSpeed*2/4)
	{
		image(megamanAnimation[3],300,100);		
	}
	else if (frameCount >= runningAnimationTime+runningAnimationSpeed*2/4 && frameCount <= runningAnimationTime+runningAnimationSpeed*3/4)
	{
		image(megamanAnimation[4],300,100);		
	}
	else if (frameCount >= runningAnimationTime+runningAnimationSpeed*3/4 && frameCount <= runningAnimationTime+runningAnimationSpeed)
	{
		image(megamanAnimation[5],300,100);		
	}
	else if (frameCount >= runningAnimationTime+runningAnimationSpeed)
	{
		image(megamanAnimation[5],300,100);		
		megamanAnimationID = 0;
	}

}

function manageMegamanAnimation()
{
	if (megamanAnimationID == 0)
	{
		image(megamanAnimation[0],300,100);
	}
	else if (megamanAnimationID == 1) 
	{
		if (lockDamageAnimation == false)
		{
			lockDamageAnimation = true;
			runningAnimationTime = frameCount;
		}
		if (frameCount > runningAnimationTime+runningAnimationSpeed)
		{
			runningAnimationTime = 0;
			megamanAnimationID = 0;
			lockDamageAnimation = false;
		}
		manageMegamanRunningAnimation()
	}
	else if (megamanAnimationID == 2) 
	{
		if (lockDamageAnimation == false)
		{
			lockDamageAnimation = true;
			damageAnimationTime = frameCount + 20;
		}
		if (frameCount > damageAnimationTime)
		{
			megamanAnimationID = 0;
			lockDamageAnimation = false;
		}
		image(megamanAnimation[1],300,100);

	}

}

// checks what happens when you click on a button
function isButtonClicked(correct,nextID)
{
	var deductHealth = false;
	if (mouseIsPressed && !locked)
	{
		locked = true;
		for (var i = 0; i < numberOfAnswers; i++)
		{
			if (mouseX > questionX[i] && mouseX < questionX[i] + questionLength && mouseY > questionY[i] && mouseY < questionY[i] + questionHeight)
			{
				if (i == correct)
				{
					canvasID = nextID;
					megamanAnimationID = 1;
					lockDamageAnimation = false;
					return 0;
				}
				else
				{
					deductHealth = true;
				}
			}
		}
		if (deductHealth)
		{
			health = health - 50;
			megamanAnimationID = 2;
		}
	}
}


// shows questions on the screen
function showQuestions(thequestion)
{
	for (var i = 0; i < numberOfAnswers; i++)
	{
		image(thequestion[i],questionX[i],questionY[i])
	}
}

// locked is to prevent HOLDING onto the button
function mouseReleased()
{
	locked = false;
}










