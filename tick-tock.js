const {EventEmitter} = require('events')

function tickTock() {
    const ee = new EventEmitter();
    setInterval(() => {
        console.log("hi");
    }, 1000);
    return ee;
}

function tickTock2() {
    const ee = new EventEmitter();
    setInterval(() => {
        ee.emit('secondElapsed'); // Sami wymyślamy tą nazwę, może być dowolna
    }, 1000);
    return ee;
}

function tickTock3() {
    const ee = new EventEmitter();
    setInterval(() => {
        ee.emit('secondElapsed', 'Test');
    }, 1000);
    return ee;
}

function tickTock4() {
    const ee = new EventEmitter();
    setInterval(() => {
        ee.emit('secondElapsed', '1sss');
    }, 1000);
    setInterval(() => {
        ee.emit('fiveSecondsElapsed', '5sss');
    }, 5000);
    return ee;
}

class TickTock5 extends EventEmitter {
    constructor() {
        super(); //to jest inicjalizacja EventEmittera
        setInterval(() => {
            this.emit('secondElapsed', '1sss');
        }, 1000);
        setInterval(() => {
            this.emit('fiveSecondsElapsed', '5sss');
        }, 5000);
    }
}

module.exports = {
    tickTock,
    tickTock2,
    tickTock3,
    tickTock4,
    TickTock5,
}

