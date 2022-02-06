import * as express from 'express';

export class ValidationError extends Error {}

export const handleError = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction): void => {
    console.error(err);
    res
        .status(err instanceof ValidationError ? 400 : 500)
        .render('error', {
            message: err instanceof ValidationError ? err.message : 'Przepraszamy, spróbuj ponownie za kilka minut.',
        });
};