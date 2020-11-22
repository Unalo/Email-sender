const nodeMailer = require('nodemailer');
const Mailgen = require("mailgen");

const {EMAIL, PASSWORD, MAIL_URL} = require("../config");

// Every time we need to send an email, we have to send it through a transporter
let transporter = nodeMailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
        user: EMAIL,
        pass: PASSWORD,
    },
});

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "mail-sender",
        link: MAIL_URL,
    }
});

const signup = (req, res) => {
    const {userMail, name} = req.body;

    // sign up user

    // send the Email 
    let response = {
        body: {
            name,
            intro: "Welcome to Ntenda logistics! We're very excited to have you on board.",
        },
    };

    // returns us with html format of the email.
    let mail = MailGenerator.generate(response);

    let message = {
        from: EMAIL,
        to: userMail,
        subject: "signup successful",
        html: mail, 
    };

    transporter 
        .sendMail(message)
        .then(() => {
            return res
                .status(200)
                .json({msg: "you should recieve an email from us"});
        })
        .catch((error) => console.log(error));
};

const getBill = (req, res) => {
    const { name, userEmail } = req.body;
  
    let response = {
      body: {
        name,
        intro: "Your bill has arrived!",
        table: {
          data: [
            {
              item: "MERN stack book",
              description: "A mern stack book",
              price: "$10.99",
            },
          ],
        },
        outro: "Looking forward to do more business with you",
      },
    };
  
    let mail = MailGenerator.generate(response);
  
    let message = {
      from: EMAIL,
      to: userEmail,
      subject: "transaction",
      html: mail,
    };
  
    transporter
      .sendMail(message)
      .then(() => {
        return res
          .status(200)
          .json({ msg: "you should receive an email from us" });
      })
      .catch((error) => console.error(error));
  };
  
  module.exports = {
    signup,
    getBill,
  };