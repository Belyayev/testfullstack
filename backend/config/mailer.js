const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const API_HOST = "https://freeshoppinglist.vercel.app/";

const mailer = async (req, res) => {
  function getMessage() {
    let sendTo = "";
    let emailSubject = "";
    let emailText = "";
    let emailHTML = "";

    if (req.flag === "registration") {
      sendTo = req.user.email;
      emailSubject = "Welcome to FreeShoppingList!";
      emailText = `Hi, ${req.user.name}!
                  Welcome to FreeShoppingList!
                  https://freeshoppinglist.vercel.app`
      emailHTML = `<h1>Hi, ${req.user.name}!</h1>
                  <h3>Welcome to FreeShoppingList!</h3>
                  <p>https://freeshoppinglist.vercel.app</p>`;
    }

    if (req.flag === "passwordresetrequest") {
      sendTo = req.user.email;
      emailSubject = "Password reset FreeShoppingList";
      emailText = `Hi, ${req.user.name}!
                  You requested to reset your password.
                  Please, click the link below to reset your password
                  ${API_HOST}passwordreset/${req.resetToken}/${req.user._id}`;
      emailHTML = `<h1>Hi, ${req.user.name}!</h1>
                  <h3>You requested to reset your password.</h3>
                  <h3>Please, click the link below to reset your password</h3>
                  ${API_HOST}passwordreset/${req.resetToken}/${req.user._id}`;
    }

    if (req.flag === "passwordresetsuccess") {
      sendTo = req.user.email;
      emailSubject = "Password reset successful.";
      emailText = `Hi, ${req.user.name}!
                  Your password was reset!`;
      emailHTML = `<h1>Hi, ${req.user.name}!</h1>
                  <h3>Password reset successful.</h3>`;
    }

    if (req.flag === "addshare") {
      sendTo = req.email;
      emailSubject = "List was shared with you";
      emailText = `Hi there!
                  ${req.user.name} have shared a list "${req.list.listName}" with you 
                  ${API_HOST}shared/${req.list._id}`;
      emailHTML = `<h1>Hi, there!</h1>
                  <h3>${req.user.name} have shared a list "${req.list.listName}" with you </h3>
                  <h3>${API_HOST}shared/${req.list._id}</h3>`;
    }

    return {
      to: sendTo,
      from: "Free.Shopping.List@gmail.com",
      subject: emailSubject,
      text: emailText,
      html: emailHTML,
    };
  }

  async function sendEmail() {
    try {
      await sgMail.send(getMessage());
      console.log("Email is sent!");
    } catch (error) {
      console.error("Error sending email");
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  }

  (async () => {
    console.log("Sending email ...");
    await sendEmail();
  })();
};

module.exports = mailer;
