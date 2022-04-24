export class User {
    private _loggedIn = false;
    private _email: string | null = null;

    constructor(_email: string | null, _loggedIn: boolean) {
        this._loggedIn
        this._email;
    }

    get loggedIn(): boolean {
        return this._loggedIn
    }

    get email(): string | null {
        return this._email
    }
}