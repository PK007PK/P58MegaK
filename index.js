const {createServer} = require('http');

function excercise1() {
    const server = createServer();
    server.on('request', () => {
        console.log('hello world');
    });
    server.listen(3000,'127.0.0.1');
}