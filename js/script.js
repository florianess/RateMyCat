const BASE_URI = "https://www.jsonstore.io/5176ecaca7eb5c06027a54d0fcfb7ddd8f2a64a029db501862c2ab0c8e02ae02/"
const DATA_URI = BASE_URI + 'data'
const IGNORE_URI = BASE_URI + 'ignore'
let data = {}
let ignore = []
let request = new XMLHttpRequest();

request.onload = function() { data = JSON.parse(this.responseText).result; };
request.open("GET", DATA_URI, true);
request.send();

let ignoreRequest = new XMLHttpRequest();

ignoreRequest.onload = function() { ignore = JSON.parse(this.responseText).result; };
ignoreRequest.open("GET", IGNORE_URI, true);
ignoreRequest.send();

let canGoNext = true;
let isIgnore = false;
let note = 1;
let id = 0;

const stars = document.getElementById("stars");
const emptyStars = stars.innerHTML;

const photo = document.getElementById("photo");
const next = document.getElementById("next");
renderCat();

function fillStars(val) {
    for (let i = 0; i < 5; i++) {
        if (i < parseInt(val)) {
            const star = document.getElementById(i.toString(10));
            star.innerHTML = "★"   
        } else {
            const star = document.getElementById(i.toString(10));
            star.innerHTML = "☆"
        }
    }
    next.style.visibility = 'visible';
    photo.classList.add('pointer');
    note = parseInt(val);
    canGoNext = true;
};

function renderCat() {
    id = getRandom();
    photo.src = photo.src = `cats/cat.${id}.jpg`;
    stars.innerHTML = emptyStars;
    next.style.visibility = 'hidden';
    photo.classList.remove('pointer');
}

function newCat() {
    if (isIgnore) {
        renderCat();
        isIgnore = false;
    } else if (canGoNext) {
        save();
        renderCat();
        canGoNext = false;
    }
};

function save() {
    if (id !== 0) {
        if (data[id]) {
            data[id].note.push(note);
            sum = data[id].note.reduce(function(a, b) { return a + b; });
            data[id].mean = sum / data[id].note.length;
        } else {
            data = {...data, [id]: { note: [note], mean: note }};
        }
        let xhr = new XMLHttpRequest();
        xhr.open("POST", `${DATA_URI}/${id}`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data[id]));
    }
}

function getRandom() {
    let isValid = false;
    let newId;
    do {
        newId = Math.round(Math.random()*4000);
        isValid = !ignore.includes(id.toString(10));
    } while (!isValid);
    return newId
}

function ignoreCat() {
    ignore.push(id)
    let xhr = new XMLHttpRequest();
    xhr.open("POST", IGNORE_URI, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(ignore));
    isIgnore = true;
    newCat()
}