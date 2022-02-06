import {Router, Request, Response} from 'express';
import { CookieMakerApp } from '../index';
import { MyRouter } from '../types/my-router';

export class HomeRouter implements MyRouter {
    readonly urlPrefix = '/'
    readonly router: Router = Router();
    
    //cmapp to this, a typem dla this jest sama klasa w tym przypadku
    constructor(private cmapp: CookieMakerApp) {
        this.setUpRoutes();
    }

    private setUpRoutes(): void {
        this.router.get('/', this.home);
    }

    private home = (req: Request, res: Response): void => {
        const {sum, addons, base, allBases, allAddons} = this.cmapp.getCookieSettings(req);

        res.render('home/index', {
            cookie: {
                base,
                addons,
            },
            allBases,
            allAddons,
            sum,
        });
    };
}
