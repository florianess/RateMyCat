let canGoNext = true;
let note = 1;

const stars = document.getElementById("stars");
const emptyStars = stars.innerHTML;

const photo = document.getElementById("photo");
photo.onclick = newCat;
newCat();

function fillStars(val) {
    for (let i = 0; i < parseInt(val); i++) {
        const star = document.getElementById(i.toString(10));
        star.innerHTML = "★"   
    }
    canGoNext = true;
};

function newCat() {
    if (canGoNext) {
        console.log("NOTE: ", note);
        const random = Math.round(Math.random()*4000);
        photo.src = photo.src = `cats/cat.${random}.jpg`;
        stars.innerHTML = emptyStars;
        canGoNext = false;
    }
};