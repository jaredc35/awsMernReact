exports.registerEmailParams = (email, token) => {
  return {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [email]
    },
    ReplyToAddresses: [process.env.EMAIL_TO],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<html>
          <body>
          <h1>Verify your email address</h1>
          <p>Please use the following link to complete your registration:</p>
          <p><a href='${process.env.CLIENT_URL}/auth/activate/${token}'>Registration Link</a></p>
          </body>
      </html>`
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Complete your registration"
      }
    }
  };
};

exports.forgotPasswordEmailParams = (email, token) => {
  return {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [email]
    },
    ReplyToAddresses: [process.env.EMAIL_TO],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<html>
          <body>
          <h1>Reset Password Link</h1>
          <p>Please use the following link to reset your password:</p>
          <p><a href='${process.env.CLIENT_URL}/auth/password/reset/${token}'>Reset Password Link</a></p>
          </body>
      </html>`
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Reset Your Password"
      }
    }
  };
};
