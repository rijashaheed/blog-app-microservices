const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const posts = {};

app.get("/posts", (req, res) => {
	res.send(posts);
});

app.post("/posts", (req, res) => {
	const id = randomBytes(4).toString("hex");
	console.log("indicator");
	console.log(req);
	const { title } = req.body;

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
