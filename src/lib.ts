


enum CTFType {
    DDos,
    passwordBrute,
    // Add the rest of these
}

interface CTF {
    uuid: string;
    value: string;
    type: CTFType;
}

interface User {
    name: string;
    uuid: string;
    points: number;
}

function makeUUID(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}





export { CTFType, CTF, User, makeUUID }