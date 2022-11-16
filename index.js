const express = require('express');
const app = express();
const path = require("path");
const {logger} = require("./logger");

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
/**
 * Converts the request.rawHeaders array into a JSON object
 *
 * @param arr
 * @returns {{}} a JSON object that reports the raw header information
 * in the request
 */
const parseRawHeader = (arr)=> {
    let obj = {};
    let currentKey='';
    for(let i=0; i < arr.length; i++){
        if (i % 2 == 0){
            //this is the key
            currentKey = arr[i];
            obj[currentKey]='';
        }else
        {
            obj[currentKey]=arr[i]
        }
    }
    return obj;
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    const rawHeadersJson = parseRawHeader(req.rawHeaders);
    logger.info(JSON.stringify({requestInfo: rawHeadersJson}));
    next();
});



app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.SERVER_PORT || 8080;

app.get('/', (req, res) => {
    const fileSpec = '/public/index.html'
    logger.info(`Getting file ${fileSpec}`);
    res.sendFile(path.join(__dirname + fileSpec));
});

app.get('/admin', (req, res) => {
    const fileSpec = '/public/admin.html'
    logger.info(`Getting admin file ${fileSpec}`);
    res.sendFile(path.join(__dirname + fileSpec));
});

app.get('/api/css', (req, res) => {
    const msg = `Getting CSS values`;
    console.log(msg);
    res.status(200).send(msg);
});

app.post('/api/css', (req, res) => {
    const msg = `Getting CSS values`;
    console.log(msg);
    res.status(200).send(msg);
});

server = app.listen(port, () => {
    logger.info(`Node server is running on port ${port} at ${new Date()}`);
});
