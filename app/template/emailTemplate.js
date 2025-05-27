export const emailTemplate = (firstName, lastName, email, phone, subject, message) => {
  // Sanitize inputs to prevent XSS
  const sanitize = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  // Format phone number if provided
  const formatPhone = (phone) => {
    if (!phone || phone === 'Not provided') return 'Not provided';
    return sanitize(phone).replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };

  // Current date for the email
  const currentDate = new Date().toLocaleString();

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Message</title>
  <style>
    body {
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #193432;
      color: white;
      padding: 25px 20px;
      text-align: center;
    }
    .header h2 {
      margin: 0;
      font-size: 22px;
    }
    .content {
      padding: 25px;
    }
    .field {
      margin-bottom: 18px;
      display: flex;
      flex-wrap: wrap;
    }
    .label {
      font-weight: 600;
      color: #193432;
      width: 100px;
      flex-shrink: 0;
    }
    .value {
      flex: 1;
      min-width: 200px;
    }
    .message-content {
      background: #f9f9f9;
      padding: 15px;
      border-radius: 5px;
      margin-top: 10px;
      white-space: pre-wrap;
      line-height: 1.5;
    }
    .footer {
      text-align: center;
      padding: 15px;
      font-size: 12px;
      color: #777777;
      border-top: 1px solid #eeeeee;
      background: #fafafa;
    }
    @media only screen and (max-width: 480px) {
      .container {
        margin: 10px;
        border-radius: 0;
      }
      .field {
        flex-direction: column;
      }
      .label {
        width: 100%;
        margin-bottom: 5px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Message From Your Portfolio</h2>
    </div>
    
    <div class="content">
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${sanitize(firstName)} ${sanitize(lastName)}</div>
      </div>
      
      <div class="field">
        <div class="label">Email:</div>
        <div class="value">
          <a href="mailto:${sanitize(email)}">${sanitize(email)}</a>
        </div>
      </div>
      
      <div class="field">
        <div class="label">Phone:</div>
        <div class="value">${formatPhone(phone)}</div>
      </div>
      
      <div class="field">
        <div class="label">Subject:</div>
        <div class="value">${sanitize(subject)}</div>
      </div>
      
      <div class="field">
        <div class="label">Message:</div>
        <div class="value">
          <div class="message-content">${sanitize(message)}</div>
        </div>
      </div>
    </div>
    
    <div class="footer">
      <p>This message was sent from your portfolio contact form on ${currentDate}</p>
      <p>© ${new Date().getFullYear()} Your Portfolio. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
};