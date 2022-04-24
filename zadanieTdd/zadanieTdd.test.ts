import { User } from "./User";

let user: User;

beforeAll(async () => {
    user = new User();
})

test('User should not be logged in at the baginning', () => {
    // expect(user.loggedIn).toBeFalsy();
    expect(user.loggedIn).toEqual(false);//Chcemy żeby to było jeszcze bardziej jednoznaczne
})

test('User logged in state should not be modiffied outside of class', () => {
    expect(()=>{
        user.loggedIn = true;
    }).toThrow();
})

test('User should have no email at the beginning', () => {
    expect(user.email).toBeNull();
})

test('User email should not be modiffied outside of class', () => {
    expect(()=>{
        user.email = 'aaa@gmail.com';
    }).toThrow();
})