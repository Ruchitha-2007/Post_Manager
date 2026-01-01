import express from 'express';
const route = express.Router();
import { Login, SignUp } from '../controller/authController.js';
import { refresh} from '../controller/refreshTokenController.js';
import { Logout } from '../controller/logoutController.js';

// Ensure that the Login and SignUp functions are defined correctly in authController
route.post('/login', Login);
route.post('/signup', SignUp);
route.get('/refresh', refresh);
route.post('/logout', Logout);

export default route;
