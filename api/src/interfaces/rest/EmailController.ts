import { Request, Response } from 'express';
import { EmailService } from '../../application/service/EmailService';

export class EmailController {
    constructor(private emailService: EmailService) {}

    async sendEmail(req: Request, res: Response) {
        try {
            const { from, to, subject, body } = req.body;
            await this.emailService.sendEmail(from, to, subject, body);
            res.status(200).json({ message: 'Correo enviado con éxito' });
        } catch (error) {
            res.status(500).json({ message: 'Error desconocido' });
        }
    }

    async checkForNewEmails(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const newEmails = await this.emailService.getNewEmailsForUser(userId);
            res.status(200).json(newEmails);
        } catch (error) {
            res.status(500).json({ message: 'Error desconocido' });
        }
    }

    async waitForNewEmails(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            let foundNewEmails = false;

            const checkInterval = setInterval(async () => {
                const newEmails = await this.emailService.getNewEmailsForUser(userId);
                if (newEmails.length > 0 || foundNewEmails) {
                    clearInterval(checkInterval);
                    res.status(200).json(newEmails);
                }
            }, 5000); // Intervalo de 5 segundos

            req.on('close', () => {
                foundNewEmails = true;
                clearInterval(checkInterval);
            });
        } catch (error) {
            res.status(500).json({ message: 'Error desconocido' });
        }
    }
}
