require("dotenv").config()
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// Initialize express
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up a route to handle form submission
app.post('/send-quote', (req, res) => {
    res.send("its working!!")
    const { name, email, message, phone } = req.body;

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Use the email service of your choice
        auth: {
            user: process.env.MY_MAIL,  // Replace with your email
            pass:  process.env.APP_PASS  // Replace with your email password or app-specific password
        }
    });

    // Define the email content
    let mailOptions = {
        from: 'spamsuri@gmail.com', // Replace with your email
        to: process.env.MY_MAIL, // Replace with the email you want to send to
        subject: 'Quote Request from ' + name,
        html: `
            <h2>New Quote Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong> ${message}</p>
        `
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error in sending email: ' + error);
        }
        res.send(`
            <script>
              alert("Quote request sent successfully!");
              window.location.href = "/";
            </script>
          `);
          
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
