import express, { Express, Request, Response, Application } from "express";
import session from "express-session";
declare module "express-session" {
    interface Session {
        isAdmin: boolean;
    }
}

function isAdmin(req: Request): Boolean {
    return req.session.isAdmin;
}



const app: Application = express();
const port = 8080;

let FileStore = require("session-file-store")(session);

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


let address = "";
require("dns").lookup(
    require("os").hostname(),
    function (err: any, add: any, fam: any) {
        address = add;
        startMaster();
    }
);

import { genCTF } from "./lib";

function startMaster() {
    
    app.listen(port, () => {
        console.log(`Master Server - Started at locataion ${address}:${port}`);
        console.log(genCTF())
    });
    
}

export { startMaster }
