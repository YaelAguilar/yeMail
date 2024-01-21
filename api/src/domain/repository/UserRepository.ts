import UserSchema from '../../infrastructure/db/MongooseUserModel';
import { User } from '../model/User';

export class UserRepository {
    async save(user: User) {
        const userDocument = new UserSchema({ email: user.email, password: user.password });
        await userDocument.save();
    }

    async findByEmail(email: string) {
        return UserSchema.findOne({ email });
    }
}
