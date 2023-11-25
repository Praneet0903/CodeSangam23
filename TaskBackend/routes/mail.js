const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'butcherjain@gmail.com',
    pass: 'MNNITisthebest'
  }
});

app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  // Define email data
  const mailOptions = {
    from: 'butcherjain@gmail.com',
    to,
    subject,
    text
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
      res.status(500).json({ error: 'Email not sent' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ success: 'Email sent successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
