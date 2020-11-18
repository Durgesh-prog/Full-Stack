const router = require('express').Router();
const {check,validationResult} = require('express-validator');
const VendorModel = require('../models/Vendor.js');
const bcrypt = require('bcryptjs');


router.post('/login',
[
	check("mobile","Please enter a valid Mobile Number").isLength({min:10,max:10}),
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
	const { mobile,password } = req.body;
	console.log(mobile)
	console.log(password)
	console.log('--------')
	
	try{
		let vendor = await VendorModel.findOne({mobile}); 
		/* let user = await Users.find(user => user.email == email) 
		 */
		if(!vendor)
			return res.status(400).json({
				message:"Vendor does not exist"
		});
		console.log(vendor)
		const isMatch = await bcrypt.compare(password,vendor.password);
		/* const isMatch = user.password === password; */
		console.log(isMatch)
		if(!isMatch){
			return res.status(400).json({
				message:"Incorrect Password !"
			});
		}
		return res.status(200).json({'username':vendor.username});
	}catch(e){
		console.log(e);
		res.status(500).json({
			message:"server error"
		});
	} 
})

router.post('/signup',
[
	check("mobile","Please Enter a valid Mobile Number")
	.not()
	.isEmpty().isLength({min:10,max:10}),
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
	const {mobile,password,username} = req.body;
	console.log(mobile)
	console.log(password)
	console.log(username)
	try{
		let vendor = await VendorModel.findOne({mobile}); 
		/* let user = await Users.find(user => user.email == email) 
		console.log(user) */
		if(vendor){
			return res.status(400).json({
				msg:"Vendor Already Exists"
			});
		}
		
		vendor = new VendorModel({
			mobile,
			password,
			username
		}); 
		
	/* 	user = {username,email,password} */
		console.log('created')
		console.log(vendor)
	  const salt = await bcrypt.genSalt(10);
		console.log('salt')
		console.log(salt)
		vendor.password = await bcrypt.hash(password,salt); 
		
		const savedUser = await vendor.save();
		 
		console.log('finally')
		console.log(savedUser)
		return res.sendStatus(200);		
	}catch(err){
		console.log(err.message);
		res.status(500).send("Error in Saving");
	}		
})

router.get('/list',(req,res) => {
	console.log(req.body);
	let itemList = [{
					   'Title':'some title',
						'Description':'some description',
						'Price':123
					},
					{
					   'Title':'some title',
						'Description':'some description',
						'Price':123
					}]	
	res.json({itemList});
})

module.exports = router;