/* eslint-disable @typescript-eslint/no-explicit-any */
import { TContact } from './contact.interface';
import { Contact } from './contact.model';
import { sendEmail } from '../../utils/sendEmail';
import config from '../../config/config';

const createContactIntoDB = async (payload: TContact) => {
  const result = await Contact.create(payload);

  const subject = 'Thank You for Contacting Care Point Server!';

  const html = `
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background-color: rgb(246, 246, 246); text-align: center; padding: 20px;">
              <img src="https://res.cloudinary.com/softex-solution-podcast/image/upload/v1737364963/cmd_logo_m1lybt.png" alt="CMD Healthcare Services" style="max-width: 150px;">
          </div>
          <!-- Body -->
          <div style="padding: 20px; color: #333333;">
              <h1 style="font-size: 20px; margin-bottom: 15px;">Dear ${payload?.firstName},</h1>
              <p style="line-height: 1.6; margin-bottom: 20px;">Thank you for reaching out to Care Point Server. We have received your message and will get back to you as soon as possible.</p>
              <h2 style="font-size: 18px; margin-bottom: 15px;">Summary of Your Inquiry:</h2>
              <p style="line-height: 1.6; margin-bottom: 10px;"><strong>Reason:</strong> ${payload?.reason}</p>
              <p style="line-height: 1.6; margin-bottom: 10px;"><strong>Message:</strong> ${payload?.message}</p>
              <p style="line-height: 1.6;">If you have any additional questions or concerns, feel free to reply to this email.</p>
              <p style="margin-top: 20px;">Best regards,<br>The CMD Health Team.</p>
          </div>
          <!-- Footer -->
          <div style="text-align: center; background-color: #f4f4f4; padding: 20px; font-size: 12px; color: #888888;">
              <p style="margin: 0;">CMD Healthcare Services</p>
              <p style="margin: 10px 0;">
                  <a href="#" style="color: #6c5ce7; text-decoration: none; margin: 0 5px;">Privacy Policy</a> | 
                  <a href="#" style="color: #6c5ce7; text-decoration: none; margin: 0 5px;">Terms of Service</a> | 
                  <a href="#" style="color: #6c5ce7; text-decoration: none; margin: 0 5px;">Help Center</a>
              </p>
          </div>
      </div>
  </body>
  `;

  const adminSubject = 'Contact Form Submission Notification';

  const adminemail = config.admin_email;
  const now = new Date();
  const formattedDate = now.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const adminHtml = `
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9; color: #333; line-height: 1.6;">
  <table style="max-width: 600px; margin: 20px auto; background: #ffffff; border: 1px solid #dddddd; border-radius: 8px; width: 100%;">
    <tr>
      <td style="background: #4CAF50; color: #ffffff; padding: 15px; text-align: center; font-size: 20px; font-weight: bold; border-radius: 8px 8px 0 0;">
        New User Registration
      </td>
    </tr>
    <tr>
      <td style="padding: 20px;">
        <p style="margin: 0 0 10px;">Hello Admin,</p>
        <p style="margin: 0 0 10px;">A user has submitted a contact form:</p>
        <h2 style="font-size: 18px; margin-bottom: 15px;">Summary of Your Inquiry:</h2>
        <p style="margin: 0 0 10px;"><strong>Name:</strong>  ${payload.firstName}  ${payload.lastName}</p>
        <p style="margin: 0 0 10px;"><strong>Email:</strong> ${payload.email}</p>
              <p style="line-height: 1.6; margin-bottom: 10px;"><strong>Reason:</strong> ${payload?.reason}</p>
              <p style="line-height: 1.6; margin-bottom: 10px;"><strong>Message:</strong> ${payload?.message}</p>
        <p style="margin: 0 0 20px;"><strong>Timestamp:</strong> ${formattedDate}</p>
        
      </td>
    </tr>
    <tr>
      <td style="text-align: center; padding: 10px; background: #f1f1f1; font-size: 12px; color: #777; border-radius: 0 0 8px 8px;">
        This is an automated message. Please do not reply.
      </td>
    </tr>
  </table>
</body>`;

  sendEmail(subject, payload?.email, html);
  if (adminemail) {
    sendEmail(adminSubject, adminemail, adminHtml);
  }

  return result;
};

const getAllContactFromDB = async () => {
  const result = await Contact.find();
  return result;
};

export const ContactServices = {
  createContactIntoDB,
  getAllContactFromDB,
};
