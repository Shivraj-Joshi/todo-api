import { randomUUID } from 'crypto';


export function requestId(req, res, next) {

    const id = randomUUID();                    //generating random id
    req.id = id;                               // attaching that id to the request object so that other middlewarre can also use it.
    res.setHeader('X-request-Id', id);       // sending ID back to the client in response header 
    next();
}