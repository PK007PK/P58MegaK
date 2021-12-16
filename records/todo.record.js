//Active Record - jest to klasa, wzorzec, który oznacza, że nasza rekord potrafi
//jeszcze coś robić, robić coś więcej, walidować się,
//dodawać, usuwać, to robi sam rekord

//Klasa repozytorium ma realizować wszystko co związane z bazą danych

class TodoRecord {
    constructor(obj) {
        this.id = obj.id;
        this.title = obj.title;

        this._validate();
    }

    _validate() {
        if (this.title.trim().length < 5) {
            throw new Error('To do title should be at last 5 characters.')
        }

        if (this.title.length > 150) {
            throw new Error('To do title should be at most 150 characters.')
        }
    }

    
}

module.exports = {
    TodoRecord,
}