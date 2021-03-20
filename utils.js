const fs = require('fs');

const utils = {
    loadJson () {
        const rawData = fs.readFileSync('userInput.json');
        try {
            return JSON.parse(rawData);
        } catch (e) {
            throw e;
        }
    }
}
module.exports = utils;