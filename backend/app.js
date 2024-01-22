const path = require("path");
const dotenv = require("dotenv");

const express = require("express");
const bodyParser = require("body-parser");

const databaseLogin = require("./database/index");
/**
 * .env added for hidden PORT urls
 * using bodyParser to format in Json
 * CORS errors added for api interaction on another client port 
 * database import for connection
 * App.listen for running server
 */

const app = express();

dotenv.config({ path: ".env" });
const PORT = process.env.PORT || 8000;
console.log("port", PORT);

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"OPTIONS, GET, POST, PUT, PATCH, DELETE"
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});

databaseLogin();

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
