const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors()); // using it with express app as a middleware

const posts = {};

app.get("/posts", (req, res) => {
	res.send(posts); //request and respond both have body and status code
	//200 201 are successful therefore there must me body but in status code 400 etc request is not succesful so we would see the error there will be no body
});

app.post("/posts", (req, res) => {
	const id = randomBytes(4).toString("hex");
	console.log("indicator");
	console.log(req);
	const { title } = req.body; //normally request headers are read too

	posts[id] = {
		id,
		title,
	};

	res.status(201).send(posts[id]);
	//201 is used when we are creating an item and it has been created successfully
});

app.listen(4000, () => {
	console.log("listening at port 4000");
});
