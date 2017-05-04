
var express = require( 'express' );
var mongoose = require( 'mongoose' );
var Jewel = require( './jewel.js' );
var bodyParser = require( 'body-parser' );

var app = express();

app.use( bodyParser.json());


mongoose.connect( 'mongodb://localhost:27017/jewel_db');


app.get( '/jewelUser', function( req, res ) {

  //select/read
  Jewel.find({}, function( problem, jewelResults) {
    if ( problem ) {
      console.log( problem );
      res.sendStatus( 400 );
    }
    else {
      console.log('jewelResults', jewelResults);
      res.send( jewelResults );
    }
  });
});

app.post( '/jewelUser', function( req, res ) {
  console.log( 'in users post ->', req.body);

  var newUser = new Jewel({
    name: req.body.name,
    gem: req.body.gem,
    estimated_value: req.body.estimated_value,
    date: req.body.date
  });


  //insert/create
  newUser.save(function( err ) {
    if (err) {
      console.log(err);
      res.sendStatus( 400 );
    }
    else {
      console.log( 'new user created' );
      res.sendStatus( 200 );
    }
  });
});

app.delete( '/jewelUser/:id', function( req, res, err ) {

    Jewel.remove({_id: req.params.id}, function( err, response ) {
        if (err) {
          console.log( 'problem' );
          res.sendStatus(500);
        }
        else {
          console.log( 'working' );


          res.sendStatus( 200 );
        }
      });
});

app.put( '/jewelUser/:id', function( req, res ) {
  Jewel.update({_id: req.params.id}, {
    name: req.body.name,
    gem: req.body.gem,
    estimated_value: req.body.estimated_value,
    date: req.body.date
  }, function( err, response ) {
      if (err) {
        console.log( 'problem' );
        res.sendStatus(500);
      }
      else {
        console.log( 'working' );


        res.sendStatus( 200 );
      }
    });
});




app.listen( 3000, function() {
  console.log('listening on 3000!!');
});
