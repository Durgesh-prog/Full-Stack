const router = require('express').Router();
const {check,validationResult} = require('express-validator');
const UserModel = require('../models/User.js');
const bcrypt = require('bcryptjs');

router.post('/login',
[
	check("email","Please enter a valid Email").isEmail(),
	check("password","Please enter a valid password").isLength({
		min:6
	})
],
async (req,res) => {
	const errors = validationResult(req);
	
	if(!errors.isEmpty()){
		return res.status(400).json({
			errors:errors.array()
		});
	}
	console.log('No errors')
	const { email,password } = req.body;
	console.log(email)
	console.log(password)
	console.log('--------')
	
	try{
		let user = await UserModel.findOne({email}); 
		/* let user = await Users.find(user => user.email == email) 
		 */
		if(!user)
			return res.status(400).json({
				message:"User does not exist"
		});
		console.log(user)
		const isMatch = await bcrypt.compare(password,user.password);
		/* const isMatch = user.password === password; */
		console.log(isMatch)
		if(!isMatch){
			return res.status(400).json({
				message:"Incorrect Password !"
			});
		}
		
		return res.status(200).json({'username':user.username,'email':user.email});
	}catch(e){
		console.log(e);
		res.status(500).json({
			message:"server error"
		});
	} 
})

router.post('/signup',
[
	check("username","Please Enter a valid username")
	.not()
	.isEmpty(),
	check("email","Please enter a valid email")
	.isEmail(),
	check("password","Please enter a valid password")
	.isLength({min:6})
],
async (req,res) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.status(400).json({
			errors:errors.array()
		});
	}
	console.log('No errors ...')
	const {username,email,password} = req.body;
	console.log(username)
	console.log(email)
	console.log(password)
	try{
		let user = await UserModel.findOne({email}); 
		/* let user = await Users.find(user => user.email == email) 
		console.log(user) */
		if(user){
			return res.status(400).json({
				msg:"User Already Exists"
			});
		}
		
		user = new UserModel({
			username,
			email,
			password
		}); 
		
	/* 	user = {username,email,password} */
		console.log('created')
		console.log(user)
	  const salt = await bcrypt.genSalt(10);
		console.log('salt')
		console.log(salt)
		user.password = await bcrypt.hash(password,salt); 
		
		const savedUser = await user.save();
		 
		console.log('finally')
		console.log(savedUser)
		return res.sendStatus(200);		
	}catch(err){
		console.log(err.message);
		res.status(500).send("Error in Saving");
	}		
})

module.exports = router;