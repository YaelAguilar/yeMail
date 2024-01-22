import express from 'express';
import { UserController } from '../controller/UserController';
import { UserService } from '../../application/service/UserService';
import { UserRepository } from '../../domain/repository/UserRepository';

const router = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post('/register', userController.register);
router.post('/login', userController.login);

export default router;
