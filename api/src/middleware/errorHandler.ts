import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (res.headersSent) {
        return next(err);
    }

    // Enviar respuesta de error
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Ocurrió un error inesperado.',
        }
    });
};
