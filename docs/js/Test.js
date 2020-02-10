const urlBase = 'https://swapi.co/api';
const urlExtensionCategory = '/people/';
const urlPageExtension = '?page='

var numbersUsedList = [];
var previousRandomNumber = 88;
var index = 1;

const numberOfPeople = 6;
const peopleListNumber = 88;
const numberOfPages = 9;
const pageListLength = 9;

GetData();

async function GetData(){
        await fetch(urlBase + urlExtensionCategory + urlPageExtension + GetRandomNumber(numberOfPages, true))
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

function SetHTML(json){
    //filter through data
    for(var i = 0; i < numberOfPeople; i++){
        //select current p through index
        var currentP = document.getElementById("p" + index);

        currentP.innerText = json.results[GetRandomNumber(pageListLength, false)].name + ", " + json.results[GetRandomNumber(pageListLength, false)].birth_year;

        //increase index to cycle through p's
        index++;
        //reset index to make sure it used the right divs
        if(index > numberOfPeople){
            index = 1;
        }
    }
}

function GetRandomNumber(maxNumber, usesPlusOne){
    //get random number based on total length people list
    if(usesPlusOne){
        var randomNumber = Math.floor((Math.random() * maxNumber) + 1);
    }else{
        var randomNumber = Math.floor((Math.random() * maxNumber));
    }

    if(numbersUsedList.includes(randomNumber)){
        GetRandomNumber();
    }

    numbersUsedList.push(randomNumber);
    console.log(numbersUsedList);
    console.log(randomNumber);

    //call again if number already used
    //TODO add check for all 6 number, not just previous
    // if(previousRandomNumber == randomNumber){
    //     GetRandomNumber(maxNumber);
    // }
    //previousRandomNumber = randomNumber;

    return randomNumber;
}