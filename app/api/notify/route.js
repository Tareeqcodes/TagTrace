
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request) {
  try {
    const { to, subject, message, itemName, scanTime } = await request.json();

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; color: white; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">🎯 TagTrace Alert</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">Your item has been found!</p>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #1f2937; margin-top: 0;">Good news! Someone found "${itemName}"</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
            <p style="color: #374151; line-height: 1.6; margin: 0;">
              ${message}
            </p>
          </div>
          
          <div style="margin: 20px 0; padding: 15px; background: #ecfdf5; border-radius: 8px;">
            <p style="margin: 0; color: #065f46;">
              <strong>📍 What happens next?</strong><br>
              The person who found your item can see your contact information and reach out to you directly.
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard" 
               style="background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View in Dashboard
            </a>
          </div>
        </div>
        
        <div style="padding: 20px; background: #e5e7eb; text-align: center; font-size: 12px; color: #6b7280;">
          <p>This is an automated message from TagTrace. Please do not reply to this email.</p>
          <p>Scanned at: ${scanTime}</p>
        </div>
      </div>
    `;

    const data = await resend.emails.send({
      from: 'TagTrace <noreply@yourdomain.com>',
      to: [to],
      subject: subject,
      html: emailHtml,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('Email sending failed:', error);
    return Response.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    );
  }
}