require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const { Resend } = require('resend');

// Initialize express
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize Resend with your API key (from .env)
const resend = new Resend(process.env.RESEND_API_KEY);

// Handle form submission
app.post('/send-quote', async (req, res) => {
    const { name, email, message, phone } = req.body;

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev', // Or your verified sender address
            to: process.env.MY_MAIL,       // Your destination email
            subject: `Quote Request from ${name}`,
            html: `
                <h2>New Quote Request</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong> ${message}</p>
            `
        });

        res.send(`
            <script>
              alert("Quote request sent successfully!");
            //   window.location.href = "/";
            </script>
        `);
    } catch (error) {
        res.send("Email error:", error);
        res.status(500).send('Error in sending email: ' + error.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
