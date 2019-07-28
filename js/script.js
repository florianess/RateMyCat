let data = {}

function createElements() {
    data = JSON.parse(this.responseText);
}

let request = new XMLHttpRequest();

request.onload = function() { data = JSON.parse(this.responseText);};
request.open("get", "https://api.myjson.com/bins/raex9", true);
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
    frame.style.cursor = 'pointer';
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
        frame.style.cursor = 'default';
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
        xhr.open("PUT", 'https://api.myjson.com/bins/raex9', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));  
        console.log(data)
    }
}