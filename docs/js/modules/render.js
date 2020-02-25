let numbersUsedList = [];
const numberOfPeople = 6;
let index = 1;

let randomNumber;

export function renderDetails(json){
    let data = {
        name: 'Name: ' + json.results[0].name,
        gender: 'Gender: ' + json.results[0].gender,
        birthday: 'Birthday: ' + json.results[0].birth_year,
        mass: 'Maxx(lbs): '  + calculateMass(json.results[0].mass)
    }

    Transparency.render(document.getElementById("details"), data);
}

export function renderOverview(json){
    let values = [];
    numbersUsedList = [];

    //filter through data
    for(let i = 0; i < numberOfPeople; i++){
        //select current p through index
        let currentP = document.getElementById("a" + index);

        //get length since not every list is 10
        const length = json.results.length;

        const currentRandom = getRandomNumber(length);

        //set href for each name for searching
        currentP.href = '#/' + json.results[currentRandom].name;

        values.push(json.results[currentRandom].name);

        //increase index to cycle through a's
        index++;
        //reset index to make sure it used the right a
        if(index > numberOfPeople){
            index = 1;
        }
    }
    //Transparency data object
    const data = {
        a1: values[0],
        a2: values[1],
        a3: values[2],
        a4: values[3],
        a5: values[4],
        a6: values[5]
    }

    Transparency.render(document.getElementById('overview'), data);
}

//give loading info in the overview page
export function setOverviewLoading(){
    const data = {
        a1: 'loading',
        a2: 'loading',
        a3: 'loading',
        a4: 'loading',
        a5: 'loading',
        a6: 'loading'
    }

    Transparency.render(document.getElementById('overview'), data);
}

//give loading info in the detail page
export function setDetailLoading(){
    const data = {
        name: 'loading',
        gender: 'loading',
        birthday: 'loading',
        mass: 'loading'
    }

    Transparency.render(document.getElementById('details'), data);
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

    if(randomNumber != null){
        return randomNumber;
    }
}

function calculateMass(kgMass){
    //check if mass is not in Api
    if(kgMass == 'unknown'){
        return 'unknown'
    }else{
        return (Math.round(kgMass * 2.204 * 100) / 100).toFixed(2);
    }
}