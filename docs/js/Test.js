var urlBase = 'https://swapi.co/api';
var urlExtensionCategory = '/people/';

var randonNumber;
var index = 1;
var numberOfPeople = 6;

const peopleListNumber = 88;

GetData();

async function GetData(){
    for(var i = 0; i < numberOfPeople; i++){
        GetRandomNumber();

        await fetch(urlBase + urlExtensionCategory + randomNumber)
            .then((response) => { 
                return response.json();
            })
            .then((myjson) => {
                DoStuff(myjson);
            });   
    }
}  

function DoStuff(json){
    var currentP = document.getElementById("p" + index);

    currentP.innerText = json.name;

    // var newP = document.createElement("p");
    // var newContent = document.createTextNode(json.name);
    // newP.appendChild(newContent);
    // var reference = document.getElementById("Reference");
    // document.body.insertBefore(newP, reference);

     //newP.insertAdjacentHTML('beforeend', `<p>${json.name}</p>`);
    // var starWarsContainer = document.getElementById("starWarsContainer")

    // starWarsContainer.innerHTML = ""
    // starWarsContainer.insertAdjacentHTML('beforeend', `<p>${json.name}</p>`)

    // //get right div element
    // var currentDiv = document.getElementById("Div" + index);
    // while(currentDiv.hasChildNodes()){
    //     currentDiv.removeChild(currentDiv.firstChild);
    // }
    // //currentDiv.innerText = '';
    // document.body.insertBefore(newP, currentDiv);

    console.log(json.name);

    //reset index to make sure it used the right divs
    index++;
    if(index > numberOfPeople){
        index = 1;
    }
}

function GetRandomNumber(){
    //never get the same name
    randomNumber = Math.floor((Math.random() * peopleListNumber) + 1);
    console.log(randomNumber);

    if(previousRandomNumber = randonNumber){
        GetRandomNumber();
    }
    previousRandomNumber = randonNumber;
}

//inner text
//create element - append child