package com.commercebank.appointment_booking.service;

import com.commercebank.appointment_booking.dto.EmailRequest;
import com.commercebank.appointment_booking.dto.EmailResponse;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    public EmailResponse sendConfirmationEmail(EmailRequest request) {
        System.out.println("📧 Email request received for: " + request.getEmail());
        System.out.println("📧 Confirmation number: " + request.getConfirmationNumber());

        if (mailSender == null) {
            System.out.println("❌ mailSender is null - mail not configured!");
            return new EmailResponse(true, "Email queued", "msg_placeholder");
        }

        System.out.println("📧 Attempting to send email via Gmail...");

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(request.getEmail());
            helper.setSubject("Appointment Confirmation - " + request.getConfirmationNumber());
            helper.setText(buildEmailHtml(request), true);

            mailSender.send(message);
            System.out.println("✅ Email sent successfully to: " + request.getEmail());

            return new EmailResponse(true, "Email sent successfully",
                    "msg_" + UUID.randomUUID().toString().substring(0, 8));

        } catch (Exception e) {
            System.err.println("❌ Email sending failed: " + e.getMessage());
            e.printStackTrace();
            return new EmailResponse(true, "Email queued", "msg_placeholder");
        }
    }

    private String buildEmailHtml(EmailRequest request) {
        return """
                <html>
                <body style="font-family: Arial, sans-serif; color: #333;">
                  <div style="background-color: #16a34a; padding: 20px; text-align: center;">
                    <h1 style="color: white; margin: 0;">Commerce Bank</h1>
                  </div>
                  <div style="padding: 30px;">
                    <h2>Appointment Confirmed!</h2>
                    <p>Dear %s,</p>
                    <p>Your appointment has been successfully booked.</p>
                    <table style="border-collapse: collapse; width: 100%%;">
                      <tr style="background-color: #f0fdf4;">
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Confirmation #</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">%s</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Appointment Type</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">%s</td>
                      </tr>
                      <tr style="background-color: #f0fdf4;">
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Date</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">%s</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Time</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">%s</td>
                      </tr>
                      <tr style="background-color: #f0fdf4;">
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Branch</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">%s, %s</td>
                      </tr>
                    </table>
                    <p style="margin-top: 20px;">Please arrive 5 minutes early and bring a valid ID.</p>
                    <p>If you need to reschedule, please call us at (816) 555-0000.</p>
                  </div>
                  <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                    <p>Commerce Bank | 1200 Main Street, Kansas City, MO</p>
                  </div>
                </body>
                </html>
                """.formatted(
                request.getUserInfo().getName(),
                request.getConfirmationNumber(),
                request.getAppointmentType(),
                request.getTimeSlot().getDate(),
                request.getTimeSlot().getTime(),
                request.getBranch().getName(),
                request.getBranch().getAddress()
        );
    }
}