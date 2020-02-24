var numbersUsedList = [];
const numberOfPeople = 6;
var index = 1;

var randomNumber;

export function renderDetails(json){
    var data = {
        name: json.results[0].name,
        gender: json.results[0].gender,
        birthday: json.results[0].birth_year  
    }

    Transparency.render(document.getElementById("details"), data);
}

export function renderOverview(json){
    var values = [];
    numbersUsedList = [];

    //filter through data
    for(var i = 0; i < numberOfPeople; i++){
        //select current p through index
        var currentP = document.getElementById("a" + index);

        //get length since not every list is 10
        var length = json.results.length;

        var currentRandom = getRandomNumber(length);

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
    var data = {
        a1: values[0],
        a2: values[1],
        a3: values[2],
        a4: values[3],
        a5: values[4],
        a6: values[5]
    }

    Transparency.render(document.getElementById('overview'), data);
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