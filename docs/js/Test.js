const urlBase = 'https://swapi.co/api';
const urlExtensionCategory = '/people/';

var randomNumber;
var previousRandomNumber = 88;
var index = 1;

const numberOfPeople = 6;
const peopleListNumber = 88;

GetData();

async function GetData(){
    //TODO refactor, dont loop here but loop in SetHTML to reduce API calls
    for(var i = 0; i < numberOfPeople; i++){
        GetRandomNumber();

        await fetch(urlBase + urlExtensionCategory + randomNumber)
            .then((response) => {
                //handle client error with fetch
                if(response.ok) {
                    return response.json();
                }else{
                    return Promise.reject(response);
                }
            })
            .then((myjson) => {
                SetHTML(myjson);
            })
            .catch(function(err){
                console.warn("something went wrong. ", err);   
            });   
    }
}  

function SetHTML(json){
    //select current p through index
    var currentP = document.getElementById("p" + index);

    currentP.innerText = json.name + ", " + json.birth_year;

    console.log(json.name);

    //increase index to cycle through p's
    index++;
    //reset index to make sure it used the right divs
    if(index > numberOfPeople){
        index = 1;
    }
}

function GetRandomNumber(){
    //get random number based on total length people list
    randomNumber = Math.floor((Math.random() * peopleListNumber) + 1);
    console.log(randomNumber);

    //call again if number already used
    //TODO add check for all 6 number, not just previous
    if(previousRandomNumber == randomNumber){
        GetRandomNumber();
    }
    previousRandomNumber = randomNumber;
}