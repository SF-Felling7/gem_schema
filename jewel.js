var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

//field names

var character_Jewel = new Schema ({
  name: String,
  gem: String,
  estimated_value: String,
  rare: Boolean,
  date: Date
});


var jewel = mongoose.model('jewel', character_Jewel);

module.exports = jewel;
