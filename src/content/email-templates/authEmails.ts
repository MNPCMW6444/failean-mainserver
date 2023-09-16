export const signupreq = (url: string) => ({
    subject: "Activate your Failean Account",
    body: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-sizing: border-box;
        }
        .header, .footer {
            background-color: #8A307F;
            color: white;
            text-align: center;
            padding: 10px;
        }
        .content {
            padding: 20px;
        }
        a.activate-button {
            background-color: #ff6600;
            color: #ffffff;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 5px;
            display: inline-block;
            margin-bottom: 20px;
        }
        @media only screen and (max-width: 600px) {
            .container {
                padding: 15px;
            }
            .content {
                padding: 15px;
            }
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h2>Welcome to Failean!</h2>
    </div>

    <div class="content">
        <p>At Failean, we celebrate the learning journey inherent in failures. Our platform empowers entrepreneurs to fail fast, learn faster, and move closer to success. We're delighted that you've joined our community of innovative thinkers and doers.</p>
        
        <p>Activate your account by clicking on the button below:</p>

        <a href="${url}" class="activate-button">Activate My Account</a>

        <p>If you did not sign up for our platform, please disregard this email.</p>

        <p>Best regards,<br><strong>The Failean Team</strong></p>
    </div>

    <div class="footer">
        <p>&copy; 2023 Failean LLC, All rights reserved.</p>
    </div>
</div>

</body>
</html>
  `,
});

export const passreset = (url: string) => ({
    subject: "Failean Password Reset Request",
    body: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Failean Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-sizing: border-box;
        }
        .header, .footer {
            background-color: #8A307F;
            color: white;
            text-align: center;
            padding: 10px;
        }
        .content {
            padding: 20px;
        }
        a.button {
            background-color: #32CD32;
            color: white;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 5px;
            display: inline-block;
            margin-bottom: 20px;
        }
        @media only screen and (max-width: 600px) {
            .container {
                padding: 15px;
            }
            .content {
                padding: 15px;
            }
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h2>Reset Your Password</h2>
    </div>

    <div class="content">
        <p>We received a request to reset your password. Click the button below to set a new password:</p>
        <a href="${url}" class="button">Reset My Password</a>

        <p>If you did not request a password reset, please ignore this email.</p>

        <p>Best regards,<br><strong>The Failean Team</strong></p>
    </div>

    <div class="footer">
        <p>&copy; 2023 Failean LLC, All rights reserved.</p>
    </div>
</div>

</body>
</html>
    `,
});

export const websiteSignup = (url: string) => ({
    subject: "Activate your Failean Account",
    body: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Activate Your Failean Account</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-sizing: border-box;
        }
        .header, .footer {
            background-color: #8A307F;
            color: white;
            text-align: center;
            padding: 10px;
        }
        .content {
            padding: 20px;
        }
        a {
            color: blue;
        }
        a.button {
            background-color: #ff6600;
            color: white;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 5px;
            display: inline-block;
            margin-bottom: 20px;
        }
        @media only screen and (max-width: 600px) {
            .container {
                padding: 15px;
            }
            .content {
                padding: 15px;
            }
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h2>Welcome to Failean!</h2>
    </div>

    <div class="content">
        <p>At Failean, we celebrate the learning journey inherent in failures. Our platform empowers entrepreneurs to fail fast, learn faster, and move closer to success. We're delighted that you've joined our community of innovative thinkers and doers.</p>

        <p>Activate your account by clicking on the button below:</p>
        <a href="${url}" class="button">Activate My Account</a>

        <p>If you did not sign up for our platform, please disregard this email.</p>

        <p>Best regards,<br><strong>The Failean Team</strong></p>
    </div>

    <div class="footer">
        <p>&copy; 2023 Failean LLC, All rights reserved.</p>
    </div>
</div>

</body>
</html>
  `,
});

export const waitListReady = (name: string) => ({
    subject: "Your Exclusive Early Access is Now Ready!",
    body: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-sizing: border-box;
        }
        .header, .footer {
            background-color: #8A307F;
            color: white;
            text-align: center;
            padding: 10px;
        }
        .content {
            padding: 20px;
        }
        a {
            color: blue;
        }
        @media only screen and (max-width: 600px) {
            .container {
                padding: 15px;
            }
            .content {
                padding: 15px;
            }
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h2>Your Exclusive Early Access is Now Ready!</h2>
    </div>

    <div class="content">
        <p>Dear ${name === "Unknown" ? "Valued Customer" : name},</p>

        <p>I hope this email finds you well. I'm Michael, the CEO at Failean LLC. We are excited to announce that you now have exclusive early access to our highly-anticipated new product.</p>

        <p>To start exploring, simply head to <a href="https://failean.com">failean.com</a> and register for a new account.</p>

        <h3>Special Offer: 10,000 Free Credits</h3>
        <p>As an early adapter, you will receive 10,000 free credits, instead of the regular 1,000. This makes the product essentially free for you for now.</p>

        <h3>How to Provide Feedback</h3>
        <ol>
            <li>Use the product and explore its features.</li>
            <li>Work prompt-by-prompt instead of relying on "Run All" to refine each individual prompt result.</li>
            <li>Think about your overall experience and any improvements you'd like to see.</li>
            <li>Reply to this email with your observations and suggestions.</li>
        </ol>

        <p>Your feedback is invaluable to us. If you have any thoughts, questions, or encounter any issues, please don't hesitate to reply directly to this email. Our dedicated support team and I are standing by to assist you.</p>

        <p>The purpose of this early access is to help us refine the product based on quality feedback from users like you. We encourage you to be as detailed and candid as possible in your responses.</p>

        <p>Thank you for your ongoing support and enthusiasm. I'm excited to hear your thoughts!</p>

        <p>Best regards,<br>Michael<br>CEO, Failean LLC</p>
    </div>

    <div class="footer">
        <p>&copy; 2023 Failean LLC, All rights reserved.</p>
    </div>
</div>

</body>
</html>
  `,
});
