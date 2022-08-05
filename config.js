import dotenv from 'dotenv';
dotenv.config();

export const config = {
  jwt: {
    secretKey: process.env.JWT_SECRET,
    expiresInAccess: process.env.JWT_EXPIRES_SEC_ACCESS,
    expiresInRefresh: process.env.JWT_EXPIRES_SEC_REFRESH
  },
  db: {
    host: process.env.DB_HOST
  },
  sms: {
    ncpkey: process.env.NCP_KEY,
    secretKey: process.env.NCP_SECRET_KEY,
    serviceId: process.env.SERVICE_ID,
    fromNumber: process.env.SMS_FROM
  },

  ocr: {
    ocrurl:  process.env.OCR_URL
  },
  
  port: parseInt(process.env.HOST_PORT),
  adminId: process.env.ADMIN_ID

  }       