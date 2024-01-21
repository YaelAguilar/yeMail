import UserSchema from '../../infrastructure/db/MongooseUserModel';
import { User } from '../../domain/model/User';

export class UserRepository {
    async createUser(userData: User) {
        const user = new UserSchema(userData);
        await user.save();
    }

    async findUserByEmail(email: string) {
        return UserSchema.findOne({ email });
    }
}
