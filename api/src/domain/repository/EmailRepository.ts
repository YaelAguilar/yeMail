import EmailSchema from '../../infrastructure/db/MongooseEmailModel';
import { Email } from '../model/Email';

export class EmailRepository {
    async save(email: Email) {
        const emailDocument = new EmailSchema(email);
        await emailDocument.save();
    }

    async findNewEmailsForUser(userId: string) {
        return EmailSchema.find({
            userId: userId, 
            isNew: true
        });
    }
}
