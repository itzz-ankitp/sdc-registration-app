const functions = require(\'firebase-functions\');
const admin = require(\'firebase-admin\');
const cors = require(\'cors\')({ origin: true });
const { GoogleGenerativeAI } = require(\'@google/generative-ai\');
const sgMail = require(\'@sendgrid/mail\');

admin.initializeApp();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(functions.config().gemini?.key || process.env.GEMINI_API_KEY);

// Initialize SendGrid
if (functions.config().sendgrid?.key || process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(functions.config().sendgrid?.key || process.env.SENDGRID_API_KEY);
}

// SDC Chatbot Function
exports.sdcChatbot = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    if (req.method !== \'POST\') {
      return res.status(405).json({ error: \'Method not allowed\' });
    }

    try {
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: \'Message is required\' });
      }

      const model = genAI.getGenerativeModel({ model: \'gemini-pro\' });
      
      const prompt = `You are an AI assistant for the Software Development Club (SDC) recruitment. \n      \n      Key Information:\n      - Current recruitment status: ongoing\n      - Available roles: Tech team member, Design team member, Social media team member, Content team member\n      - President: Heerath Bhat\n      - Full name: Software Development Club\n      - The club focuses on software development, programming, and technology education\n      - We welcome students from all departments and years\n      - Regular workshops, hackathons, and coding sessions are conducted\n      \n      Please respond to the following query about SDC recruitment in a helpful and friendly manner: ${message}\n      \n      If the query is outside your scope or you cannot answer it, politely inform the user and suggest they use the Contact Us form for more specific inquiries.\n      \n      Keep responses concise but informative, and maintain an enthusiastic tone about the club.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      res.json({ response: text });
    } catch (error) {
      console.error(\'Error in chatbot function:\', error);
      res.status(500).json({ \n        error: \'I apologize, but I\\\'m having trouble processing your request right now. Please try again later or use the Contact Us form for assistance.\' \n      });
    }
  });
});

// Contact Form Email Function
exports.sendContactEmail = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    if (req.method !== \'POST\') {
      return res.status(405).json({ error: \'Method not allowed\' });
    }

    try {
      const { name, email, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ error: \'All fields are required\' });
      }

      // Validate email format
      const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: \'Invalid email format\' });
      }

      // Store inquiry in Firestore
      await admin.firestore().collection(\'contact_inquiries\').add({
        name,
        email,
        message,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        status: \'new\',
        source: \'contact_form\'
      });

      // Send confirmation email to user if SendGrid is configured
      if (functions.config().sendgrid?.key || process.env.SENDGRID_API_KEY) {
        const senderEmail = functions.config().sendgrid?.sender || process.env.SENDGRID_SENDER || \'noreply@sdc-easereg.firebaseapp.com\';
        
        const msgToUser = {
          to: email,
          from: senderEmail,
          subject: \'Thank you for contacting SDC!\',
          html: `
            <div style=\"font-family: \'Inter\', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0A0A0A; color: #F0F0F0; padding: 20px;\">
              <div style=\"text-align: center; margin-bottom: 30px;\">
                <h1 style=\"color: #8E2DE2; margin-bottom: 10px;\">Software Development Club</h1>
                <div style=\"width: 50px; height: 2px; background: linear-gradient(90deg, #8E2DE2, #00F0FF); margin: 0 auto;\"></div>
              </div>
              
              <h2 style=\"color: #8E2DE2; margin-bottom: 20px;\">Thank you for reaching out!</h2>
              
              <p style=\"color: #F0F0F0; line-height: 1.6; margin-bottom: 20px;\">Dear ${name},</p>
              
              <p style=\"color: #F0F0F0; line-height: 1.6; margin-bottom: 20px;\">
                We have received your message regarding: \n                <em style=\"color: #00F0FF;\">\"${message.substring(0, 100)}${message.length > 100 ? \'...\' : \'\'}\"</em>
              </p>
              
              <p style=\"color: #F0F0F0; line-height: 1.6; margin-bottom: 20px;\">
                Our team will get back to you within 24-48 hours. In the meantime, feel free to explore our registration portal and learn more about our ongoing recruitment.\n              </p>
              
              <div style=\"background: linear-gradient(135deg, #4A007F, #8E2DE2); padding: 20px; border-radius: 10px; margin: 30px 0;\">
                <h3 style=\"color: white; margin-bottom: 15px;\">Quick Info:</h3>
                <ul style=\"color: white; margin: 0; padding-left: 20px;\">
                  <li>President: Heerath Bhat</li>
                  <li>Recruitment Status: Ongoing</li>
                  <li>Available Roles: Tech, Design, Social Media, Content</li>
                </ul>
              </div>
              
              <p style=\"color: #F0F0F0; line-height: 1.6; margin-bottom: 30px;\">
                Best regards,<br>
                <strong style=\"color: #8E2DE2;\">The SDC Team</strong>
              </p>
              
              <div style=\"text-align: center; padding-top: 20px; border-top: 1px solid #333;\">
                <p style=\"color: #888; font-size: 12px;\">
                  © 2024 Software Development Club. All rights reserved.\n                </p>
              </div>
            </div>
          `
        };

        await sgMail.send(msgToUser);

        // Send email to owner with Google Form and tasks
        const ownerEmail = \'itsme.ankit2006@gmail.com\';
        const googleFormLink = \'YOUR_GOOGLE_FORM_LINK_HERE\'; // IMPORTANT: REPLACE WITH YOUR ACTUAL GOOGLE FORM LINK
        const tasksDetails = \'YOUR_TASKS_DETAILS_HERE\'; // IMPORTANT: REPLACE WITH YOUR ACTUAL TASKS DETAILS/LINK

        const msgToOwner = {
          to: ownerEmail,
          from: senderEmail,
          subject: `New Contact Inquiry from ${name} - SDC Registration Portal`,
          html: `
            <div style=\"font-family: \'Inter\', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0A0A0A; color: #F0F0F0; padding: 20px;\">
              <h2 style=\"color: #8E2DE2; margin-bottom: 20px;\">New Contact Inquiry Received!</h2>
              <p style=\"color: #F0F0F0; line-height: 1.6;\">You have received a new message from the SDC Registration Portal:</p>
              <ul style=\"color: #F0F0F0; line-height: 1.6; list-style-type: none; padding: 0;\">
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Message:</strong> ${message}</li>
              </ul>
              <p style=\"color: #F0F0F0; line-height: 1.6; margin-top: 20px;\">Please find the Google Form and tasks for the applicant below:</p>
              <p style=\"color: #00F0FF; line-height: 1.6;\">Google Form: <a href=\"${googleFormLink}\" style=\"color: #00F0FF; text-decoration: underline;\">${googleFormLink}</a></p>
              <p style=\"color: #00F0FF; line-height: 1.6;\">Tasks: ${tasksDetails}</p>
              <p style=\"color: #F0F0F0; line-height: 1.6; margin-top: 20px;\">Best regards,<br>SDC Registration Portal</p>
            </div>
          `
        };

        await sgMail.send(msgToOwner);
      }
      
      res.json({ 
        success: true, 
        message: \'Thank you for your message! We have received your inquiry and will get back to you soon.\' 
      });
    } catch (error) {
      console.error(\'Error sending email:\', error);
      res.status(500).json({ \n        error: \'We received your message but encountered an issue sending the confirmation email. Our team will still respond to your inquiry.\' \n      });
    }
  });
});

// Health check function
exports.healthCheck = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    res.json({ \n      status: \'healthy\', \n      timestamp: new Date().toISOString(),\n      service: \'SDC Registration App Functions\'
    });
  });
});

