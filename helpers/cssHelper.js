const { toJSON, toCSS } = require('cssjson');
const fs = require('fs');
const path = require("path");
const {logger} = require("../logger");

const getCssAsJson = async()=> {
    // get the CSS file
    const fileSpec = '/public/styles.css'
    logger.info(`Getting the css file ${fileSpec}`);
    const css = await fs.promises.readFile(path.resolve(__dirname, '../public/styles.css'));
    const json = toJSON(css);

    const obj = {};
    obj.backgroundColor = json.children.body.attributes['background-color'];
    obj.fontColor = json.children.body.attributes.color;
    obj.fontSize = json.children.body.attributes['font-size'];
    obj.headingFontColor = json.children.h1.attributes.color;
    obj.headingFontSize = json.children.h1.attributes['font-size'];

    return obj;
}

const applyJsonToCss = async(data)=> {
    // get the CSS file
    const fileSpec = '/public/styles.css'
    logger.info(`Getting the css file ${fileSpec}`);
    const css = await fs.promises.readFile(path.resolve(__dirname, '../public/styles.css'));
    const json = toJSON(css);

    json.children.body.attributes['background-color'] = data.backgroundColor;
    json.children.body.attributes.color = data.fontColor;
    json.children.body.attributes['font-size'] = data.fontSize;
    json.children.h1.attributes.color  = data.headingFontColor;
    json.children.h1.attributes['font-size'] = data.headingFontSize

    let newCss
    try {
        newCss = toCSS(json);
    } catch (e) {
        logger.error(e.message)
        throw e;
    }
    await fs.promises.writeFile(path.resolve(__dirname, '../public/styles.css'), newCss)
        .catch(e => {
            logger.error(e.message)
            throw e;
        });
}

module.exports = {getCssAsJson, applyJsonToCss}
