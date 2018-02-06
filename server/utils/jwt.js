import jwt from 'jwt-simple';
import dotenv from 'dotenv';

dotenv.config();

function generateToken(id, accountType) {
  const timestamp = new Date().getTime();
  const expire = new Date(timestamp + diff*1440)
  return jwt.encode({ sub: id, iat: timestamp, exp: expire, account: accountType }, process.env.JWT_SECRET);
}

export async function requireUser(req, res, next) {
  try {
    await requireAuth(req, res, next, 'user');
  } catch(err) {
    console.log(err);
    return res.status(500).send('Something broke in the backend')
  }
}

export async function requireModerator(req, res, next) {
  try {
    return await requireAuth(req, res, next, 'moderator');
  } catch(err) {
    console.log(err);
    return res.status(500).send('Something broke in the backend')
  }
}

export async function requireAdmin(req, res, next) {
  try {
    await requireAuth(req, res, next, 'admin');
  } catch(err) {
    console.log(err);
    return res.status(500).send('Something broke in the backend')
  }
}

async function requireAuth(req, res, next, userType) {
  if (!req.headers.jwttoken) {
    return res.status(401).send('This action requires ' + userType + ' rights')
  }
  try {
    var tokenData = await jwt.decode(req.headers.jwttoken, process.env.JWT_SECRET);
    if (!tokenData.sub || !tokenData.iat || !tokenData.exp || !tokenData.timestamp  || !tokenData.account) {
      return res.status(403).send('Invalid token')
    }
    if (userType === 'user') {
      if (tokenData.account !== 'user' || tokenData.account !== 'moderator' || tokenData.account !== 'admin') {
        return res.status(401).send('This action requires ' + userType + ' rights')
      }
    } else if (userType === 'moderator') {
      if (tokenData.account !== 'moderator' || tokenData.account !== 'admin') {
        return res.status(401).send('This action requires ' + userType + ' rights')
      }
    } else if (userType === 'admin') {
      if (tokenData.account !== 'admin') {
        return res.status(401).send('This action requires ' + userType + ' rights')
      }
    }
    if (tokenData.exp < new Date().getTime) {
      return res.status(401).send('Login has expires, please login again')
    }
    return next();
  } catch(err) {
    console.log(err);
    return res.status(500).send('Something broke in the backend')
  }
}
