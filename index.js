var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var _ = require('underscore');
var mongoose = require('mongoose');
var dotenv = require('dotenv');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));
/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */
dotenv.load();
console.log(process.env.MONGODB);


mongoose.connect(process.env.MONGODB);

mongoose.connection.on('error', function() {
  console.log(process.env.MONGODB);
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

app.listen(process.env.PORT || 3000, function() {
    console.log('Listening!');
});

var schema= new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  address: {
      type: String,
      required: true
  },
  storetype: {
      type: String,
      required: true
  },
  pricerating: {
      type: Number,
      required: true
  },
  items: [String]
});


var Business = mongoose.model('Business', schema);
module.exports = { Business };

app.post('/addbusiness', function(req,res) {
  var mydata = new Business(req.body);
  console.log(mydata);
  mydata.save()
    .then( item => {
      console.log("item saved");
      res.render('add');
    })
    .catch( err => {
      console.log("didnt work");
    });
});

app.get('/',function(req, res) {
    Business.find({}, function(err, businesses){
        if (err) throw err;
        res.render('allbusiness', {
          business: businesses
        });
    });
})
app.get('/business/add', function(req,res){
    res.render('add');
});
//post request
app.post('/business', function(req, res) {
    // Create new movie
    var business = new Business({
        name: req.body.name,
        address: req.body.address,
        storetype: req.body.storetype,
        pricerating : parseInt(req.body.pricerating),
        items: []
    });

    // Save movie to database
    business.save(function(err){
        if (err) throw err;
        return res.send("Successfully inserted business :)");
    });
});

app.get('/business', function(req, res) {
    // Get all movies
    Business.find({}, function(err, businesses){
        if (err) throw err;
        res.send(businesses);
    });
});

//delete business by ID
app.delete('/business/:id', function(req, res) {
    // Find movie by id
    Business.findByIdAndRemove(req.params.id, function(err, business) {
    if (err) throw err;
    res.send('Business deleted!');
  });
});


//to get them by Address
app.get('/business/closest', function(req, res){
  Business.find({}, null, {sort: {address: 1}}, function (err, result) {
    business = result.filter(function(result){
      return result.address;
    });
    res.render('closest', {
      businesses:business
    })
  });
});


// //get the stores by price
app.get('/business/price', function(req, res){
  Business.find({},null, {sort: {pricerating: 1}}, function (err, result) {
    business = result.filter(function(result){
      return result.pricerating;
    });
    res.render('closest', {
      businesses:business
    })
  });
});


// //select a pricerating
app.get('/business/alphabetical', function (req, res){
  Business.find({},null, {sort: {name: 1}}, function (err, result) {
    business = result.filter(function(result){
      return result.pricerating;
    });
    res.render('closest', {
      businesses:business
    })
  });
});
