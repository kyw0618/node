import * as authRepository from '../data/auth.js';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export async function singup(req, res) {
  const {phone, pw, name, terms}  = req.body;

  const userid = await authRepository.createuser( {
    phone,
    pw,
    name,
    terms,
  });
  
  const accessToken = createExceessJwt(userid);
  const refreshToken = createRefeshJwt(userid);

  await authRepository.createtoken(userid, refreshToken);
  res.status(201).json({"status": "201", "Accesstoken": accessToken});
}

export async function login(req, res, next) {
  const user = await authRepository.findByPhon(req.body.phone && req.body.pw);
    if (!user) {
      return res.status(404).json({"status": "404"});
    }
    const accessToken = createExceessJwt(user.id);
    const newRefreshToken = createRefeshJwt(user.id);
    await authRepository.updateRefreshToken(user.id, newRefreshToken);
    return res.status(200).json({"status": "200", "Accesstoken": accessToken});
  }

export async function autoLogin(req, res) {
  const accessToken = verifytoken(req.get('Accesstoken'));
  if(!accessToken) {
    return res.status(404).json({"status": "404"});
  }

  const findrefreshToken = await authRepository.findRefreshToken(accessToken.id);
  const refreshToken = verifytoken(findrefreshToken);
  const newAccessToken = createExceessJwt(accessToken.id);
  const newRefreshToken = createRefeshJwt(accessToken.id);

  if (accessToken === null) {
    if (refreshToken === null) // access token, refresh token 만료
      return res.status(401).json({"status": "401"});
  }
  await authRepository.updateRefreshToken(accessToken.id, newRefreshToken);
  return res.status(200).json({"status": "200", "Accesstoken": newAccessToken});
  

}

// TODO
export async function logout(req, res) {
  const appToken = req.get('appToken');
  await authRepository.deleteToekn(appToken);

  res.status(204).json({"status": "204"})
}

export function sendsms (req, res) {
  const userphone = req.body.phone;
  const user_auth_number = Math.floor(Math.random() * 8999) + 1000; // 인증번호
  authRepository.send_message(userphone, user_auth_number);
  res.status(200).json({user_auth_number});
}

export function createExceessJwt(id) {
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