import Mongoose from 'mongoose';
import CryptoJS from 'crypto-js';
import request from 'request';
import { config } from '../config.js';

const users = new Mongoose.Schema( {
  phone: {type: String},
  pw: {type: String},
  name: {type: String},
  terms: {type: String}
}, { 
  versionKey: false 
});

const token = new Mongoose.Schema( {
  refreshtoken: {type: String},
  userid : {type: String}
}, {
  versionKey: false
}

)

const Token = Mongoose.model('Tokens', token);
const User = Mongoose.model('Users', users);

export async function updateRefreshToken(userid, token) {
  return Token.findOneAndUpdate({userid}, {refreshtoken: token}, {returnOriginal: false});
}

export async function createtoken(id, refreshtoken) {
  return new Token({refreshtoken, 'userid': id}).save()
    .then(() => console.log("Save refreshtoken"));
}

export async function findBytoken(token) {
  return Token.findOne({refreshtoken: token}).then((data) => data.userid)
}
export async function findRefreshToken(userid) {
  return Token.findOne({userid}).then((data) => data.refreshtoken);
}

export async function deleteToekn(token) {
  return Token.findOneAndUpdate({refreshtoken: token}, {refreshtoken: null})
}

export async function findById(id) {
  return User.findById(id);
}

export async function findByPhon(phone) {
  return User.findOne({phone});
}

export async function createuser(user) {
  return new User(user).save().then((data) => data.id);
}

export function send_message(userPhone, authNumber) {
  var user_phone_number = userPhone;//수신 전화번호 기입
  var resultCode = 404;
  const date = Date.now().toString();
  const uri = config.sms.serviceId; //서비스 ID
  const secretKey = config.sms.secretKey;// Secret Key
  const accessKey = config.sms.ncpkey;//Access Key
  const method = "POST";
  const space = " ";
  const newLine = "\n";
  const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
  const url2 = `/sms/v2/services/${uri}/messages`;
  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(url2);
  hmac.update(newLine);
  hmac.update(date);
  hmac.update(newLine);
  hmac.update(accessKey);
  const hash = hmac.finalize();
  const signature = hash.toString(CryptoJS.enc.Base64);
  request({
    method: method,
    json: true,
    uri: url,
    headers: {
      "Contenc-type": "application/json; charset=utf-8",
      "x-ncp-iam-access-key": accessKey,
      "x-ncp-apigw-timestamp": date,
      "x-ncp-apigw-signature-v2": signature,
    },
    body: {
      type: "SMS",
      countryCode: "82",
      from: config.sms.fromNumber, //"발신번호기입"
      content: `메디오즈 어플 인증번호 ${authNumber} 입니다.`,//문자내용 기입
      messages: [
        { 
          'to': `${user_phone_number}`
        }
      ]
    },
  },
    function (err, res, html) {
      if (err) console.log(err);
      else { resultCode = 200; console.log(html); }
    }
  );
  return resultCode;
}