import { UserRepository } from '../../domain/repository/UserRepository';
import { User } from '../../domain/model/User';
import jwt from 'jsonwebtoken';

export class UserService {
    constructor(private userRepository: UserRepository) {}

    async registerUser(email: string, password: string) {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('Usuario ya registrado');
        }
        const user = new User(email, password);
        await user.hashPassword();
        await this.userRepository.save(user);
    }

    async loginUser(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findByEmail(email);
        if (!user || !(await user.comparePassword(password))) {
            throw new Error('Credenciales incorrectas');
        }
        const token = jwt.sign({ id: user.id }, 'SECRET_KEY', { expiresIn: '1d' });
        return token;
    }
}
