import {routing, refresh} from './modules/routing.js'
import {setOverviewLoading} from './modules/render.js'

init();

function init(){
    const detail = document.getElementById("details");

    //make sure detail is closed in the beginning
    detail.classList.add('hidden');

    refresh();
}

//set randomize button
document.getElementById('RandomButton').onclick = function(){
    setOverviewLoading();
    init();
}

routing();