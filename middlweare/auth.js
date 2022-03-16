import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import * as userRepository from '../data/auth.js';

export const isAuth = async (req, res, next) => {
  const token = req.get('Accesstoken');
  if(!(token))
  {
    return res.status(401).json({"status" : "401"});
  }
  jwt.verify(
    token,
    config.jwt.secretKey,
    async (error, decoded) => {
      if (error) {
        return res.status(401).json({"status" : "401"});
      }
      const user = await userRepository.findById(decoded.id);
      if(!user) {
        return res.status(401).json({"status" : "401"});
      }
      req.userId = user.id; // 계속 사용해야하는 데이터
      next();
    }
  )
}