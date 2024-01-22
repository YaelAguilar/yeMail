import EmailModel from '../../infrastructure/db/MongooseEmailModel';
import { Email } from '../model/Email';

export class EmailRepository {
    async save(email: Email) {
        const emailDocument = new EmailModel({ 
            from: email.from, 
            to: email.to, 
            subject: email.subject, 
            body: email.body
        });
        await emailDocument.save();
    }

    async findNewEmailsForUser(userId: string) {
        return EmailModel.find({
            userId: userId, 
            isNew: true
        });
    }
}
