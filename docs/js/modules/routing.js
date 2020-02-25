import {getOverviewData, getDetailData} from './api.js'
import {setOverviewLoading, setDetailLoading} from './render.js'

export function routing(){
    routie({
        'overview': () => {
        overview();
        },
        '/:name': () => {
            details();
        }
    });
}

export function details(){
    setDetailLoading();
    const detail = document.getElementById("details");
    const overview = document.getElementById("overview");

    //disable overview
    detail.classList.remove('hidden');
    overview.classList.add('hidden');

    //get current hash
    const hash = location.hash.toString();

    getDetailData(hash);
}

export function overview(){
    setOverviewLoading();
    refresh();
}

export function refresh(){
    const detail = document.getElementById("details");
    const overview = document.getElementById("overview");

    //disable details
    detail.classList.add('hidden');
    overview.classList.remove('hidden');

    getOverviewData();
}