const urlBase = 'https://swapi.co/api';
const urlExtensionCategory = '/people/';
const urlPageExtension = '?page='

var numbersUsedList = [];
var index = 1;

const numberOfPeople = 6;
const numberOfPages = 9;

var randomNumber = 0;

GetData();

async function GetData(){
    await fetch(urlBase + urlExtensionCategory + urlPageExtension + RandomAPIPage(numberOfPages))
        .then((response) => {                
            //handle client error with fetch
            if(response.ok) {
                return response.json();
            }else{
                return Promise.reject(response);
            }            })
        .then((myjson) => {
            SetHTML(myjson);
            console.log(myjson);
        })
        .catch(function(err){
            console.warn("something went wrong. ", err);   
    });   
}  

function SetHTML(json){
    numbersUsedList = [];

    //filter through data
    for(var i = 0; i < numberOfPeople; i++){
        //select current p through index
        var currentP = document.getElementById("p" + index);

        //get length since not every list is 10
        var length = json.results.length;

        var currentRandom = GetRandomNumber(length);

        currentP.innerText = json.results[currentRandom].name;

        //increase index to cycle through p's
        index++;
        //reset index to make sure it used the right p
        if(index > numberOfPeople){
            index = 1;
        }
    }
}

//get a random page from the API
function RandomAPIPage(maxNumberPages){
    var randomPageNumber = Math.floor((Math.random() * maxNumberPages) + 1);

    return randomPageNumber;
}

function GetRandomNumber(maxNumber){
    //generate random number
    randomNumber = Math.floor((Math.random() * maxNumber));

    //if number is already used, go again
    if(numbersUsedList.includes(randomNumber)){
        //reset random number to be sure
        randomNumber = null;

        GetRandomNumber(maxNumber);
    }
    //add number to list to check
    numbersUsedList.push(randomNumber);

    return randomNumber;
}

//called when clicking on character name
function Details(){
    SwitchPage();
}

//called when clicking back button in detail page
function Overview(){
    SwitchPage();
}

function SwitchPage(){
    const overview = document.getElementById("overview");
    const detail = document.getElementById("details");
    overview.classList.toggle("hidden");
    detail.classList.toggle("hidden");
}