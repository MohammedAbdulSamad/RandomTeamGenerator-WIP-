var pCount = 0;
var tCount = 0;

var display = document.getElementById("theDisplay");
var seconddisplay = document.getElementById("2Display");

var txt = "";
var pDisplay = document.getElementById("textDis").innerHTML = txt; 


var playerList = [];
var addplayerbtn = document.getElementById("playerAdder");

var playerNameInput = document.getElementById("playerName");

$(document).ready(function() {
    $("#playerAdder").click(function() {
        $("#displayPlayers").append(" " + $("#playerName").val());
        $("#playerName").val("");
    })
    
    for (var c = 2; c <=20; c++) {
        var option = $("<option></option>").text(c);
        $("#playerCountDrop").append(option);
    }
    
    $("#randomiseBtn").attr("disabled", true);
    $("#playerName").attr("disabled", true);
    $("#playerAdder").attr("disabled", true);
})


//Initialisation
function ini() {
    //pCount = document.getElementById("playerCount").value;
    pCount = document.getElementById("playerCountDrop").value;
    tCount = document.getElementById("teamCount").value;
    
    createTeams();
    
    $("#displayPlayerNum").append(" " + pCount)
    $("#displayTeamCount").append(" " + tCount)
    $("#displayPlayerOnEachTeam").text(playersOnEachTeam + " player(s) on each team.")
        
    console.log("Player Count: " + pCount + ", Team Count: " + tCount);
    alert("Player Count: " + pCount + "\n" + "Team Count: " + tCount + "\n" + playersOnEachTeam + " player(s) on each team.");
    
    $("#playerName").attr("disabled", false);
    $("#playerAdder").attr("disabled", false);

    $("#playerLabel").append("Enter Player 1 of " + pCount);
}

var count = 1;

//Function to add players to the player list
function addPlayer() {
    var addingPlayer = true;
        
    var playerName = playerNameInput.value;
    playerList.push(playerName);
    count++;      
    if (count > pCount) {
        count = 1;
        $("#randomiseBtn").attr("disabled", false);
        $("#playerName").attr("disabled", true);
        $("#playerAdder").attr("disabled", true);
    } 
    console.log(playerList);
}





var team = [];
var playersOnEachTeam = 0;
var playerRemainder = 0;

//Function to create necessary teams
function createTeams() {
    for (var k = 0; k < tCount; k++) {
        team[k] = [];
    }
    playersOnEachTeam = pCount / tCount;
}


//Function to randomly assign players to a team
var randomiseAgain = false;
function randomiseTeams() {
    //display.value = "";
    if (randomiseAgain) {
        createTeams();
        //var oldTable = document.getElementById('ePlayerTable');
        
        $("#ePlayerTable tr").remove();
        $("#ePlayerTable th").remove();
    }
    
    var searchAttempt = playerList.length;
    var teamNumber = 0;
    var numbersChosen = [];
    
    while (searchAttempt != 0) {
        var randomNumber = Math.floor(Math.random() * (pCount));
        console.log("Random Number: " + randomNumber);
        
        if (numbersChosen.includes(randomNumber)) {
            console.log("Number Exists");
            continue;          
        } else {
            numbersChosen.push(randomNumber);
            team[teamNumber].push(playerList[randomNumber]);
            console.log("Players on each team: " + playersOnEachTeam + ", Current Team Length: " + team[teamNumber].length + ", Team Number: " + teamNumber);
            if (team[teamNumber].length == playersOnEachTeam) {
                teamNumber += 1;
            }
            //display.value = display.value + " Random Number: " + randomNumber;
            searchAttempt--;
        }
    }

    console.table(team);
    createTable();
    insertPlayerToTable();
    randomiseAgain = true;
} 


//Table Stuff
var tableArray = new Array();
//Get Table
var table = document.getElementById("teamTable");

//Create Empty <thead> and add to table
var header = table.createTHead()



function createTable() {
    var eTable = document.createElement("table");
    eTable.setAttribute('id', 'ePlayerTable');
    
    var tr = eTable.insertRow(-1);
    
    for (var x = 0; x < tCount; x++) {
        var th = document.createElement("th");
        th.innerHTML = "Team " + (x+1);
        tr.appendChild(th);
    }
    
    var div = document.getElementById("theTable");
    div.appendChild(eTable);
}

function insertPlayerToTable() {
    var tab = document.getElementById('ePlayerTable');       
      
    var xCount = 0;
    while (xCount != playersOnEachTeam) {
        var rowCount = tab.rows.length;
        var tr = tab.insertRow(rowCount);
        tr = tab.insertRow(rowCount);
        
        for (var k = 0; k < team.length; k++) {
            var td = document.createElement("td");
            td = tr.insertCell(k);
            //td.value = team[x][k];
            var ele = document.createElement('input');
            ele.setAttribute('type', 'text');
            ele.setAttribute('value', team[k][xCount]);
            td.appendChild(ele);            
        }
        
        xCount++;
    }   
}
