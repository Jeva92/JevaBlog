import jwt from 'jwt-simple';

dotenv.config();

function generateToken(id) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: id, iat: timestamp }, process.env.JWT_SECRET);
}
