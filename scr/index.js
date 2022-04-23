import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const usuarios = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
	const dadosUsuario = req.body;
	usuarios.push(dadosUsuario);
	res.send("ok");
});
app.post("/tweets", (req, res) => {
	const tweet = req.body;
	tweets.unshift(tweet);
	res.send("ok");
});
app.get("/tweets", (req, res) => {
	const lastTweets = [];
	tweets.forEach((dadosTweet, index) => {
		const { username, tweet } = dadosTweet;
		const fotoUsuario = usuarios.find(
			(usuario) => usuario.username === username,
		);
		if (index < 10) {
			lastTweets.push({ username, tweet, avatar: fotoUsuario.avatar });
		}
	});
	console.log(lastTweets);
	res.send(lastTweets);
});
app.listen(5000);
