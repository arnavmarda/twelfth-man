//Creating all baseline functions
//Scores dot-6 runs 
//one of these functions will be called based on the click in the front end
//This will add a space and then the corresponding score for that ball. 

function takeSingle(OverUpdate)
{
   let OneRun = '1';
   OverUpdate.concat(' ', OneRun);
   return OverUpdate;
   //Test: console.log("Hello World");
}
 
function takeDouble(OverUpdate)
{
   let TwoRuns = '2';
   OverUpdate.concat(' ', TwoRuns);
   return OverUpdate;
}
 
function takeTriple(OverUpdate)
{
   let ThreeRuns = '3';
   OverUpdate.concat(' ', ThreeRuns);
   return OverUpdate;
}
 
function Boundary(OverUpdate)
{
   let FourRuns = '4';
   OverUpdate.concat(' ', FourRuns);
   return OverUpdate;
}
 
function takeFive(OverUpdate)
{
   let TwoRuns = '5';
   OverUpdate.concat(' ', takeFive);
   return OverUpdate;
}
 
function Sixer(OverUpdate)
{
   let SixRuns = '6';
   OverUpdate.concat(' ', SixRuns);
   return OverUpdate;
}

function dotBall(OverUpdate)
{
    let NoRun = '0';
    OverUpdate.concat(' ', NoRun);
    return OverUpdate;
}

//Creating miscellaneous runs scoring methods 
//No balls, wides, leg byes: 
function wideBall(OverUpdate, RunScored)
{
    let wideRun = 'wide';
    //if after the wide is taken, there is a run taken we need to update that too. 
    //So, what we can do is have a second input how many runs taken and add one. 
    let intRuns = parseInt(RunsScored); 
    let value = intRuns + 1; //Wides give +1 runs and cost 0 balls
    let strRuns = value.toString(); 
    let AppendVal = wideRun.concat(strRuns);
    OverUpdate.concat(' ', AppendVal);
    return OverUpdate;
}

//How a no ball works is whatever scored on that ball + 1
//and the next ball the batsman can't get out. 

function noBall(OverUpdate, RunScored)
{
    let NoBallRun = 'N'; 
    //N represents No Ball

    //We need to now check to see what the batsman scored and then increment the score by 1
    //So if he scored 1 on the no ball I would update the string with 2 to account for the noball 1
    let RunsTaken = parseInt(RunsScored); 
    let NewVal = RunsTaken + 1; 
    let NoBallVal = NewVal.toString(); 
    let AppendValue = NoBallRun.concat(NoBallVal);
    OverUpdate.concat(' ', AppendValue);
    return OverUpdate;
}

function legBye(OverUpdate, RunsScored)
{
    //Create a switch that basically adds an LB(leg bye)Number
    //The number would represent the number of runs taken by the batsman
    //Leg byes are when a batsman does not hit the ball with his bat, but
    //is able to take a number of run(s). 
    
    let legByeRuns = 'LB';
    switch(RunsScored)
    {
        case '2': 
            legByeRuns = 'LB2';
            OverUpdate.concat(' ', legByeRuns); 
            break; 
        case '3': 
            legByeRuns = 'LB3';
            OverUpdate.concat(' ', legByeRuns); 
            break; 
        case '4': 
            legByeRuns = 'LB4';
            OverUpdate.concat(' ', legByeRuns); 
            break; 
        case '5': 
            legByeRuns = 'LB5';
            OverUpdate.concat(' ', legByeRuns); 
            break; 
        case '6': 
            legByeRuns = 'LB6';
            OverUpdate.concat(' ', legByeRuns); 
            break; 
        default: 
            legByeRuns = 'LB1';
            OverUpdate.concat(' ', legByeRuns)
            break; 
    }
    return OverUpdate;
}

//We need a wicket function which will update the scorecard with the type of wicket
function wicketBall(OverUpdate, type)
{

    //Based on the type of wicket it will update 
    //So I will switch through the type of wicket and take in the important information from user input. 
    switch(type)
    {
        case 'bowled': 
            OverUpdate.concat(' ', 'W-B'); 
            break; 
        case 'stumped': 
            OverUpdate.concat(' ', 'W-S'); 
            break; 
        case 'caught': 
            OverUpdate.concat(' ', 'W-C'); 
            break; 
        case 'runout': 
            OverUpdate.concat(' ', 'W-R'); 
            break; 
        case 'lbw': 
            OverUpdate.concat(' ', 'W-LBW'); 
            break; 
        default: 
            break; 
    }    
    let bowler = ''; 
    let wicketKeeper = ''; 
    let fielder = ''; 
    if (type == 'bowled')
    {
        bowler = prompt('Bowler Name is: ');
    }
    elif (type == 'stumped')
    {
        wicketKeeper = prompt('Keeper name is: '); 
    }
    elif (type == 'caught')
    {
        bowler = prompt('Bowler Name is: ');
        fielder = prompt('Fielder name is: ');
    }
    elif (type == 'runout')
    {
        fielder = prompt('Fielder name is: '); 
    }
    elif (type == 'lbw')
    {
        bowler = prompt('Bowler Name is: ');
    }
    return OverUpdate, bowler, fielder, wicketKeeper; 
}
//Ok now that I have the general functions I will implement them based on click
//When the user clicks a button the respective function will be called 
//This will update three things: total Runs, Total extras, total balls

function UpdateScorecard(MatchLength, id)
{
    //The MatchLength parameter provides the overs the match is going to be 
    //This can be whatever the teams choose. 
    //The total balls can be calculated 
    scoreCur = '';
    var ballUpdate = document.getElementById(id);
    TotalBallsLeft = MatchLength * 6; 

    switch(id)
    {
        case '1': 
            document.getElementById('1').onclick = function() {takeSingle(scoreCur)};
            TotalBallsLeft = TotalBallsLeft - 1; 
            break;
        case '2': 
            document.getElementById('2').onclick = function() {takeDouble(scoreCur)};
            TotalBallsLeft = TotalBallsLeft - 1; 
            break;
        case '3': 
            document.getElementById('3').onclick = function() {takeTriple(scoreCur)};
            TotalBallsLeft = TotalBallsLeft - 1; 
            break;
        case '4': 
            document.getElementById('4').onclick = function() {Boundary(scoreCur)};
            TotalBallsLeft = TotalBallsLeft - 1; 
            break;
        case '5': 
            document.getElementById('5').onclick = function() {takeFive(scoreCur)};
            TotalBallsLeft = TotalBallsLeft - 1; 
            break;
        case '6': 
            document.getElementById('6').onclick = function() {Sixer(scoreCur)};
            TotalBallsLeft = TotalBallsLeft - 1; 
            break;
        case '0': 
            document.getElementById('0').onclick = function() {dotBall(scoreCur)};
            TotalBallsLeft = TotalBallsLeft - 1; 
            break;
    }
    
    //We need the front end part done for this; however: 
    //I can write the DOM property for the event in javascript and have the frontend
    //format their code to the likeness of my code. 
    
    //First what we do is get the element ID
        //We can do this using the getElementById function: 

    //We need each function call to be matched to the button clicked. 
    //This will all be done in the html file using onclick. 

}

let x = 1;
console.log(x);