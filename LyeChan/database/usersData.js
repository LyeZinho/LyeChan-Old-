const fs = require("fs");

module.exports = function readUserData(userId){
    fs.readFile(`./database/users/${userId}`, "utf8", (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        };
        return JSON.parse(jsonString);
    });
};

module.exports = function writeUserData(userId, userData){
    const jsonString = JSON.stringify(userData)
    fs.writeFile(`./database/users/${userId}`, jsonString, err => {
        if (err) {
            console.log('Error writing file', err);
        };
    });
};
