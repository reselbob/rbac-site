const express = require('express');
const app = express();
const path = require("path");
const {logger} = require("./logger");
const {getCssAsJson, applyJsonToCss} = require('./helpers/cssHelper')

process.title = 'simple_admin'

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

app.get('/api/css', async (req, res) => {
    const msg = await getCssAsJson();
    console.log(msg);
    res.status(200).send(msg);
});

app.post('/api/css', async(req, res) => {
    const data = req.body;
    logger.info(`Posting ${JSON.stringify(data)}`);

    try {
        await applyJsonToCss(data)
    } catch (e) {
        res.status(500).send({status: 500, message: e.message});
        return;
    }
    res.status(200).send({status: 200, message: 'OK'});
});

app.post('/api/login', async(req, res) => {
    const data = req.body;
    logger.info(`Posting ${JSON.stringify(data)}`);
    if((data.username && data.username .toLowerCase() === 'admin') && (data.password && data.password .toLowerCase() === 'cheese')){
        logger.info(`Posting ${data.username} logged in! `);
        res.status(200).send({status: 200, message: 'OK'});
        return;
    }
    res.status(500).send({status: 500, message: 'Not Implemented'});
});

server = app.listen(port, () => {
    logger.info(`Node server is running on port ${port} at ${new Date()}`);
});

const shutdown = () => {
    server.close()
}

module.exports = {server, shutdown};
