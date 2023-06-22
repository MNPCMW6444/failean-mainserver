const signupreq = (url: string) => ({
  subject: "Activate your Failean Account",
  body: `<!DOCTYPE html>
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Activate Your Failean Account</title>
  </head>
  <body>
      <div style="font-family: Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 5px; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); background-color: #003399; color: #ffffff;">
          <h2>Welcome to Failean!</h2>

          <p>Hey! Congratulations on taking the first step towards epic fails and even more epic comebacks with Failean! We're thrilled to have you on board.</p>
  
          <p>Failean is designed to take your ideas, churn them through the wringer, and spit out a business plan that's been through the school of hard knocks. Market research, competitor analysis, problem and solution identification – we've got it all covered.</p>
  
          <div style="background-color: #0066cc; padding: 20px; border-radius: 5px">
              <p style="text-align: center;">So to activate your account by clicking on the button below:</p>
              <div style="text-align: center;">
                  <a href="${url}" style="background-color: #ff6600; color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 5px; display: inline-block; margin-bottom: 20px;">Activate My Account</a>
              </div>
          </div>
  
      </div>
      <div style="font-family: Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">        
          <p>If you did not sign up for our platform, please disregard this email.</p>
          <p>Best regards,</p>
          <p><strong>Team Failean</strong></p>
      </div>
  </body>
  </html>
  
  `,
});


const passreset = (url: string) => ({
  subject: "Failean Password Reset Request",
  body: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Failean Password</title>
    </head>
    <body>
        <div style="font-family: Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 5px; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); background-color: #003399; color: #ffffff;">
            <h2>Reset Your Password</h2>
            <p>We received a request to reset your password. Click the button below to set a new password:</p>
            <a href="${url}" style="background-color: #32CD32; color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 5px; display: inline-block; margin-bottom: 20px;">Reset My Password</a>

        </div>
<div style="font-family: Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <p>If you did not request a password reset, please ignore this email.</p>
            <p>Best regards,</p>
            <p><strong>Team Failean</strong></p>
            </div>
    </body>
    </html>
    `,
});

export { signupreq, passreset };
