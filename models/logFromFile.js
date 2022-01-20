const fs = require('fs');
const path = require('path');

const pathToFile = path.join(path.dirname(require.main.filename), 'data', 'log.json');

module.exports = class Log {
    
    constructor(log){
        this.log = log;
    }

    saveLog(callback) {
        fs.readFile(pathToFile, (error, fileContent) => {
            let logs = [];
            
            if(!error) {
                logs = JSON.parse(fileContent);
            } else {
                console.log(error);
            }

            logs.push(this);

            fs.writeFile(pathToFile, JSON.stringify(logs), (error) => {
                console.log('Error', error);
                callback();
            });
        });
    }

    static fetchLogs(callback){
        fs.readFile(pathToFile, (error, fileContent) => {
            if(error){
                callback([]);
            }

            callback(JSON.parse(fileContent));
        });
    }
}