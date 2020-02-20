const urlBase = 'https://swapi.co/api';
const urlExtensionCategory = '/people/';
const urlPageExtension = '?page='

var numbersUsedList = [];
var index = 1;

const numberOfPeople = 6;
const numberOfPages = 9;

var randomNumber = 0;

var firstTime = true;


switchPage();


// routie({
//     'devtools/:id': id => {
//       console.log(id);
//     },
//     'details': () => {
//       details();
//     },
//     'overview': () => {
//       overview();
//     },
//   });

async function getData(){
    await fetch(urlBase + urlExtensionCategory + urlPageExtension + randomAPIPage(numberOfPages))
        .then((response) => {                
            //handle client error with fetch
            if(response.ok) {
                return response.json();
            }else{
                return Promise.reject(response);
            }            })
        .then((myjson) => {
            // setHTML(myjson);
            // console.log(myjson);

            routie({
                'details': () => {
                  details();
                },
                'overview': () => {
                  overview(myjson);
                },
              });

        })
        .catch(function(err){
            console.warn("something went wrong. ", err);   
    });   
}

getData();

function setHTML(json){
    var values = [];
    numbersUsedList = [];

    //filter through data
    for(var i = 0; i < numberOfPeople; i++){
        //select current p through index
        var currentP = document.getElementById("a" + index);

        var currentPName = "a" + index;

        //get length since not every list is 10
        var length = json.results.length;

        var currentRandom = getRandomNumber(length);

        values.push(json.results[currentRandom].name);

        console.log(values);

        //currentP.innerText = json.results[currentRandom].name;

        //increase index to cycle through a's
        index++;
        //reset index to make sure it used the right a
        if(index > numberOfPeople){
            index = 1;
        }
    }

    var data = {
        a1: values[0],
        a2: values[1],
        a3: values[2],
        a4: values[3],
        a5: values[4],
        a6: values[5]
    }

    console.log(data);

    Transparency.render(document.getElementById('overview'), data);
}

//get a random page from the API
function randomAPIPage(maxNumberPages){
    var randomPageNumber = Math.floor((Math.random() * maxNumberPages) + 1);

    return randomPageNumber;
}

function getRandomNumber(maxNumber){
    //generate random number
    randomNumber = Math.floor((Math.random() * maxNumber));

    //if number is already used, go again
    if(numbersUsedList.includes(randomNumber)){
        //reset random number to be sure
        randomNumber = null;

        getRandomNumber(maxNumber);
    }
    //add number to list to check
    numbersUsedList.push(randomNumber);

    return randomNumber;
}

//called when clicking on character name
function details(){
    switchPage();
    console.log("details");
}

//called when clicking back button in detail page
function overview(json){
    console.log(firstTime);
    if(firstTime){
        switchPage();
        setHTML(json);
        console.log("overview");
        firstTime = false;
    }else{
        switchPage();
        setHTML(json);
        console.log("overview");
    }
}

function backOverview(){

}

function switchPage(){
    console.log("AAHHH");
    const overview = document.getElementById("overview");
    const detail = document.getElementById("details");
    overview.classList.toggle("hidden");
    detail.classList.toggle("hidden");
}

routie('overview');
