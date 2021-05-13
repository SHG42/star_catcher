const path = require ('path'); 
const express = require ('express'); 
const app = express(); 

const DIR = path.join(__dirname, '/public/')
app.use(express.static(DIR))
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("index");
})

const PORT = process.env.PORT || 8080;

app.listen (PORT, () => {});