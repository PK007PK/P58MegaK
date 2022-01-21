/*
Zadanie 6
*/

// Optypuj poniższy kod, następie napisz pętlę, która będzie wypisywała wartość po kolei wszystkich elementów pojedynczo w konsoli.
// Spróbuj użyć różnych typów pętli. //forEach, for...i, for...in, for...of
// Zwróć uwagę na to jak edytor sprawnie podpowiada Ci w pracy.
// W kodzie jest błąd - powinno to być widać i łatwo możesz go naprawić.

interface Product {
    name: string;
    count: number;
    pricePerOne: number;
    vat: number;
}

function showItems(items: Product[]): void { 
    items.forEach((el,index,array)=>{
        console.log((el.name, el.pricePerOne * (1 + el.vat / 100)).toFixed(2));
    })

    for (let i=0; i < items.length; i++ ) {
        console.log((items[i].name, items[i].pricePerOne * (1 + items[i].vat / 100)).toFixed(2));
    }

    for (const el of items) {
        console.log((el.name, el.pricePerOne * (1 + el.vat / 100)).toFixed(2));
    }

    for (const key in items) {
        const el = items[key];
        console.log((el.name, el.pricePerOne * (1 + el.vat / 100)).toFixed(2));
    }

  }
  
  showItems([
    {
      name: 'Pomarańcze luz',
      count: 1.2,
      pricePerOne: 1,
      vat: 0,
    },
    {
      name: 'Opony komplet',
      count: 1,
      pricePerOne: 800,
      vat: 23,
    },
    {
      name: 'MP3 Player Manta 256MB',
      count: 1,
      pricePerOne: 75,
      vat: 23,
    },
    {
      name: 'Baton "Mega Kursowy Baton Masło Orzechowe"',
      count: 5,
      pricePerOne: 2,
      vat: 23,
    },
  ]);

/*
1. Dodaj typy do programu.
2. Usuń błędy w wyznaczonym miejscu.
*3. Napisz interfejs, który będzie w całości opisywał klasę Bookmarks, a następnie zrób tak, żeby klasa Bookmarks implementowała ten interfejs.

// Nie zmieniaj w klasie nic oprócz typów!
class Bookmarks {
    constructor() {
        this.list = [];
    }

    first() {
        return this.list[0];
    }
    
    last() {
        return this.list[this.list.length - 1];
    }

    add(url) {
        this.list.push(url);
    }

    remove(urlOrAll) {
        if (urlOrAll === true) {
            this.list = [];
        } else {
            this.list = this.list.filter(bookmark => bookmark !== urlOrAll);
        }
    }
}

// Poniższy kod możesz zmieniać - tak, aby miał typy, sens i nie wywalał błędów :)
const favorites = new Bookmarks();

function createLink(bookmark) {
    return `<a href="${bookmark}">${bookmark.substr(bookmark.indexOf('//')+2)}</a>`;
}

favorites.add('http://wp.pl');
console.log(createLink(favorites.first()));
favorites.remove('http://wp.pl');
console.log(createLink(favorites.first()));
favorites.add('http://wp.pl');
favorites.add('http://onet.pl');
favorites.remove(true); // This should remove all
console.log('This should be true if list is empty', !favorites.first());
*/

interface Favorites {

}

class Bookmarks implements Favorites {
    list: string[];
    constructor() {
        this.list = [];
    }

    first(): string | undefined {
        return this.list[0];
    }
    
    last(): string | undefined {
        return this.list[this.list.length - 1];
    }

    add(url: string): void {
        this.list.push(url);
    }

    remove(urlOrAll: string | true): void { //false nie mamy mieć obsługiwane, tylko true, dlatego nie boolean. 
        if (urlOrAll === true) {
            this.list = [];
        } else {
            this.list = this.list.filter(bookmark => bookmark !== urlOrAll);
        }
    }
}

// Poniższy kod możesz zmieniać - tak, aby miał typy, sens i nie wywalał błędów :)
const favorites = new Bookmarks();

function createLink(bookmark: string | undefined): string {
    if (!bookmark) {
        return "";
    }
    return `<a href="${bookmark}">${bookmark.substring(bookmark.indexOf('//')+2)}</a>`;
}

favorites.add('http://wp.pl');
const firstLink = favorites.first();
if (firstLink) {
    console.log(createLink(favorites.first()));
};
favorites.remove('http://wp.pl');
const nextLink = favorites.first();
if (nextLink) {
    console.log(createLink(nextLink));
}
favorites.add('http://wp.pl');
favorites.add('http://onet.pl');
favorites.remove(true); // This should remove all
console.log('This should be true if list is empty', !favorites.first());