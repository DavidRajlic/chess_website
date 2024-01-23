var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://davidbujic:david4520326@cluster0.23b0l6h.mongodb.net/Website');
var db = mongoose.connection;
db.on('error', console.log.bind(console, "Napaka v povezavi"));
db.once('open', function(callback){
	console.log("Povezava uspešna");
})

var app=express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
	return res.redirect("home.html");
}).listen(3000)

app.get("/sign_up", function (req, res) {
	res.redirect("signup.html");
});

app.post('/sign_up', async function (req, res) {
	var data = {
		"username": req.body.username,
		"password": req.body.password,
	}

	const user = await db.collection('Users').findOne({ username: req.body.username });

	if (!user) {
		await db.collection('Users').insertOne(data, function (err, collection) {
			if (err) throw err;
			console.log("Zapis uspešno vstavljen");
		});
		
		return await res.redirect('welcome.html');
	}
	else {
		return res.status(400).send({ message: 'Uporabnik že obstaja!' });
	}
});

app.get("/login", function (req, res) {
	res.redirect("login.html");
});

app.post('/login', async function (req, res) {
	try {
		const user = await db.collection('Users').findOne({ username: req.body.username });

		if (user) {
			if (user.password === req.body.password) {
				console.log("Uporabnik obstaja!\n");
				return await res.redirect('welcome.html');
			}
			else {
				res.status(401).send({ message: 'Gesli se ne ujemata!' });
			}
		}
		else {
			res.status(404).send({ message: 'Uporabniško ime ne obstaja!' });
		}
	}
	catch(err) {
		console.log(err);
	}
});

app.get("/logout", function (req, res) {
	console.log("Uporabnik se je odjavil!")
	res.redirect("/");
});