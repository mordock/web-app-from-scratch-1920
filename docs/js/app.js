import {getOverviewData, getDetailData} from './modules/api.js'

const urlBase = 'https://swapi.co/api';
const urlExtensionCategory = '/people/';
const urlPageExtension = '?page='
const urlSearchExtension = ' '

var numbersUsedList = [];
var index = 1;

const numberOfPeople = 6;
const numberOfPages = 9;

var randomNumber;

init();

function init(){
    const detail = document.getElementById("details");

    //make sure detail is closed in the beginning
    detail.classList.add('hidden');

    routie('overview');
}

// async function getOverviewData(){
//     await fetch(urlBase + urlExtensionCategory + urlPageExtension + randomAPIPage(numberOfPages))
//         .then((response) => {                
//             //handle client error with fetch
//             if(response.ok) {
//                 return response.json();
//             }else{
//                 return Promise.reject(response);
//             }            })
//         .then((myjson) => {
//             renderOverview(myjson);
//         })
//         .catch(function(err){
//             console.warn("something went wrong. ", err);   
//     });   
// }

// async function getDetailData(hash){
//     //replace special characters
//     var name = hash.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '');
//     //replace numbers with space, not with nothing for searching
//     name = name.replace(/[0-9]/g, ' ');
//     name = name.substring(0, 9);

//     console.log(name);
//     await fetch('https://swapi.co/api/people/?search=' + name)
//         .then((response) => {                
//             //handle client error with fetch
//             if(response.ok) {
//                 return response.json();
//             }else{
//                 return Promise.reject(response);
//             }            })
//         .then((myjson) => {
//             renderDetails(myjson);
//         })
//         .catch(function(err){
//             console.warn("something went wrong. ", err);   
//     });  
// }

// function renderDetails(json){
//     console.log(json.results[0]);
//     console.log(json.results[0].gender);

//     var data = {
//         name: json.results[0].name,
//         gender: json.results[0].gender,
//         birthday: json.results[0].birth_year  
//     }

//     Transparency.render(document.getElementById("details"), data);
// }

// function renderOverview(json){
//     var values = [];
//     numbersUsedList = [];

//     //filter through data
//     for(var i = 0; i < numberOfPeople; i++){
//         //select current p through index
//         var currentP = document.getElementById("a" + index);

//         //get length since not every list is 10
//         var length = json.results.length;

//         var currentRandom = getRandomNumber(length);

//         //set href for each name for searching
//         currentP.href = '#/' + json.results[currentRandom].name;

//         values.push(json.results[currentRandom].name);

//         //increase index to cycle through a's
//         index++;
//         //reset index to make sure it used the right a
//         if(index > numberOfPeople){
//             index = 1;
//         }
//     }
//     //Transparency data object
//     var data = {
//         a1: values[0],
//         a2: values[1],
//         a3: values[2],
//         a4: values[3],
//         a5: values[4],
//         a6: values[5]
//     }

//     Transparency.render(document.getElementById('overview'), data);
// }

// function getRandomNumber(maxNumber){
//     //generate random number
//     randomNumber = Math.floor((Math.random() * maxNumber));

//     //if number is already used, go again
//     if(numbersUsedList.includes(randomNumber)){
//         //reset random number to be sure
//         randomNumber = null;

//         getRandomNumber(maxNumber);
//     }
//     //add number to list to check
//     numbersUsedList.push(randomNumber);

//     return randomNumber;
// }

// //get a random page from the API
// function randomAPIPage(maxNumberPages){
//     var randomPageNumber = Math.floor((Math.random() * maxNumberPages) + 1);

//     return randomPageNumber;
// }

function details(){
    const detail = document.getElementById("details");
    const overview = document.getElementById("overview");

    //disable overview
    detail.classList.remove('hidden');
    overview.classList.add('hidden');

    //get current hash
    var hash = location.hash.toString();

    getDetailData(hash);
}

function overview(){
    const detail = document.getElementById("details");
    const overview = document.getElementById("overview");

    //disable details
    detail.classList.add('hidden');
    overview.classList.remove('hidden');

    getOverviewData();
}

//routing
routie({
    'overview': () => {
      overview();
    },
    '/:name': () => {
        details();
    }
  });