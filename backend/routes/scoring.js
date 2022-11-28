//Initial String to test functions:
let Score = '';

//Creating all baseline functions
//Scores dot-6 runs 
//one of these functions will be called based on the click in the front end
//This will add a space and then the corresponding score for that ball. 

function takeSingle(OverUpdate)
{
   let OneRun = '1';
   OverUpdate.concat(' ', OneRun);
   //Test: console.log("Hello World");
}
 
function takeDouble(OverUpdate)
{
   let TwoRuns = '2';
   OverUpdate.concat(' ', TwoRuns);
}
 
function takeTriple(OverUpdate)
{
   let ThreeRuns = '3';
   OverUpdate.concat(' ', ThreeRuns);
}
 
function Boundary(OverUpdate)
{
   let FourRuns = '4';
   OverUpdate.concat(' ', FourRuns);
}
 
function takeFive(OverUpdate)
{
   let TwoRuns = '5';
   OverUpdate.concat(' ', takeFive);
}
 
function Sixer(OverUpdate)
{
   let SixRuns = '6';
   OverUpdate.concat(' ', SixRuns);
}

function dotBall(OverUpdate)
{
    let NoRun = '0';
    OverUpdate.concat(' ', NoRun);
}

//Creating miscellaneous runs scoring methods 
//No balls, wides, leg byes: 
function wideBall(OverUpdate)
{
    let wideRun = 'E';
    OverUpdate.concat(' ', wideRun)
}

//Needed to create a 7Runs function incase of a noball 6
//How a no ball works is whatever scored on that ball + 1
//and the next ball the batsman can't get out. 

function noBall(OverUpdate, RunScoredOnThatBall)
{
    let NoBallRun = 'N'; 
    //N represents No Ball

    //We need to now check to see what the batsman scored and then increment the score by 1
    //So if he scored 1 on the no ball I would update the string with 2 to account for the noball 1

}

function legBye(OverUpdate, RunsScored)
{
    //Create a switch that basically adds an LB(leg bye)Number
    //The number would represent the number of runs taken by the batsman
    //Leg byes are when a batsman does not hit the ball with his bat, but
    //is able to take a number of run(s). 
    
}


let x = 1;
console.log(x);