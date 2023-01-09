const express = require('express')
const app = express()
const {Deta} = require('deta')
const deta = Deta("a0a1gvu6_joTnvV9r3SowFhCEJ6cKnPRBg9ZocrGw")

app.use(express.json())

// SET NAME OF DATABASE
const db = deta.Base("youtube")

// GET ALL DATA FROM DATABASE
app.get('/', async(req, res) => {
	const item = await db.fetch() 
	res.status(200).json({
		"data":item
	})

})


// ADD DATA WITH POST METHOD

app.post("/add",async(req,res)=>{
	try{
		const result = await db.insert({
			user:req.body.username,
			age:req.body.age
		})
		res.status(200).json({
			"msg":"data insert",
			"data":result
		})
	}catch(err){
		res.status(500).send(err)
	}
})

// UPDATE ITEM IN DATABASE
app.put("/edit/:id",async(req,res)=>{
	let id = req.params.id
	let ageedit = req.body.age
	let usernameedit = req.body.username

	const myupdate = {
		"age":ageedit,
		"user":usernameedit
	}

	try{
		const result = await db.update(myupdate,id)
		res.status(200).json({
			"msg":"Updated data success"
		})
	}catch(err){
		res.status(500).send(err)
	}
})


// UPDATE MANY 
app.put("/manyupdate",async(req,res)=>{
	let mybody = req.body
	console.log(mybody)
	try{
		const result = await db.putMany(mybody)
		res.status(200).json({
			"msg":"Updated manu succss"
		})
	}catch(err){
		res.status(500).send(err)
	}
})



// DELETE DATA
app.delete("/delete/:id",async(req,res)=>{
	let id = req.params.id
	console.log(id)
	try{
		const result = await db.delete(id)
		res.status(200).json({
			"msg":"DELETE succss"
		})
	}catch(err){
		res.status(500).send(err)
	}
})



// THIS FOR RUN LOCAL 
// app.listen(3000,()=>console.log("server at 3000"))


// export 'app'
// THIS FOR DEPLOY TO SERVER
module.exports = app