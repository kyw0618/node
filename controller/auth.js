import * as authRepository from '../data/auth.js';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { findAuthTerms} from '../data/app.js';

export async function singup(req, res) {
  const {phone, pw, name, terms}  = req.body;

  const user = await authRepository.findByPhon(phone);
    if (user) {

      return res.status(404).json({"status": "404"});
    }
    
  const userid = await authRepository.createuser( {
    phone,
    pw,
    name,
    terms,
  });
  
  const accessToken = createAccessJwt(userid);
  const refreshToken = createRefeshJwt(userid);

  await authRepository.createtoken(userid, refreshToken);
  res.status(201).json({"status": "201", "Accesstoken": accessToken, userId: userid});
}

export async function login(req, res, next) {
  const user = await authRepository.findByPhon(req.body.phone);
    if (!user) {
      return res.status(404).json({"status": "404"});
    }
    const accessToken = createAccessJwt(user.id);
    const newRefreshToken = createRefeshJwt(user.id);
    await authRepository.updateRefreshToken(user.id, newRefreshToken);
    return res.status(200).json({"status": "200", "Accesstoken": accessToken, userId: user.id});
  }

  export async function autoLogin(req, res) {

    var userId; 
    var findrefreshToken;

    try {
      userId = tokenparsing(req.get('Accesstoken'));
      findrefreshToken = await authRepository.findRefreshToken(userId);
    } catch {
      return res.status(404).json({"status": "404"});
    }

    const accessToken = verifytoken(req.get('Accesstoken'));
    const refreshToken = verifytoken(findrefreshToken);
    const newAccessToken = createAccessJwt(userId);
    const newRefreshToken = createRefeshJwt(userId);

    // access token, refresh token 만료
    if ((accessToken === null) && (refreshToken === null)) {
      return res.status(401).json({"status": "401"});
    }

    await authRepository.updateRefreshToken(userId, newRefreshToken);
    return res.status(200).json({"status": "200", "Accesstoken": newAccessToken});
  }

// TODO 
export async function logout(req, res) {
  const accessToken = req.get('Accesstoken');
  const userId = tokenparsing(accessToken);
  await authRepository.refreshTokenToNULL(userId);
  
  res.status(204).json({"status": "204"})
}

export async function getAuthTerms(req, res) {
  const terms = await findAuthTerms();
  res.status(200).json({"status": "200", terms})
}

export function sendsms (req, res) {
  const userphone = req.body.phone;
  const user_auth_number = Math.floor(Math.random() * 8999) + 1000; // 인증번호
  authRepository.send_message(userphone, user_auth_number);
  res.status(200).json({user_auth_number});
}

export function createAccessJwt(id) {
  return jwt.sign({id}, config.jwt.secretKey, { expiresIn: config.jwt.expiresInAccess});
}
export function createRefeshJwt(id) {
  return jwt.sign({id}, config.jwt.secretKey, { expiresIn: config.jwt.expiresInRefresh});
}

function verifytoken(token) {
  try {
    return jwt.verify(token, config.jwt.secretKey);  
  } catch (error) {
    return null
  }
}

function tokenparsing(token) {
  const base64Payload = token.split('.')[1];
  const payload = Buffer.from(base64Payload, 'base64');
  const result = JSON.parse(payload.toString())
  return result.id
}