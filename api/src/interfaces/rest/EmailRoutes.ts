import express from 'express';
import { EmailController } from './EmailController';
import { EmailService } from '../../application/service/EmailService';
import { EmailRepository } from '../../domain/repository/EmailRepository';

const router = express.Router();

const emailRepository = new EmailRepository();
const emailService = new EmailService(emailRepository);
const emailController = new EmailController(emailService);

router.post('/send', emailController.sendEmail);
router.get('/check-new/:userId', emailController.checkForNewEmails);
router.get('/wait-for-new/:userId', emailController.waitForNewEmails);

export default router;
