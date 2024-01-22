import { EmailRepository } from '../../domain/repository/EmailRepository';
import { Email } from '../../domain/model/Email';
import nodemailer from 'nodemailer';

export class EmailService {
    constructor(private emailRepository: EmailRepository) {}

    async sendEmail(from: string, to: string, subject: string, body: string) {
        const email = new Email(from, to, subject, body);
        await this.emailRepository.save(email);

        const transporter = nodemailer.createTransport({
            service: 'gmail', // Ejemplo, ajusta según tu proveedor
            auth: {
                user: 'tu-email@gmail.com', // Tus credenciales
                pass: 'tu-contraseña',
            },
        });

        await transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            text: body,
        });
    }

    async getNewEmailsForUser(userId: string) {
        return this.emailRepository.findNewEmailsForUser(userId);
    }
}
