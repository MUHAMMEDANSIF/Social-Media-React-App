import express from 'express';
import {
  Signup, Login, refreshtoken, verifytokens, Logout, sendotp, otpverification
} from '../Controllers/Auth.controller.js';

const router = express.Router();

router.post('/newuser/signup', Signup);

router.post('/login', Login);

router.get('/refreshtoken', refreshtoken);

router.get('/jwtveryfication', verifytokens, (req, res) => { res.status(200).json({ success: 'jwt is veryfied', user: req.userinfo }); });

router.get('/Logout', verifytokens, Logout);

router.post('/send-otp', sendotp);

router.post('/Otp-verification',otpverification)

export default router;
