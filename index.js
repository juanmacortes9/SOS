const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var app = express();
const divorcesAPI = require(path.join(__dirname,"./src/back/divorcesAPI"));

app.use(bodyParser.json());



var port = process.env.PORT || 80;


divorcesAPI(app);


app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");