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
  res.render("index", {firstMessage: "Fresh Food", secondMessage:"Comida feita a partir do zero", target:"#menu" });
});

app.get("/contact", (req,res)=> {
  res.render('contact', {firstMessage: "Contato", secondMessage:"Entre em contato conosco", target:"#contact-page"});
})

app.get("/menu", (req, res) => {
  res.render("menu", {firstMessage: "Cardápio", secondMessage:"Veja o nosso cardápio", target:"#menu"});
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
      user: "julie.weimann@ethereal.email", // 
      pass: "aS2Gzr3ndWcFTMVQnY", // 
    },

  });

  // send mail with defined transport object
  let mailOptions = {
    from: '"Panini website" <julie.weimann@ethereal.email>', // sender address
    to: "julie.weimann@ethereal.email", // list of receivers
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
      res.redirect("/contact")
    }else {
      transporter.sendMail(mailOptions, function(err,info){
        if(err){
          console.log(err);
        }else {      
          
          console.log("Email sent");
          res.redirect("/contact")
        }
      }) 
    }
  })



  
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
  console.log("Server has started");
});
