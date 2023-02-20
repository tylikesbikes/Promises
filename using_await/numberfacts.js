const numFact = document.querySelector('#numberfact');
const factTypeSelector = document.querySelector('#factTypeSelector');
const numText = document.querySelector('#num');
const factsList = document.querySelector('#factsList');
const giveMeFour = document.querySelector('#giveMeFour');

function addNewFactToList(fact) {
    const newLi = document.createElement('li');
    const thisFact = document.createTextNode(fact);
    newLi.appendChild(thisFact);
    factsList.appendChild(newLi);
}

async function getSingleFact() {
    try {
    const {data} = await axios.get(`http://numbersapi.com/${numText.value}/${factTypeSelector.value}?json`);
    
    addNewFactToList(data.text);
    } catch(err) {
    numFact.innerText = `Fail:  ${err}`;
    }
}


async function getMultipleFacts() {
    try {
    const {data} = await axios.get(`http://numbersapi.com/${numText.value}/${factTypeSelector.value}?json`)
    
    const theKeys = Object.keys(data);
    factsList.innerHTML='';
    for (let i = 0; i < theKeys.length; i++) {

        const newLi = document.createElement('li');
        let thisFact = document.createTextNode(`${data[theKeys[i]]}`);
        newLi.appendChild(thisFact);
        factsList.appendChild(newLi);
    }
    } catch(e) {
        console.log('Error: ',e);
    }
}

async function displayMultipleFactsOneNumber(howMany) {
    try {
        const factRequests = [];
        const url = `http://numbersapi.com/${numText.value}/${factTypeSelector.value}?json`;
        for (let i = 0; i < howMany; i++) {
            factRequests.push(axios.get(url));
        }

        factsList.innerHTML = '';
        factRequests.forEach(async (f) => {
            let {data:{text:fact}} = await f;
            addNewFactToList(fact);
        });
    } catch(err) {
        console.log('Error: ', err);
    }
}

function displayFacts() {
    if (numText.value.indexOf(',') >= 0 || numText.value.indexOf('..') >= 0) {
        getMultipleFacts();
        return 'multiple';
    }
    else if (giveMeFour.checked) {
        displayMultipleFactsOneNumber(4);
        return 'four';
    }
    else {
        getSingleFact();
        return 'single';
    }
}
