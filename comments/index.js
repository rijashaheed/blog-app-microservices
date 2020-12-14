const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
	res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
	const commentId = randomBytes(4).toString("hex");
	const { content } = req.body;

	const comments = commentsByPostId[req.params.id] || []; //to see if there are any comments associated with the post and empty array if no comments attached. otherwise it would've returned undefined in case if no comments in a post.

	comments.push({ id: commentId, content });

	commentsByPostId[req.params.id] = comments; //for making sure that we've assigned comments to the original object.

	res.status(201).send(comments);
});

app.listen(4001, () => {
	console.log("listening at port 4001");
});
