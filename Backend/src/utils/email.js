import { config } from "../config/config.js";

/**
 * Sends the password-reset email. If SMTP isn't configured, the link is
 * printed in the backend terminal instead (handy for local development).
 */
export async function sendResetPasswordEmail(toEmail, resetUrl) {
    if (!config.SMTP_HOST || !config.SMTP_USER || !config.SMTP_PASS) {
        console.log(`\n[Snitch] Password reset link for ${toEmail}:\n${resetUrl}\n(SMTP not configured, so no email was sent)\n`);
        return;
    }

    const nodemailer = (await import("nodemailer")).default;

    const transporter = nodemailer.createTransport({
        host: config.SMTP_HOST,
        port: Number(config.SMTP_PORT) || 587,
        secure: Number(config.SMTP_PORT) === 465,
        auth: { user: config.SMTP_USER, pass: config.SMTP_PASS }
    });

    await transporter.sendMail({
        from: `"Snitch" <${config.SMTP_USER}>`,
        to: toEmail,
        subject: "Reset your Snitch password",
        text: `Click the link below to reset your password (valid for 30 minutes):\n\n${resetUrl}\n\nIf you didn't request this, ignore this email.`,
        html: `<p>Click the link below to reset your password (valid for 30 minutes):</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>If you didn't request this, ignore this email.</p>`
    });
}
