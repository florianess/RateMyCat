let API_URI = "https://www.jsonstore.io/5176ecaca7eb5c06027a54d0fcfb7ddd8f2a64a029db501862c2ab0c8e02ae02/data"
let data = {}

let request = new XMLHttpRequest();

request.onload = function() { data = JSON.parse(this.responseText).result; };
request.open("GET", API_URI, true);
request.send();

let canGoNext = true;
let note = 1;
let id = 0;

const stars = document.getElementById("stars");
const emptyStars = stars.innerHTML;

const photo = document.getElementById("photo");
const frame = document.getElementById("frame");
const next = document.getElementById("next")
frame.onclick = newCat;
photo.onmouseenter = zoomphoto
newCat();

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
    frame.classList.add('pointer');
    note = parseInt(val);
    canGoNext = true;
};

function newCat() {
    if (canGoNext) {
        console.log(id, ' NOTE: ', note);
        save()
        id = Math.round(Math.random()*4000);
        photo.src = photo.src = `cats/cat.${id}.jpg`;
        stars.innerHTML = emptyStars;
        next.style.visibility = 'hidden';
        frame.classList.remove('pointer');;
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
        xhr.open("POST", `https://www.jsonstore.io/5176ecaca7eb5c06027a54d0fcfb7ddd8f2a64a029db501862c2ab0c8e02ae02/data/${id}`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data[id]));
    }
}