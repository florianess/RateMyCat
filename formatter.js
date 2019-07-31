const data = require('./data.json');
const fs = require('fs');


const newFormat = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: []
}
const keys = Object.keys(data)

const formatData = keys.reduce((acc, val) => {
    acc[Math.round(data[val].mean)].push(val);
    return acc
}, newFormat)

fs.writeFile("formatData.json", JSON.stringify(formatData), () => {});