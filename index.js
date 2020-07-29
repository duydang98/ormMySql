var express = require('express');
var app = new express();
var port = 3000;
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
var stripe = require('stripe')(process.env.STRIPE_SECRET);

// stripe.customers.create({
//   email: 'customer@example.com',
// })
//   .then(customer => console.log(customer.id))
//   .catch(error => console.error(error));


var sequelize = require('./configs/conection');
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

app.post('/stripe',(req,res)=>{
  stripe.charges.create(
    {
      amount: 2000,
      currency: 'usd',
      source: 'tok_amex',
      description: 'My First Test Charge (created for API docs)',
    },
    function(err, charge) {
      res.json(charge);
    }
  );
});

app.get('/stripe/:id',(req,res)=>{
  var id = req.params.id;
  stripe.charges.retrieve(id,
    function(err, charge) {
      res.json(charge);
    }
  );
});

app.post('/stripe/:id',(req,res)=>{
  var id = req.params.id;
  stripe.charges.update(id,
    {metadata: {order_id: '1234'}},
    function(err, charge) {
      res.json(charge);
    }
  );
});



var userRoute = require('./routes/user.route');

app.use('/api',userRoute);

app.listen(port,()=>{
    console.log("server running on port " + port );
});

