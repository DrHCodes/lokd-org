// api/submit-interest.js
// Deploy this on Vercel, Netlify, or any serverless platform

const sgMail = require('@sendgrid/mail');

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, phone, company, twitter, linkedin } = req.body;

    // Set SendGrid API key from environment variable
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Email to the user (auto-reply)
    const userEmail = {
      to: email,
      from: 'hello@getlokd.com', // Change this to your verified sender
      subject: '🔒 LØKD - You\'re Ready to Lock In',
      html: generateEmailTemplate(firstName, lastName),
    };

    // Email to yourself (notification of new lead)
    const adminEmail = {
      to: 'your-email@example.com', // Change to your email
      from: 'hello@getlokd.com',
      subject: `New LØKD Lead: ${firstName} ${lastName}`,
      html: `
        <h2>New Lead Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Twitter:</strong> ${twitter || 'Not provided'}</p>
        <p><strong>LinkedIn:</strong> ${linkedin || 'Not provided'}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      `,
    };

    // Send both emails
    await sgMail.send(userEmail);
    await sgMail.send(adminEmail);

    // Return success
    return res.status(200).json({ 
      success: true, 
      message: 'Interest received. Check your email!' 
    });

  } catch (error) {
    console.error('SendGrid error:', error);
    return res.status(500).json({ 
      error: 'Failed to process request',
      details: error.message 
    });
  }
}

function generateEmailTemplate(firstName, lastName) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Courier New', 'Roboto Mono', monospace;
      background-color: #000000;
      color: #00ff00;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      text-align: center;
      padding: 30px 0;
      border-bottom: 2px solid #00ff00;
    }
    .logo {
      font-size: 48px;
      font-weight: bold;
      letter-spacing: 8px;
      color: #00ff00;
      margin-bottom: 10px;
    }
    .tagline {
      font-size: 14px;
      color: #00ff00;
      opacity: 0.8;
    }
    .content {
      padding: 40px 0;
    }
    h1 {
      color: #FF4500;
      font-size: 32px;
      margin-bottom: 20px;
    }
    p {
      line-height: 1.8;
      margin-bottom: 20px;
      color: #00ff00;
    }
    .services-section {
      background-color: rgba(0, 255, 0, 0.05);
      border: 2px solid #00ff00;
      padding: 30px;
      margin: 30px 0;
    }
    .services-section h2 {
      color: #FF4500;
      font-size: 24px;
      margin-bottom: 20px;
    }
    .service-item {
      margin-bottom: 15px;
      padding-left: 20px;
      border-left: 3px solid #FF4500;
    }
    .service-title {
      color: #FF4500;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .service-desc {
      color: #00ff00;
      opacity: 0.8;
      font-size: 14px;
    }
    .b2b-section {
      background-color: rgba(255, 69, 0, 0.05);
      border: 2px solid #FF4500;
      padding: 30px;
      margin: 30px 0;
    }
    .b2b-section h2 {
      color: #FF4500;
      font-size: 24px;
      margin-bottom: 15px;
    }
    .b2b-section p {
      color: #00ff00;
      opacity: 0.9;
    }
    .footer {
      text-align: center;
      padding: 30px 0;
      border-top: 2px solid #00ff00;
      opacity: 0.6;
      font-size: 12px;
    }
    .cta {
      text-align: center;
      margin: 30px 0;
    }
    .cta-text {
      color: #FF4500;
      font-size: 18px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">LØKD</div>
      <div class="tagline">LOCK IN OR GET OUT</div>
    </div>

    <div class="content">
      <h1>Yo yo, ${firstName}!</h1>
      <p>We see you're ready to LØK IN. Our AI agent will reach out shortly to get you started.</p>
      <p>In the meantime, here's a recap of what LØKD offers:</p>

      <div class="services-section">
        <h2>LØKD B2C - Individual Automation</h2>
        
        <div class="service-item">
          <div class="service-title">WARDROBE AUTOMATION</div>
          <div class="service-desc">8 black tees, 8 black jeans, 2 Patagonias, 1 pair Hokas. TaskRabbit fits you once, we handle the rest.</div>
        </div>

        <div class="service-item">
          <div class="service-title">HYGIENE SCHEDULING</div>
          <div class="service-desc">Google Home yells at you twice daily to brush teeth and shower. Like mom, but dystopian.</div>
        </div>

        <div class="service-item">
          <div class="service-title">MEAL DECISION ENGINE</div>
          <div class="service-desc">DoorDash delivers optimized food to office or home. AI coordinates with your org's meals + dietary restrictions.</div>
        </div>

        <div class="service-item">
          <div class="service-title">LAUNDRY SERVICE</div>
          <div class="service-desc">TaskRabbit picks up weekly, we handle laundromat, TaskRabbit delivers back.</div>
        </div>

        <div class="service-item">
          <div class="service-title">CLEANING SERVICE</div>
          <div class="service-desc">3 hours weekly, deep clean, you focus on building.</div>
        </div>

        <div class="service-item">
          <div class="service-title">PROTEIN BAR DELIVERY</div>
          <div class="service-desc">We only stock 3 kinds. You don't get to pick. Delivered Monday 9:45pm.</div>
        </div>

        <div class="service-item">
          <div class="service-title">HOUSEHOLD ESSENTIALS</div>
          <div class="service-desc">3-in-1 everything, research-backed toothbrush, Lume deodorant. Auto-shipped weekly.</div>
        </div>

        <div class="service-item">
          <div class="service-title">FAMILY UPDATE TEXTS</div>
          <div class="service-desc">AI sends generic but loving weekly texts to your family.</div>
        </div>

        <div class="service-item">
          <div class="service-title">YOUTUBE DECISION ENGINE</div>
          <div class="service-desc">15-minute break content. Only founder podcasts, YC videos, tech talks.</div>
        </div>

        <div class="service-item">
          <div class="service-title">BOBA RUNS</div>
          <div class="service-desc">Late-night boba delivered as reward for locking in past 9pm.</div>
        </div>

        <div class="service-item">
          <div class="service-title">+ 3 MORE SERVICES</div>
          <div class="service-desc">Text auto-responder, auto-RSVP system, relationship manager.</div>
        </div>

        <p style="margin-top: 30px; text-align: center; color: #FF4500; font-weight: bold;">
          $2,997/month - Everything you need to stay locked in. No more. No less.
        </p>
      </div>

      <div class="b2b-section">
        <h2>LØKD B2B - Team Leaderboards</h2>
        <p>Want to 10x your entire team? LØKD B2B provides all the services above PLUS:</p>
        <p>✓ Real-time lock-in leaderboards - see who's actually shipping<br>
        ✓ Service adoption tracking - your teammate automated laundry and 10x'd? Join them.<br>
        ✓ Team dashboard - track who's locked in, who's slacking<br>
        ✓ Bulk automation for your humans</p>
        <p style="margin-top: 20px; color: #FF4500; font-weight: bold;">
          $2,997/seat/month - Your competitors are already using this.
        </p>
      </div>

      <div class="cta">
        <div class="cta-text">Stay tuned. We'll be in touch within 48 hours.</div>
        <p style="margin-top: 10px; font-size: 14px;">Questions? Reply to this email.</p>
      </div>
    </div>

    <div class="footer">
      © 2026 LØKD Systems Inc. · No work-life balance since 2026
    </div>
  </div>
</body>
</html>
  `;
}
