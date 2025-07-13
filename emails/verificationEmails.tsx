interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      border: '1px solid #ddd',
      color: '#333'
    }}>
      <h2 style={{ color: '#1e90ff', textAlign: 'center' }}>🔐 Verify Your Account</h2>
      
      <p>Hello <strong>{username}</strong>,</p>
      
      <p>Thank you for signing up. To complete your registration, please use the OTP (One-Time Password) below to verify your email address:</p>
      
      <div style={{
        backgroundColor: '#1e90ff',
        color: 'white',
        fontSize: '24px',
        textAlign: 'center',
        padding: '15px',
        margin: '20px 0',
        borderRadius: '6px',
        letterSpacing: '3px',
        fontWeight: 'bold'
      }}>
        {otp}
      </div>
      
      <p>This OTP is valid for <strong>1 hour</strong>. If you did not request this, please ignore this email.</p>
      
      <p>Regards,<br /><strong>Your App Team</strong></p>
      
      <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid #ccc' }} />
      
      <small style={{ color: '#777' }}>
        If you have any issues, contact our support team.
      </small>
    </div>
  );
}
