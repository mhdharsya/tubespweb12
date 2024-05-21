var express = require('express');
require("dotenv").config();
var router = express.Router();

var app = express();
var api = require("./routes/api");

app.use(express.json());
app.use("/api",api);

app.get("/",(request, response) =>{
  response.json({welcome : "hello prisma"});
});

/* codingan 20 mei = untuk menampilkan di port 3000.*/
var PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
  console.log('server started on port ${PORT}');

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;


