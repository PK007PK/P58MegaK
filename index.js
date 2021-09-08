const {promisify} = require('util');
const { pbkdf2 } = require('crypto');
const pbkdf2Prom = promisify(require('crypto').pbkdf2);

function program1() {
    const pwd = process.argv[2];
    const SALT = "asd wasd ada dqwD@#ERASDAsd 3R3@rawd ASD ASdasDAsdQ#d#qwda";
    pbkdf2(pwd, SALT, 100000, 64, 'SHA512', (err, hash) => {
        if (err) {
            console.error(err)
        } else {
            console.log(hash.toString('hex'));
        }
    });

    if (pwd === 'megakurs') {
        console.log("logged in");
    }
}

//program1()

function program2() {
    const pwd = process.argv[2];
    const SALT = 'asd wasd ada dqwD@#ERASDAsd 3R3@rawd ASD ASdasDAsdQ#d#qwda';
    const PASSWORD = '45bd16d13ed3e1640bb5b61ad6474820d5fcf0146afdc845e92f836628ea4eab5e2cbe3b664442863535f933a1b0c5f32502184986ff8e03ce3e298093ae8c7c';
    pbkdf2(pwd, SALT, 100000, 64, 'SHA512', (err, hash) => {
        if (err) {
            console.error(err);
        } else {
            if (hash.toString('hex') === PASSWORD) {
                console.log("logged in");
            } else {
                console.log("problem");
            }
        }
    });
}

//program2()

/*
    Na promisach. Z promisyfy możemy korzystać zawsze kiedy są callbacki w stylu nodowym.
 */

function program3() {
    const pwd = process.argv[2];
    const SALT = 'asd wasd ada dqwD@#ERASDAsd 3R3@rawd ASD ASdasDAsdQ#d#qwda';
    const PASSWORD = '45bd16d13ed3e1640bb5b61ad6474820d5fcf0146afdc845e92f836628ea4eab5e2cbe3b664442863535f933a1b0c5f32502184986ff8e03ce3e298093ae8c7c';
    (async () => {
        const hash = await pbkdf2Prom(pwd, SALT, 100000, 64, 'SHA512');
        if (hash.toString('hex') === PASSWORD) {
            console.log("logged in");
        } else {
            console.log("problem");
        }
    })()
}

program3();