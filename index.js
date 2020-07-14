var express = require('express');
var app = new express();
var port = 3000;
var bodyParser = require('body-parser');

var sequelize = require('./database/conection');
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/',(req,res)=>{
    res.render("index");
});

var userRoute = require('./routes/user.route');

app.use('/api',userRoute);

app.listen(port,()=>{
    console.log("server running on port " + port );
});

