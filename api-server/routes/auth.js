import { SignJWT } from 'jose';

export const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  
  // Replace these credentials with secure ones
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
    const token = await new SignJWT({ username })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);
    
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};
