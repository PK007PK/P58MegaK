/*
Funkcja skrótu, funkcja mieszająca lub hashująca - f przyporządkowująca dowolnie dużej liczbie krótką
wartość o stałym rozmiarze, tzw skrót nieodwracalny.

W informatyce funkcje skrótu pozwalają na ustalenie krótkich i łatwych do weryfikacji sygnatur dla dowolnie dużych
zbiorów danych.

Inaczej to ujmując: z dowolnego tekstu tworzymy krótki, tzw hash. Umówmy się,
że istnieje taka funkcja skrótu, która produkuje tekst o długości 5 znaków, zawierający cyfry.

"Hello, world" -> 12345
"Lorem ipsum..." -> 34223
"" -> 23452
jakiś tekst ważący 8GB -> 00132

W drugą stronę się nie da. Nie możemy odzyskać tekstu pierwotnego. Jest to jednak zaleta.

Po co to w praktyce?
-to ważne narzędzie często wykorzystywane w informatyce.
- absolutnie obowiązkowe jest go znać i używać tam, gdzie to potrzebne.

Poniżej dwa najczęstsze przypadki wykorzystania.

1. Dzięki hashom możesz bardzo szybko zweryfikować czy dowolnej wielkości dane są poprawne - czy ktoś ich nie
zmienił lub czy nie było po drodze błędów (tzw checksuma).

Checksuma na froncie. Wykorzystywana by pokazać ew błędy i ataki typu man-in-the-middle.

<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.0.0-alpha-67f38366a-20210830/umd/react.production.min.js"
integrity="sha512-TL1DOLocU4YzPUJpVR9ONBz5/yahQLc316RIxNBQhtx/ePdOCeSBtO25R4QVuxe6fwh4epIKL8yYPvunaaW+Zg=="
crossorigin="anonymous" referrerpolicy="no-referrer"></script>

2. Drugim przypadkiem jest przechowywanie haseł. Nigdy nie
robimy tego w tzw plaintekscie, tj przechowując hasło podane przez użytkownika.

Niestety wiele osób używa tych samych haseł w wielu miejscach.
Kiedy ktoś włamie się do Twojego systemu, to może przez to poznać hasła użytkowników.

Jeżeli jednak będziesz przechowywać funkcję skrótu - nawet kiedy ktoś wykradnie dane - dostwnie tylko skróty bez
możliwości poznania haseł pierwotnych.

Zagrożenia:
#1 kolizje w funkcjach skrótu
Szczególną podgrupą funkcji skrutu są funkcje uznawane za bezpieczne do zastosowań kryptologicznych (jak np SHA-3).
Kryptograficzna funkcja skrutu powinna spełniać kombinację następujących kryteriów, w zależności od zastosowania:

Odporność na kolizje - brak praktycznej możliwości wygenertowania dwóch dowolnych wiadomości o tym samym skrócie.

Odporność na kolizje konkretnych wiadomosci ()target collision resistance, preimage resistance_
pierwszego i drugiego rzędu - brak praktycznej możliwości wygenerowania wiadomości o takim samym skrócie jak wskazana wiadomość.

#2. Rainbow tables.
Powiązanie z funkcjami skrótu, które mają sporo kolizji lub po prostu ktoś przeszedł bardzo dużo tekstów i stworzył sobie tabelę, gdzie
może wyszukać danych, znajdując jaki tekst najpierw wprowadził, żeby go uzyskać. Dla gigantycznej ilości tekstów w internecie.
Narzędzie hakerskie crackstation.net

#3. Zbyt banalny tekst

Jak sobie z tym poradzić?
1. Bezpieczne funkcje skrótu (min takie które są zbyt powolne, aby generować dla nich duże tęczowe tabele);
2. Używaj soli.

Sól:
- powinna być inna dla każdego użytkownika;
- powinna być długa. Minimalnie na tyle znaków ile otrzymujesz na końcu funkcji skrótu;
- powinna zawierać losowe znaki

Czego unikać:
- md5
-sha1
-sha2
-Hash hasha
- własne funkcje skrótu

Bezpieczne f skrótu;
w node
- sha512
- PBKDF2

Dostęne w ekosystemie npm, ale nie odrazu w pai noda. Jeszcze lepsze niż powyższe:
-bcrypt
-Whirpool


 */