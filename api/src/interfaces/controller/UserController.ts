import { Request, Response } from 'express';
import { UserService } from '../../application/service/UserService';

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async register(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new Error('Todos los campos deben llenarse');
            }
            await this.userService.registerUser(email, password);
            res.status(201).json({ message: 'Usuario registrado con éxito' });
        } catch (error) {
            res.status(400).json({ message: 'Se produjo un error inesperado' });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new Error('Verifique sus datos');
            }
            const token = await this.userService.loginUser(email, password);
            res.status(200).json({ token });
        } catch (error) {
            res.status(400).json({ message: 'Se produjo un error inesperado' });
        }
    }
}
