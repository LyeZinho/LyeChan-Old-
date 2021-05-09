const fs = require("fs");

function readUserData(userId){
    fs.readFile(`./database/servers/${userId}`, "utf8", (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        };
        return JSON.parse(jsonString);
    });
};

function writeUserData(serverId, userData){
    const jsonString = JSON.stringify(userData)
    fs.writeFile(`./database/servers/${userId}`, jsonString, err => {
        if (err) {
            console.log('Error writing file', err);
        };
    });
};

module.exports = {
    readServerData();,
    writeServerData();
}