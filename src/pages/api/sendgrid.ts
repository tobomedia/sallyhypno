// @ts-nocheck
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  try {
    await sendgrid.send({
      to: 'tobinsaunders@gmail.com',
      from: 'tobinsaunders@gmail.com', // Use the email address or domain you verified above
      subject: `Message from ${req.body.name} for hypnotherapy`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">
      
        <title>Sally Marsh Hypnotherapy</title>
        <meta name="description" content="The HTML5 Herald">
        <meta name="author" content="SitePoint">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      
        <link rel="stylesheet" href="css/styles.css?v=1.0">
      
      </head>
      
      <body>
        <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">              
              </div>
              <div class="container" style="margin-left: 20px;margin-right: 20px;">
              <h3>You've got a new mail from ${req.body.name}, their email is: ✉️${req.body.email} </h3>
              <div style="font-size: 16px;">
              <p>Message:</p>
              <p>${req.body.message}</p>
              <br>
              </div>
              </div>
              </div>
      </body>
      </html>`,
    }).then((d) => {
      console.log('response data success:', d[0]);
      if (d[0].statusCode && d[0].statusCode < 400) {
        res.status(200)
      }
    }, error => {
      console.error('Promise: ', error);


      if (error.response) {
        console.error('Promise response:', error.response.body)
      }
    });
  } catch (error) {
    console.log(JSON.stringify(error));
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: '' });
}

export default sendEmail;

export const config = {
  type: "experimental-background",
};
