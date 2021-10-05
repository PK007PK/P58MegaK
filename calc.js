function calc(operation, a, b) {
    switch (operation) {
        case "add": //wykona się + i dla add i dla plus
        case "plus": return a + b;
        case "subtract": return a - b;
        case "multiply": return a * b;
        case "divide": return a / b;
        // default: // Default może być też na początku
        //Nie dajemy breaków bo mamy return;
    }
}

module.exports = {
    calc,
}