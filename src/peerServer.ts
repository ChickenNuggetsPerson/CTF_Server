import express, { Express, Request, Response, Application } from "express";


const app: Application = express();
const port = 19134;

let address = "";
require("dns").lookup(
    require("os").hostname(),
    function (err: any, add: any, fam: any) {
        address = add;
        startPeerServer();
    }
);

function startPeerServer() {
    app.listen(port, () => {
        console.log(`Peer Server - Started at locataion ${address}:${port}`);

    });
}


export { startPeerServer };


