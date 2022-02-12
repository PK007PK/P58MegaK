import * as express from 'express';

export class ValidationError extends Error {}

export const handleError = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction): void => {
    console.error(err);
    res
        /*
            Sprawdzamy poniżej, czy błąd jest naszym błędem. Czyli że ktoś coś źle podał. Jeżeli tak to 400. 
            400 oznacza bad request: źle podajesz..
            Jeżeli nie 400 to 500 - to my coś spieprzylismy
        */
        .status(err instanceof ValidationError ? 400 : 500)
        /*
            Dalej renderujemy stronę error i przekazujemy jej message. 
            Jeżeli nasz błąd, to przekazujemy naszą wiadomość. 
            Jeżeli nie nasz to przekazujemy ogólną informację że 
            to problem po stronie apki. 
        */
        .render('error', {
            message: err instanceof ValidationError ? err.message : 'Przepraszamy, spróbuj ponownie za kilka minut.',
        });
};