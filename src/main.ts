import * as fs from 'fs';
import { AutoUpdater } from './autoUpdater';

let updater: AutoUpdater;

async function printAnimation() {
    return new Promise((resolve) => {
        let text = fs.readFileSync("./src/assets/logo.txt", "utf-8");
        let split = text.split("\n");
        for (let i = 0; i < split.length; i++) {
            setTimeout(() => {
                console.log(split[i]);
                if (i == split.length - 1) {
                    resolve(true);
                }
            }, 100 * i);
        }
    });
}


async function startServer() {
    await printAnimation();

    updater = new AutoUpdater(
        "https://raw.githubusercontent.com/ChickenNuggetsPerson/CTF_Server/main/package.json",
        "0 * 0 * * *"
    );

    let isMaster = true;

    if (isMaster) {
        let master = require("./masterServer") // Esentially Runs the master server js file
    } else {
        let peer = require("./peerServer")
    }
    
}
startServer();

/*

Systems:
    - Master Webserver
        - CTF Key Generators - Easily Definable
        - 

    - Peer Webserver
        - Recieves commands
        - Does whatever you need to it
        

    CTFs are submitted to the master server
        points are awared to the user

*/
