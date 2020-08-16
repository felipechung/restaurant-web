require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");


const app = express();

app.set('view engine', 'ejs');

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
  res.render("index", {firstMessage: "Fresh Food", secondMessage:"Comida feita a partir do zero" });
});

app.get("/contact", (req,res)=> {
  res.render('contact', {firstMessage: "Contato", secondMessage:"Entre em contato conosco"});
})

app.get("/success", (req, res) => {
  res.render("success");
})

app.post("/contact", (req, res) => {
  const message = new Message ({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  })

  
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({    
    host: 'smtp.ethereal.email',
    port: 587,
    
    auth: {
      user: "dominique.gulgowski37@ethereal.email", // 
      pass: "tmw4kMUNzgMYCv9UzY", // 
    },

  });

  // send mail with defined transport object
  let mailOptions = {
    from: '"Panini website" <dominique.gulgowski37@ethereal.email>', // sender address
    to: "dominique.gulgowski37@ethereal.email", // list of receivers
    replyTo: req.body.email,
    subject: "Panini mensagem", // Subject line
    
    html: `<p>Nova mensagem recebida</p>
    <h3>Detalhes do contato</h3>
    <ul>
    <li>Nome: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Mensagem: ${req.body.message}</li>
    </ul>`, 
  };

  message.save(function(err){
    if(err){
      console.log(err);
    }else {
      transporter.sendMail(mailOptions, function(err,info){
        if(err){
          console.log(err);
        }else {      
    
          console.log("Email sent");
          
        }
      }) 
    }
  })



  
});


app.listen(3000, () => {
  console.log("listening on port 3000");
});
