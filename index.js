const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb+srv://admin-felipe:1512@cluster0.hv43z.mongodb.net/paniniDB', {useNewUrlParser: true, useUnifiedTopology: true});


const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }  
});

const Message = mongoose.model('Message', messageSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/contact", (req,res)=> {
  res.sendFile(__dirname + "/public/contact.html")
})

app.post("/contact", (req, res) => {
  const message = new Message ({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  })

  message.save(function (err){
    if(!err){
      res.redirect("/contact");
    }
  }) 


  
});


app.listen(3000, () => {
  console.log("listening on port 3000");
});
