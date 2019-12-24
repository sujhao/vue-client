
const minify = require('html-minifier').minify;

const fs = require("fs")

let htmlPath = process.argv[2]
console.log("htmlPath", htmlPath)
let htmlStr =  fs.readFileSync(htmlPath).toString()
htmlStr = minify(htmlStr, { removeComments: true, collapseWhitespace: true, minifyJS: true, minifyCSS: true })
fs.writeFileSync(htmlPath, Buffer.from(htmlStr))