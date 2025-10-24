import dotenv from "dotenv";
dotenv.config();



const mode = process.env.MODE || 'development';


const configByEnv: any = {
   development: {
      PORT: 5000,
      allowedOrigins: "http://localhost:5000,http://127.0.0.1:5000",
      JWT_SECRET: process.env.JWT_SECRET,
      otpExpirationTimeInMinutes: 10,
      passwordEncryptSalt: 10,
   },
   production: {
  PORT: 5000,
      allowedOrigins: "http://localhost:5000,http://123.0.0.1:5000",
      JWT_SECRET: process.env.JWT_SECRET,
      otpExpirationTimeInMinutes: 10,
      passwordEncryptSalt: 10,

   },
};
export const config = {
   ...configByEnv[mode],
   MODE: mode,
}; 