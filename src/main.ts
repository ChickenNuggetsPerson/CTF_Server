import express, { Express, Request, Response, Application } from "express";
import session from "express-session";
declare module "express-session" {
    interface Session {
        isAdmin: boolean;
    }
}
import * as fs from 'fs';
import { AutoUpdater } from './autoUpdater';

let FileStore = require("session-file-store")(session);

const app: Application = express();
const port = 19134;

app.set("view engine", "pug");
app.set("views", "./src/views");
app.use("/static", express.static("./src/static"));

app.use(express.json());
let fileStoreOptions = {};
app.use(
    session({
        secret: "ctf server",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
        store: new FileStore(fileStoreOptions),
    })
);

function isAdmin(req: Request): Boolean {
    return req.session.isAdmin;
}

// Page Get Requests
app.get("/", (req: Request, res: Response) => {

});
app.get("/admin", (req: Request, res: Response) => {

});






let updater: AutoUpdater;

let address = "";
require("dns").lookup(
    require("os").hostname(),
    function (err: any, add: any, fam: any) {
        address = add;
        startServer();
    }
);

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
        "https://raw.githubusercontent.com/ChickenNuggetsPerson/TS_DuckExchange/main/package.json",
        "0 * 0 * * *"
    );

    app.listen(port, () => {
        console.log(`Server started at locataion ${address}:${port}`);

    });
}

/*

Systems:
    - Master Webserver
        - CTF Key Generators - Easily Definable
        - 

    - Peer Webserver
        - Recieves commands
        - 

*/
