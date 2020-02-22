passport              = require("passport"),
LocalStrategy         = require("passport-local"),
Token                 = require("../db/models/token"),
nodemailer            = require("nodemailer");

send_email = function(userId,link,content,email){
    // Generuj token
    const token = Math.floor(Math.random()*100000)
    const newToken = new Token({
        _userId:userId,
        token:token,
        createdAt: new Date()
      })
     newToken.save(err=>{
       if(err)throw err;
     })
   // Verification link
   const fullLink =link+token
            
   // Email content
   const fullContent = content + fullLink

    // Create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
           host: "smtp.gmail.com",
           port: 587,
           secure: false, 
           auth: {
               user: "feedtheyouth20@gmail.com", 
               pass: ">{%n.;jbCTAs7:&q" 
           },
           tls:{
             rejectUnauthorized:false
           }
       });

       // Send mail with defined transport object
       transporter.sendMail({
           from: "'FeedTheYouth' <feedtheyouth20@gmail.com>", 
           to: email, 
           subject: "Hello from TheFeedTheYouth", 
           text: "Hello again", 
           html: fullContent
       });
    }

module.exports = send_email;
