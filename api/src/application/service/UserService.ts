import { UserRepository } from '../../infrastructure/repository/UserRepository';
import { User } from '../../domain/model/User';
import jwt from 'jsonwebtoken';

export class UserService {
    constructor(private userRepository: UserRepository) {}

    async registerUser(email: string, password: string) {
        let existingUser = await this.userRepository.findUserByEmail(email);
        if (existingUser) {
            throw new Error('El usuario ya existe');
        }
        const user = new User(email, password);
        await user.hashPassword();
        await this.userRepository.createUser(user);
    }

    async loginUser(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user || !(await user.comparePassword(password))) {
            throw new Error('Credenciales inválidas');
        }
        const token = jwt.sign({ id: user._id }, 'tu_secret_jwt', { expiresIn: '1d' });
        return token;
    }
}
