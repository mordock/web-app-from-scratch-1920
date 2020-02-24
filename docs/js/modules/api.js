import {renderDetails, renderOverview} from './render.js'

const urlBase = 'https://swapi.co/api';
const urlExtensionCategory = '/people/';
const urlPageExtension = '?page='
const urlSearchExtension = ' '

const numberOfPages = 9;

export async function getOverviewData(){
    await fetch(urlBase + urlExtensionCategory + urlPageExtension + randomAPIPage(numberOfPages))
        .then((response) => {                
            //handle client error with fetch
            if(response.ok) {
                return response.json();
            }else{
                return Promise.reject(response);
            }            })
        .then((myjson) => {
            renderOverview(myjson);
        })
        .catch(function(err){
            console.warn("something went wrong. ", err);   
    });   
}

export async function getDetailData(hash){
    //replace special characters
    var name = hash.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '');
    //replace numbers with space, not with nothing for searching
    name = name.replace(/[0-9]/g, ' ');
    name = name.substring(0, 9);

    console.log(name);
    await fetch('https://swapi.co/api/people/?search=' + name)
        .then((response) => {                
            //handle client error with fetch
            if(response.ok) {
                return response.json();
            }else{
                return Promise.reject(response);
            }            })
        .then((myjson) => {
            renderDetails(myjson);
        })
        .catch(function(err){
            console.warn("something went wrong. ", err);   
    });  
}

//get a random page from the API
function randomAPIPage(maxNumberPages){
    var randomPageNumber = Math.floor((Math.random() * maxNumberPages) + 1);

    return randomPageNumber;
}