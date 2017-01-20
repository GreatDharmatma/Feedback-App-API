var Promise = require('bluebird');
var mongoose = require('mongoose');
require('mongoose-type-email');
var httpStatus = require('http-status');
var APIError = require('../helpers/APIError');
var bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
 	username: {
 		type: String,
 		required: true,
 		unique: true
 	},
 	firstName: {
 		type: String,
 		required: true
 	},
 	lastName: {
 		type: String,
 		required: true
 	},
 	email: {
 		type: mongoose.SchemaTypes.Email,
 		required: true
 	},
 	role: {
 		type: Number,
 		required: true,
 		default: 1
 	}
 	password: {
 		type: String,
 		required: true
 	}
 });

userSchema.pre('save', function(next){
	var user = this;

	bcrypt.genSalt(10, function(err, salt){
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash){
			if(err) return next(err);
			user.password = hash;
			next();
		});
	});
});

mongoose.model('UserModel', userSchema)