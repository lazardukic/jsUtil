var fs = require("fs");
const logFilePath = "log.txt";

//function call
logData("Text");

// logs data
function logData(message) {
    let date = getDateString();
    fs.appendFile(logFilePath, date + " MESSAGE: " + message + "\r\n", function (err) {
        if (err) throw err;
        console.log(message);
    });
}

//gets date string
function getDateString() {
    let now = new Date();
    var retVal = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + "---" +
        now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    return retVal;
}
