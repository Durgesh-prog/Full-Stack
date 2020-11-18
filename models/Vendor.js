const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  items:{
	  type:Array,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const VendorModel = mongoose.model('VendorSchema', VendorSchema);

module.exports = VendorModel ;
