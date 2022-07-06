const mongoose = require("mongoose");


var User = mongoose.Schema({
  Name: { type:String, required: true },
  Email: { type: String, unique: true, required: true,  unique: true },
  Password: { type:String, required: true },
  Phone: { type: Number, required: true },
  CreatedAt: {
    type: Date, default: Date.now
  }
});

// Model
var user = mongoose.model('user', User, "users");

// compile schema to model

module.exports = user